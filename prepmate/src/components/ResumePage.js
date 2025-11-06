// import React, { useState } from 'react';
// import '../styles/ResumePage.css';

// const ResumePage = ({ user, onNavigate, onLogout }) => {
//   const [resumeFile, setResumeFile] = useState(null);
//   const [jdText, setJdText] = useState('');
//   const [analysisResult, setAnalysisResult] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleResumeUpload = (e) => {
//     const file = e.target.files[0];
//     if (file && (file.type === 'application/pdf' || 
//                   file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
//       setResumeFile(file);
//       setError('');
//     } else {
//       setError('Please upload a PDF or DOCX file');
//       setResumeFile(null);
//     }
//   };

//   const handleAnalyze = async () => {
//     if (!resumeFile || !jdText.trim()) {
//       setError('Please upload resume and provide job description');
//       return;
//     }

//     setIsLoading(true);
//     setError('');

//     const formData = new FormData();
//     formData.append('resume', resumeFile);
//     formData.append('jobDescription', jdText);

//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('http://localhost:5000/api/resume/analyze', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         },
//         body: formData
//       });

//       const data = await response.json();

//       if (data.success) {
//         setAnalysisResult(data.analysis);
//       } else {
//         setError(data.error || 'Analysis failed');
//       }
//     } catch (err) {
//       setError('Could not connect to server');
//       console.error('Analysis error:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleReset = () => {
//     setResumeFile(null);
//     setJdText('');
//     setAnalysisResult(null);
//     setError('');
//   };

//   const renderAnalysisResults = () => {
//     if (!analysisResult) return null;

//     return (
//       <div className="analysis-results">
//         {/* ATS Score Section */}
//         <div className="score-section">
//           <h2>ATS Score</h2>
//           <div className="score-circle">
//             <div className={`score-value ${getScoreClass(analysisResult.atsScore)}`}>
//               {analysisResult.atsScore}%
//             </div>
//           </div>
//           <p className="score-description">{getScoreDescription(analysisResult.atsScore)}</p>
//         </div>

//         {/* Keyword Analysis */}
//         <div className="keywords-section">
//           <h3>📊 Keyword Match Analysis</h3>
          
//           <div className="keyword-category">
//             <h4>✅ Matched Keywords ({analysisResult.matchedKeywords.length})</h4>
//             <div className="keyword-tags">
//               {analysisResult.matchedKeywords.length > 0 ? (
//                 analysisResult.matchedKeywords.map((keyword, idx) => (
//                   <span key={idx} className="keyword-tag matched">{keyword}</span>
//                 ))
//               ) : (
//                 <p className="no-keywords">No matched keywords found</p>
//               )}
//             </div>
//           </div>

