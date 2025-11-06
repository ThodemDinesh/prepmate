const express = require('express');
const router = express.Router();
const multer = require('multer');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const natural = require('natural');
const { authenticateToken } = require('../middleware/auth');
const resumeService = require('../services/resumeService');

// Configure multer for file upload
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Extract text from PDF
async function extractPDFText(buffer) {
  try {
    const data = await pdfParse(buffer);
    return data.text;
  } catch (error) {
    console.error('Error extracting PDF text:', error);
    throw new Error('Failed to parse PDF file');
  }
}

// Extract text from DOCX
async function extractDOCXText(buffer) {
  try {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  } catch (error) {
    console.error('Error extracting DOCX text:', error);
    throw new Error('Failed to parse DOCX file');
  }
}

// Extract keywords from text using NLP
function extractKeywords(text) {
  try {
    const TfIdf = natural.TfIdf;
    const tfidf = new TfIdf();
    
    tfidf.addDocument(text.toLowerCase());
    
    const keywords = [];
    tfidf.listTerms(0).slice(0, 30).forEach(item => {
      if (item.term.length > 2) {
        keywords.push(item.term);
      }
    });
    
    return keywords;
  } catch (error) {
    console.error('Error extracting keywords:', error);
    return [];
  }
}

// Calculate ATS score
function calculateATSScore(resumeKeywords, jdKeywords, formatChecks) {
  const matchedKeywords = resumeKeywords.filter(kw => 
    jdKeywords.some(jdKw => jdKw.includes(kw) || kw.includes(jdKw))
  );
  
  const keywordScore = jdKeywords.length > 0 
    ? (matchedKeywords.length / jdKeywords.length) * 70 
    : 0;
  
  const formatScore = (
    (formatChecks.hasContactInfo ? 10 : 0) +
    (formatChecks.hasStandardSections ? 10 : 0) +
    (formatChecks.isATSFriendly ? 10 : 0)
  );
  
  return Math.min(Math.round(keywordScore + formatScore), 100);
}

// Check resume format
function checkFormat(resumeText) {
  const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(resumeText);
  const hasPhone = /(\+\d{1,3}[- ]?)?\d{10}/.test(resumeText);
  const hasStandardSections = /experience|education|skills|work history|employment/i.test(resumeText);
  
  return {
    hasContactInfo: hasEmail && hasPhone,
    hasStandardSections,
    isATSFriendly: hasEmail && hasStandardSections
  };
}

// Main analyze endpoint
router.post('/analyze', authenticateToken, upload.single('resume'), async (req, res) => {
  try {
    const { jobDescription } = req.body;
    const resumeFile = req.file;
    
    // Validation
    if (!resumeFile || !jobDescription) {
      return res.status(400).json({
        success: false,
        error: 'Resume and job description are required'
      });
    }

    if (!jobDescription.trim() || jobDescription.trim().length < 50) {
      return res.status(400).json({
        success: false,
        error: 'Job description is too short. Please provide a detailed job description.'
      });
    }
    
    console.log(`📄 Analyzing resume: ${resumeFile.originalname} (${(resumeFile.size / 1024).toFixed(2)} KB)`);
    
    // Extract text from resume
    let resumeText = '';
    if (resumeFile.mimetype === 'application/pdf') {
      resumeText = await extractPDFText(resumeFile.buffer);
    } else if (resumeFile.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      resumeText = await extractDOCXText(resumeFile.buffer);
    } else {
      return res.status(400).json({
        success: false,
        error: 'Invalid file format. Please upload PDF or DOCX file.'
      });
    }

    if (!resumeText || resumeText.trim().length < 100) {
      return res.status(400).json({
        success: false,
        error: 'Could not extract text from resume. Please ensure the file is not corrupted or image-based.'
      });
    }

    console.log(`✅ Extracted ${resumeText.length} characters from resume`);
    
    // Extract keywords
    const resumeKeywords = extractKeywords(resumeText);
    const jdKeywords = extractKeywords(jobDescription);
    
    console.log(`🔑 Resume keywords: ${resumeKeywords.length}, JD keywords: ${jdKeywords.length}`);
    
    // Find matched and missing keywords
    const matchedKeywords = resumeKeywords.filter(kw => 
      jdKeywords.some(jdKw => jdKw.includes(kw) || kw.includes(jdKw))
    );
    
    const missingKeywords = jdKeywords.filter(kw => 
      !resumeKeywords.some(rKw => rKw.includes(kw) || kw.includes(rKw))
    ).slice(0, 10);
    
    // Check format
    const formatChecks = checkFormat(resumeText);
    
    // Calculate ATS score
    const atsScore = calculateATSScore(resumeKeywords, jdKeywords, formatChecks);
    
    // Calculate potential improvement
    const potentialImprovement = Math.min(100 - atsScore, 30);
    
    console.log(`📊 ATS Score: ${atsScore}%, Matched: ${matchedKeywords.length}, Missing: ${missingKeywords.length}`);
    
    // Generate AI-powered recommendations
    const recommendations = await resumeService.generateATSRecommendations(
      resumeText, 
      jobDescription, 
      missingKeywords, 
      atsScore
    );
    
    // Generate interview questions using Groq AI
    const questionResult = await resumeService.generateInterviewQuestions(resumeText, jobDescription);
    
    res.json({
      success: true,
      analysis: {
        atsScore,
        matchedKeywords,
        missingKeywords,
        potentialImprovement,
        recommendations,
        sampleQuestions: questionResult.questions,
        formatChecks,
        questionsSource: questionResult.source
      }
    });
    
  } catch (error) {
    console.error('❌ Resume analysis error:', error);
    
    // Return friendly error with fallback
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to analyze resume. Please try again.',
      fallback: {
        sampleQuestions: resumeService.getFallbackQuestions()
      }
    });
  }
});

module.exports = router;
