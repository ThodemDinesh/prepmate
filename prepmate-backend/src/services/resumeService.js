const Groq = require('groq-sdk');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Backup hardcoded questions (used if API fails)
const BACKUP_QUESTIONS = [
  {
    question: 'Tell me about yourself and your professional background.',
    category: 'Behavioral',
    difficulty: 'Easy'
  },
  {
    question: 'What are your greatest strengths and how do they relate to this position?',
    category: 'Behavioral',
    difficulty: 'Easy'
  },
  {
    question: 'Describe a challenging project you worked on and how you handled it.',
    category: 'Behavioral',
    difficulty: 'Medium'
  },
  {
    question: 'How do you stay updated with the latest trends in your field?',
    category: 'Technical',
    difficulty: 'Easy'
  },
  {
    question: 'Where do you see yourself in 5 years?',
    category: 'Behavioral',
    difficulty: 'Easy'
  },
  {
    question: 'How do you handle tight deadlines and pressure?',
    category: 'Situational',
    difficulty: 'Medium'
  },
  {
    question: 'Describe a time when you had to work with a difficult team member.',
    category: 'Behavioral',
    difficulty: 'Medium'
  },
  {
    question: 'What motivates you to excel in your work?',
    category: 'Behavioral',
    difficulty: 'Easy'
  },
  {
    question: 'How do you prioritize multiple tasks with competing deadlines?',
    category: 'Situational',
    difficulty: 'Medium'
  },
  {
    question: 'What is your approach to learning new technologies or skills?',
    category: 'Technical',
    difficulty: 'Medium'
  }
];

class ResumeService {
  // Generate interview questions using Groq API
  async generateInterviewQuestions(resumeText, jobDescription) {
    try {
      const systemPrompt = `You are an expert HR interviewer and technical recruiter. You analyze resumes and job descriptions to generate highly relevant, personalized interview questions.

Your task is to generate exactly 10 interview questions based on the candidate's resume and the job description provided.

Requirements:
1. Generate questions that are SPECIFIC to the candidate's experience and the job requirements
2. Mix different question types: Technical, Behavioral, Situational, and Experience-based
3. Ensure questions test both technical skills and cultural fit
4. Make questions realistic for actual interviews
5. Vary difficulty levels: Easy (3 questions), Medium (4 questions), Hard (3 questions)

Return ONLY a valid JSON object with no additional text or markdown formatting.

The JSON structure must be:
{
  "questions": [
    {
      "question": "The interview question text",
      "category": "Technical|Behavioral|Situational|Experience-based",
      "difficulty": "Easy|Medium|Hard"
    }
  ]
}`;

      const userPrompt = `Resume Summary (first 2000 chars):
${resumeText.substring(0, 2000)}

Job Description (first 1500 chars):
${jobDescription.substring(0, 1500)}

Generate 10 personalized interview questions based on this resume and job description.`;

      console.log('🤖 Generating interview questions with Groq API...');

      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: userPrompt
          }
        ],
        model: "llama-3.3-70b-versatile",
        temperature: 0.8,
        max_tokens: 2048,
        top_p: 1,
        stream: false,
        response_format: { type: "json_object" }
      });

      const responseContent = completion.choices[0]?.message?.content;
      
      if (!responseContent) {
        throw new Error('No response from Groq API');
      }

      const parsedResponse = JSON.parse(responseContent);
      const questions = parsedResponse.questions;

      if (!Array.isArray(questions) || questions.length === 0) {
        throw new Error('Invalid questions format received');
      }

      console.log(`✅ Successfully generated ${questions.length} questions using Groq API`);

      return {
        success: true,
        questions: questions,
        source: 'groq'
      };

    } catch (error) {
      console.error('❌ Groq API Error during question generation:', error.message);
      
      // Return backup questions on failure
      console.log('⚠️ Using backup questions - API unavailable');
      return {
        success: true,
        questions: BACKUP_QUESTIONS,
        source: 'backup'
      };
    }
  }

  // Get backup questions (for manual fallback)
  getFallbackQuestions() {
    return BACKUP_QUESTIONS;
  }

  // Generate ATS improvement suggestions using Groq
  async generateATSRecommendations(resumeText, jobDescription, missingKeywords, atsScore) {
    try {
      const systemPrompt = `You are an expert resume optimization consultant and ATS (Applicant Tracking System) specialist.

Analyze the resume and provide 5-6 specific, actionable recommendations to improve the ATS score.

Your recommendations should:
1. Be specific and actionable
2. Focus on keyword optimization, formatting, and content structure
3. Address the missing keywords from the job description
4. Provide concrete examples where possible
5. Be encouraging but honest

Return ONLY a valid JSON object with this structure:
{
  "recommendations": [
    "Recommendation 1",
    "Recommendation 2",
    ...
  ]
}`;

      const userPrompt = `Resume (excerpt):
${resumeText.substring(0, 1500)}

Job Description (excerpt):
${jobDescription.substring(0, 1000)}

Missing Keywords: ${missingKeywords.join(', ')}
Current ATS Score: ${atsScore}%

Generate 5-6 specific recommendations to improve this resume.`;

      const completion = await groq.chat.completions.create({
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        model: "llama-3.3-70b-versatile",
        temperature: 0.7,
        max_tokens: 1024,
        stream: false,
        response_format: { type: "json_object" }
      });

      const responseContent = completion.choices[0]?.message?.content;
      const parsedResponse = JSON.parse(responseContent);

      return parsedResponse.recommendations || [];

    } catch (error) {
      console.error('❌ Error generating ATS recommendations:', error.message);
      // Return default recommendations on failure
      return this.getDefaultRecommendations(missingKeywords, atsScore);
    }
  }

  // Get default recommendations (fallback)
  getDefaultRecommendations(missingKeywords, atsScore) {
    const recommendations = [];

    if (missingKeywords.length > 0) {
      recommendations.push(`Add these ${missingKeywords.length} missing keywords naturally throughout your resume: ${missingKeywords.slice(0, 5).join(', ')}`);
    }

    if (atsScore < 60) {
      recommendations.push('Tailor your resume more closely to match the job description by incorporating relevant keywords from the posting');
    }

    recommendations.push('Use standard section headers like "Work Experience", "Education", "Skills", and "Certifications" for better ATS parsing');
    recommendations.push('Include specific metrics and achievements with numbers (e.g., "Increased sales by 30%") to demonstrate impact');
    recommendations.push('Use simple, clean formatting without tables, graphics, or columns that can confuse ATS systems');
    recommendations.push('Ensure your contact information (email and phone) is clearly visible at the top of your resume');

    return recommendations.slice(0, 6);
  }
}

module.exports = new ResumeService();