//           <div className="keyword-category">
//             <h4>❌ Missing Keywords ({analysisResult.missingKeywords.length})</h4>
//             <div className="keyword-tags">
//               {analysisResult.missingKeywords.length > 0 ? (
//                 analysisResult.missingKeywords.map((keyword, idx) => (
//                   <span key={idx} className="keyword-tag missing">{keyword}</span>
//                 ))
//               ) : (
//                 <p className="no-keywords">Great! All important keywords are present</p>
//               )}
//             </div>
//             {analysisResult.missingKeywords.length > 0 && (
//               <div className="improvement-tip">
//                 <strong>💡 Tip:</strong> Add these keywords naturally to your resume to improve your ATS score by up to {analysisResult.potentialImprovement}%
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Recommendations */}
//         <div className="recommendations-section">
//           <h3>🎯 Recommendations to Improve</h3>
//           <ul className="recommendation-list">
//             {analysisResult.recommendations.map((rec, idx) => (
//               <li key={idx}>
//                 <span className="rec-number">{idx + 1}</span>
//                 {rec}
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Sample Interview Questions */}
//         <div className="sample-questions-section">
//           <h3>💬 AI-Generated Interview Questions</h3>
//           {analysisResult.questionsSource === 'backup' && (
//             <div className="info-banner">
//               <span className="info-icon">ℹ️</span>
//               Using backup questions (AI generation unavailable)
//             </div>
//           )}
//           {analysisResult.questionsSource !== 'backup' && (
//             <div className="success-banner">
//               <span className="success-icon">✨</span>
//               Questions generated using AI based on your resume and JD
//             </div>
//           )}
//           <p className="questions-subtitle">
//             Prepare for your interview with these questions based on your resume and the job description
//           </p>
//           <div className="questions-list">
//             {analysisResult.sampleQuestions.map((question, idx) => (
//               <div key={idx} className="question-card">
//                 <div className="question-header">
//                   <span className="question-number">Q{idx + 1}</span>
//                   <div className="question-badges">
//                     <span className="question-category">{question.category}</span>
//                     <span className={`question-difficulty ${question.difficulty.toLowerCase()}`}>
//                       {question.difficulty}
//                     </span>
//                   </div>
//                 </div>
//                 <p className="question-text">{question.question}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Format Analysis */}
//         <div className="format-analysis">
//           <h3>📋 Format & Structure Analysis</h3>
//           <div className="format-checks">
//             <div className={`check-item ${analysisResult.formatChecks.hasContactInfo ? 'pass' : 'fail'}`}>
//               <span className="check-icon">
//                 {analysisResult.formatChecks.hasContactInfo ? '✓' : '✗'}
//               </span>
//               Contact Information Present
//             </div>
//             <div className={`check-item ${analysisResult.formatChecks.hasStandardSections ? 'pass' : 'fail'}`}>
//               <span className="check-icon">
//                 {analysisResult.formatChecks.hasStandardSections ? '✓' : '✗'}
//               </span>
//               Standard Sections Used
//             </div>
//             <div className={`check-item ${analysisResult.formatChecks.isATSFriendly ? 'pass' : 'fail'}`}>
//               <span className="check-icon">
//                 {analysisResult.formatChecks.isATSFriendly ? '✓' : '✗'}
//               </span>
//               ATS-Friendly Format
//             </div>
//           </div>
//         </div>

//         <button onClick={handleReset} className="secondary-btn reset-btn">
//           Analyze Another Resume
//         </button>
//       </div>
//     );
//   };

//   const getScoreClass = (score) => {
//     if (score >= 80) return 'excellent';
//     if (score >= 60) return 'good';
//     if (score >= 40) return 'fair';
//     return 'poor';
//   };

//   const getScoreDescription = (score) => {
//     if (score >= 80) return 'Excellent! Your resume is well-optimized for ATS.';
//     if (score >= 60) return 'Good match. Consider adding missing keywords.';
//     if (score >= 40) return 'Fair. Significant improvements needed.';
//     return 'Poor match. Major revisions recommended.';
//   };

//   return (
//     <div className="resume-page">
//       <div className="resume-container">
//         <div className="resume-header">
//           <h1>🎯 Resume ATS Analyzer</h1>
//           <p>Upload your resume and job description to get AI-powered insights and ATS score</p>
//           <button onClick={() => onNavigate('dashboard')} className="secondary-btn back-btn">
//             ← Back to Dashboard
//           </button>
//         </div>

//         {!analysisResult && (
//           <>
//             {/* Upload Section */}
//             <div className="upload-section">
//               <div className="upload-card">
//                 <h3>📄 Upload Resume</h3>
//                 <p className="upload-description">PDF or DOCX format (Max 5MB)</p>
//                 <div className="file-upload">
//                   <input
//                     type="file"
//                     id="resume-upload"
//                     accept=".pdf,.docx"
//                     onChange={handleResumeUpload}
//                     className="file-input"
//                   />
//                   <label htmlFor="resume-upload" className="file-label">
//                     <span className="file-icon">📎</span>
//                     <span className="file-text">
//                       {resumeFile ? resumeFile.name : 'Click to choose file'}
//                     </span>
//                   </label>
//                   {resumeFile && (
//                     <div className="file-success">
//                       ✓ File uploaded successfully
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div className="jd-card">
//                 <h3>📝 Job Description</h3>
//                 <p className="upload-description">Paste the complete job description</p>
//                 <textarea
//                   placeholder="Paste the job description here...

// Example:
// We are looking for a Software Engineer with 3+ years of experience in React, Node.js, and MongoDB. The ideal candidate should have strong problem-solving skills..."
//                   value={jdText}
//                   onChange={(e) => setJdText(e.target.value)}
//                   className="jd-textarea"
//                   rows="12"
//                 />
//                 <div className="char-count">
//                   {jdText.length} characters
//                 </div>
//               </div>
//             </div>

//             {error && (
//               <div className="error-message">
//                 <span className="error-icon">⚠️</span>
//                 {error}
//               </div>
//             )}

//             <div className="action-section">
//               <button
//                 onClick={handleAnalyze}
//                 disabled={isLoading || !resumeFile || !jdText.trim()}
//                 className="primary-btn analyze-btn"
//               >
//                 {isLoading ? (
//                   <>
//                     <span className="spinner-small"></span>
//                     Analyzing...
//                   </>
//                 ) : (
//                   <>
//                     <span>🔍</span>
//                     Analyze Resume
//                   </>
//                 )}
//               </button>
//             </div>

//             {isLoading && (
//               <div className="loading-container">
//                 <div className="spinner"></div>
//                 <p>Analyzing your resume with AI...</p>
//                 <p className="loading-subtext">This may take 10-15 seconds</p>
//               </div>
//             )}
//           </>
//         )}

//         {renderAnalysisResults()}
//       </div>
//     </div>
//   );
// };

// export default ResumePage;
import React, { useState } from 'react';
import '../styles/ResumePage.css';

const ResumePage = ({ user, onNavigate, onLogout }) => {
  const [resumeFile, setResumeFile] = useState(null);
  const [jdText, setJdText] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showAnimation, setShowAnimation] = useState(false);

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'application/pdf' || 
                  file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      setResumeFile(file);
      setError('');
    } else {
      setError('Please upload a PDF or DOCX file');
      setResumeFile(null);
    }
  };

  const handleAnalyze = async () => {
    if (!resumeFile || !jdText.trim()) {
      setError('Please upload resume and provide job description');
      return;
    }

    setIsLoading(true);
    setError('');
    setShowAnimation(false);

    const formData = new FormData();
    formData.append('resume', resumeFile);
    formData.append('jobDescription', jdText);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/resume/analyze', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setAnalysisResult(data.analysis);
        setTimeout(() => setShowAnimation(true), 100);
      } else {
        setError(data.error || 'Analysis failed');
      }
    } catch (err) {
      setError('Could not connect to server');
      console.error('Analysis error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResumeFile(null);
    setJdText('');
    setAnalysisResult(null);
    setError('');
    setShowAnimation(false);
  };

  const renderAnalysisResults = () => {
    if (!analysisResult) return null;

    return (
      <div className={`analysis-results ${showAnimation ? 'fade-in' : ''}`}>
        
        {/* Hero Score Card with Animated Circle */}
        <div className="score-hero-card">
          <div className="score-hero-content">
            <h2 className="score-hero-title">Your ATS Score</h2>
            <div className="score-visualization">
              <svg className="score-progress-ring" width="200" height="200">
                <circle
                  className="score-progress-ring-circle-bg"
                  stroke="#e0e7ff"
                  strokeWidth="15"
                  fill="transparent"
                  r="85"
                  cx="100"
                  cy="100"
                />
                <circle
                  className="score-progress-ring-circle"
                  stroke={getScoreColor(analysisResult.atsScore)}
                  strokeWidth="15"
                  fill="transparent"
                  r="85"
                  cx="100"
                  cy="100"
                  strokeDasharray={`${2 * Math.PI * 85}`}
                  strokeDashoffset={`${2 * Math.PI * 85 * (1 - analysisResult.atsScore / 100)}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="score-center">
                <span className={`score-number ${getScoreClass(analysisResult.atsScore)}`}>
                  {analysisResult.atsScore}
                </span>
                <span className="score-label">/ 100</span>
              </div>
            </div>
            <p className="score-description">{getScoreDescription(analysisResult.atsScore)}</p>
            <div className="score-metadata">
              <div className="score-stat">
                <span className="stat-value">{analysisResult.matchedKeywords.length}</span>
                <span className="stat-label">Matched</span>
              </div>
              <div className="score-stat">
                <span className="stat-value">{analysisResult.missingKeywords.length}</span>
                <span className="stat-label">Missing</span>
              </div>
              <div className="score-stat">
                <span className="stat-value">+{analysisResult.potentialImprovement}%</span>
                <span className="stat-label">Potential</span>
              </div>
            </div>
          </div>
        </div>

        {/* Keywords Section with Progress Bars */}
        <div className="keywords-container">
          <div className="keywords-card matched-keywords-card">
            <div className="card-header-modern">
              <div className="header-icon success-icon">✓</div>
              <div>
                <h3>Matched Keywords</h3>
                <p className="card-subtitle">{analysisResult.matchedKeywords.length} keywords found in your resume</p>
              </div>
            </div>
            <div className="progress-bar-container">
              <div 
                className="progress-bar success-bar" 
                style={{width: `${(analysisResult.matchedKeywords.length / (analysisResult.matchedKeywords.length + analysisResult.missingKeywords.length)) * 100}%`}}
              ></div>
            </div>
            <div className="keyword-cloud">
              {analysisResult.matchedKeywords.length > 0 ? (
                analysisResult.matchedKeywords.map((keyword, idx) => (
                  <span key={idx} className="keyword-badge matched-badge" style={{animationDelay: `${idx * 0.05}s`}}>
                    {keyword}
                  </span>
                ))
              ) : (
                <p className="no-keywords">No matched keywords found</p>
              )}
            </div>
          </div>

          <div className="keywords-card missing-keywords-card">
            <div className="card-header-modern">
              <div className="header-icon warning-icon">!</div>
              <div>
                <h3>Missing Keywords</h3>
                <p className="card-subtitle">Add these to improve your score</p>
              </div>
            </div>
            <div className="progress-bar-container">
              <div 
                className="progress-bar warning-bar" 
                style={{width: `${(analysisResult.missingKeywords.length / (analysisResult.matchedKeywords.length + analysisResult.missingKeywords.length)) * 100}%`}}
              ></div>
            </div>
            <div className="keyword-cloud">
              {analysisResult.missingKeywords.length > 0 ? (
                analysisResult.missingKeywords.map((keyword, idx) => (
                  <span key={idx} className="keyword-badge missing-badge" style={{animationDelay: `${idx * 0.05}s`}}>
                    {keyword}
                  </span>
                ))
              ) : (
                <p className="no-keywords success-text">✨ Great! All important keywords are present</p>
              )}
            </div>
            {analysisResult.missingKeywords.length > 0 && (
              <div className="improvement-banner">
                <span className="banner-icon">💡</span>
                <span className="banner-text">
                  Adding these keywords can boost your score by up to <strong>{analysisResult.potentialImprovement}%</strong>
                </span>
              </div>
            )}
          </div>
        </div>

        {/* AI Recommendations with Timeline Design */}
        <div className="recommendations-card">
          <div className="card-header-modern">
            <div className="header-icon primary-icon">🎯</div>
            <div>
              <h3>AI-Powered Recommendations</h3>
              <p className="card-subtitle">Actionable steps to optimize your resume</p>
            </div>
          </div>
          <div className="recommendations-timeline">
            {analysisResult.recommendations.map((rec, idx) => (
              <div key={idx} className="timeline-item" style={{animationDelay: `${idx * 0.1}s`}}>
                <div className="timeline-marker">{idx + 1}</div>
                <div className="timeline-content">
                  <p>{rec}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interview Questions - Card Grid */}
        <div className="questions-section">
          <div className="section-header-modern">
            <div className="header-icon-large">💬</div>
            <div className="header-content">
              <h2>AI-Generated Interview Questions</h2>
              <p className="section-subtitle">
                {analysisResult.questionsSource === 'groq' ? (
                  <span className="ai-badge"><span className="sparkle">✨</span> Generated using AI based on your resume & JD</span>
                ) : (
                  <span className="backup-badge">📋 Using backup questions (AI unavailable)</span>
                )}
              </p>
            </div>
          </div>

          <div className="questions-grid">
            {analysisResult.sampleQuestions.map((question, idx) => (
              <div key={idx} className="question-card-modern" style={{animationDelay: `${idx * 0.05}s`}}>
                <div className="question-header-modern">
                  <span className="question-badge">{`Q${idx + 1}`}</span>
                  <div className="question-tags">
                    <span className={`tag category-tag ${question.category.toLowerCase()}`}>
                      {question.category}
                    </span>
                    <span className={`tag difficulty-tag ${question.difficulty.toLowerCase()}`}>
                      {question.difficulty}
                    </span>
                  </div>
                </div>
                <p className="question-text">{question.question}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Format Checks - Dashboard Style */}
        <div className="format-section">
          <div className="card-header-modern">
            <div className="header-icon primary-icon">📋</div>
            <div>
              <h3>Resume Format Analysis</h3>
              <p className="card-subtitle">ATS compatibility checks</p>
            </div>
          </div>
          <div className="format-grid">
            <div className={`format-check-card ${analysisResult.formatChecks.hasContactInfo ? 'pass' : 'fail'}`}>
              <div className="check-icon-large">
                {analysisResult.formatChecks.hasContactInfo ? '✓' : '✗'}
              </div>
              <h4>Contact Info</h4>
              <p>{analysisResult.formatChecks.hasContactInfo ? 'Present' : 'Missing'}</p>
            </div>
            <div className={`format-check-card ${analysisResult.formatChecks.hasStandardSections ? 'pass' : 'fail'}`}>
              <div className="check-icon-large">
                {analysisResult.formatChecks.hasStandardSections ? '✓' : '✗'}
              </div>
              <h4>Standard Sections</h4>
              <p>{analysisResult.formatChecks.hasStandardSections ? 'Detected' : 'Missing'}</p>
            </div>
            <div className={`format-check-card ${analysisResult.formatChecks.isATSFriendly ? 'pass' : 'fail'}`}>
              <div className="check-icon-large">
                {analysisResult.formatChecks.isATSFriendly ? '✓' : '✗'}
              </div>
              <h4>ATS Friendly</h4>
              <p>{analysisResult.formatChecks.isATSFriendly ? 'Optimized' : 'Needs Work'}</p>
            </div>
          </div>
        </div>

        <button onClick={handleReset} className="reset-btn-modern">
          <span className="btn-icon">🔄</span>
          Analyze Another Resume
        </button>
      </div>
    );
  };

  const getScoreClass = (score) => {
    if (score >= 80) return 'excellent';
    if (score >= 60) return 'good';
    if (score >= 40) return 'fair';
    return 'poor';
  };

  const getScoreColor = (score) => {
    if (score >= 80) return '#10b981';
    if (score >= 60) return '#3b82f6';
    if (score >= 40) return '#f59e0b';
    return '#ef4444';
  };

  const getScoreDescription = (score) => {
    if (score >= 80) return '🎉 Excellent! Your resume is well-optimized for ATS systems.';
    if (score >= 60) return '👍 Good match! Consider adding missing keywords for better results.';
    if (score >= 40) return '⚠️ Fair match. Significant improvements recommended.';
    return '❌ Needs attention. Major revisions required to pass ATS screening.';
  };

  return (
    <div className="resume-page-modern">
      <div className="resume-container-modern">
        
        {/* Modern Header with Gradient */}
        <div className="page-header-modern">
          <button onClick={() => onNavigate('dashboard')} className="back-btn-modern">
            <span className="back-icon">←</span>
          </button>
          <div className="header-content-modern">
            <h1 className="page-title-modern">
              <span className="title-icon">🎯</span>
              Resume ATS Analyzer
            </h1>
            <p className="page-subtitle-modern">
              Get AI-powered insights and optimize your resume for Applicant Tracking Systems
            </p>
          </div>
        </div>

        {!analysisResult && (
          <>
            {/* Upload Section - Glass Card Design */}
            <div className="upload-section-modern">
              
              {/* Resume Upload Card */}
              <div className="upload-card-modern">
                <div className="card-icon-modern">📄</div>
                <h3>Upload Your Resume</h3>
                <p className="card-description">PDF or DOCX • Max 5MB</p>
                
                <div className="file-upload-modern">
                  <input
                    type="file"
                    id="resume-upload"
                    accept=".pdf,.docx"
                    onChange={handleResumeUpload}
                    className="file-input-hidden"
                  />
                  <label htmlFor="resume-upload" className="file-label-modern">
                    <span className="file-icon-modern">📎</span>
                    <span className="file-text-modern">
                      {resumeFile ? resumeFile.name : 'Choose your resume'}
                    </span>
                    {!resumeFile && <span className="file-cta">Browse</span>}
                  </label>
                  {resumeFile && (
                    <div className="file-success-modern">
                      <span className="success-icon-modern">✓</span>
                      File uploaded successfully
                    </div>
                  )}
                </div>
              </div>

              {/* Job Description Card */}
              <div className="jd-card-modern">
                <div className="card-icon-modern">📝</div>
                <h3>Job Description</h3>
                <p className="card-description">Paste the complete job posting</p>
                
                <textarea
                  placeholder="Example:

We are looking for a Software Engineer with 3+ years of experience in React, Node.js, and MongoDB...

Requirements:
• Strong proficiency in JavaScript
• Experience with React and modern frameworks
• Database management with MongoDB
..."
                  value={jdText}
                  onChange={(e) => setJdText(e.target.value)}
                  className="jd-textarea-modern"
                  rows="14"
                />
                <div className="char-count-modern">
                  <span className={jdText.length < 50 ? 'count-warning' : 'count-ok'}>
                    {jdText.length} characters {jdText.length < 50 && '(min 50 required)'}
                  </span>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="error-banner-modern">
                <span className="error-icon-modern">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            {/* Analyze Button */}
            <div className="action-section-modern">
              <button
                onClick={handleAnalyze}
                disabled={isLoading || !resumeFile || !jdText.trim() || jdText.length < 50}
                className="analyze-btn-modern"
              >
                {isLoading ? (
                  <>
                    <span className="spinner-modern"></span>
                    Analyzing with AI...
                  </>
                ) : (
                  <>
                    <span className="btn-icon">🔍</span>
                    Analyze Resume
                  </>
                )}
              </button>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="loading-overlay-modern">
                <div className="loading-card-modern">
                  <div className="loading-spinner-large"></div>
                  <h3>Analyzing Your Resume...</h3>
                  <p>Our AI is processing your resume and generating insights</p>
                  <div className="loading-steps">
                    <div className="loading-step active">📄 Extracting text</div>
                    <div className="loading-step active">🔍 Analyzing keywords</div>
                    <div className="loading-step active">🤖 Generating questions</div>
                    <div className="loading-step">✨ Preparing results</div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {renderAnalysisResults()}
      </div>
    </div>
  );
};

export default ResumePage;
