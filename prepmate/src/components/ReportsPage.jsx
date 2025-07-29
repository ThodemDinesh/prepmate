
// import React, { useState, useEffect } from 'react';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
// import '../styles/ReportsPage.css';

// const ReportsPage = ({ user, onNavigate, interviewData }) => {
//   const [report, setReport] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [activeQuestion, setActiveQuestion] = useState(null);

//   useEffect(() => {
//     const generateReport = async () => {
//       // Prioritize prop from navigation, but fall back to sessionStorage for refresh resilience.
//       let dataForReport = interviewData;
//       if (!dataForReport) {
//         try {
//           const storedData = sessionStorage.getItem('latestInterviewReport');
//           if (storedData) {
//             dataForReport = JSON.parse(storedData);
//           }
//         } catch (e) {
//           console.error("Could not parse report from sessionStorage", e);
//         }
//       }

//       if (!dataForReport || !dataForReport.transcript || !dataForReport.topic) {
//         setError('Interview data not found. Please complete an interview to view a report.');
//         setIsLoading(false);
//         return;
//       }

//       try {
//         setIsLoading(true);
//         const response = await fetch('http://localhost:5000/api/interview/generate-report', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             transcript: dataForReport.transcript,
//             topic: dataForReport.topic,
//           }),
//         });

//         const data = await response.json();

//         if (data.success) {
//           setReport(data.report);
//         } else {
//           setError(data.error || 'Failed to generate report.');
//         }
//       } catch (err) {
//         console.error('Report generation fetch error:', err);
//         setError('An error occurred while connecting to the server.');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     generateReport();
//   }, [interviewData]);

//   const toggleQuestion = (index) => {
//     setActiveQuestion(activeQuestion === index ? null : index);
//   };

//   if (isLoading) {
//     return (
//       <div className="report-container loading-container">
//         <div className="loader-animation">
//           <div className="loader-icon">🤖</div>
//           <h2>PrepMate AI Coach is Analyzing Your Performance...</h2>
//           <p>Generating your personalized feedback report. This might take a moment.</p>
//           <div className="progress-bar-animated">
//             <div className="progress-bar-inner"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="report-container error-container">
//         <div className="error-content">
//           <div className="error-icon">😞</div>
//           <h2>Oops! Something Went Wrong</h2>
//           <p>{error}</p>
//           <button onClick={() => onNavigate('dashboard')} className="primary-btn">
//             Back to Dashboard
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!report) {
//     return null; // Should not happen if not loading and no error, but good practice
//   }
  
//   const { overallScore, overallSummary, skillRatings, strengths, areasForImprovement, questionAnalysis, actionableNextSteps } = report;

//   return (
//     <div className="report-container">
//       <div className="report-header">
//         <div>
//           <h1>Your AI-Powered Interview Report</h1>
//           <p>Hi {user?.firstName || 'User'}, here's a detailed breakdown of your {interviewData?.topic || 'latest'} interview.</p>
//         </div>
//         <button onClick={() => onNavigate('interview')} className="secondary-btn">
//           🔄 Practice Again
//         </button>
//       </div>

//       <div className="report-main-grid">
//         <div className="report-card score-card">
//           <h3>Overall Score</h3>
//           <div className="score-visual">
//             <div className="score-circle" style={{'--score': overallScore * 10}}>
//               <span>{overallScore.toFixed(1)}<span className="score-total">/10</span></span>
//             </div>
//           </div>
//           <p className="summary-text">{overallSummary}</p>
//         </div>

//         <div className="report-card skills-card">
//           <h3>Skill Ratings</h3>
//            <ResponsiveContainer width="100%" height={250}>
//             <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillRatings}>
//               <PolarGrid />
//               <PolarAngleAxis dataKey="skill" />
//               <PolarRadiusAxis angle={30} domain={[0, 5]}/>
//               <Radar name="Your Rating" dataKey="rating" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
//               <Tooltip />
//             </RadarChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="report-card feedback-grid-card">
//            <div className="feedback-column strengths">
//               <h4>✅ Strengths</h4>
//               <ul>
//                 {strengths.map((item, index) => <li key={index}>{item}</li>)}
//               </ul>
//            </div>
//            <div className="feedback-column improvements">
//               <h4>💡 Areas for Improvement</h4>
//               <ul>
//                 {areasForImprovement.map((item, index) => <li key={index}>{item}</li>)}
//               </ul>
//            </div>
//         </div>
        
//         <div className="report-card full-width-card">
//            <h3>🎯 Actionable Next Steps</h3>
//            <div className="next-steps-container">
//               {actionableNextSteps.map((item, index) => (
//                 <div key={index} className="next-step-item">
//                   <div className="step-icon">🚀</div>
//                   <div className="step-content">
//                     <strong>{item.step}</strong>
//                     <p>{item.reason}</p>
//                   </div>
//                 </div>
//               ))}
//            </div>
//         </div>

//         <div className="report-card full-width-card">
//           <h3>🔎 Question-by-Question Analysis</h3>
//           <div className="accordion">
//             {questionAnalysis.map((item, index) => (
//               <div key={index} className="accordion-item">
//                 <div className="accordion-header" onClick={() => toggleQuestion(index)}>
//                   <span>Question {index + 1}: {item.question.substring(0, 80)}...</span>
//                   <span className={`accordion-icon ${activeQuestion === index ? 'open' : ''}`}>▼</span>
//                 </div>
//                 {activeQuestion === index && (
//                   <div className="accordion-content">
//                     <h4>Your Answer:</h4>
//                     <p className="user-answer">"{item.userAnswer}"</p>
                    
//                     <h4>Suggested Answer:</h4>
//                     <p className="suggested-answer">{item.suggestedAnswer}</p>

//                     <h4>AI Feedback:</h4>
//                     <p className="feedback">{item.feedback}</p>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReportsPage;
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import '../styles/ReportsPage.css';

const ReportsPage = ({ user, onNavigate, interviewData }) => {
  const [report, setReport] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [reportId, setReportId] = useState(null);

  useEffect(() => {
    const generateReport = async () => {
      console.log('🔍 ReportsPage: Starting report generation');
      console.log('📝 Interview data received:', interviewData);
      
      // Prioritize prop from navigation, but fall back to sessionStorage
      let dataForReport = interviewData;
      if (!dataForReport) {
        try {
          const storedData = sessionStorage.getItem('latestInterviewReport');
          console.log('📦 Retrieved from sessionStorage:', storedData);
          if (storedData) {
            dataForReport = JSON.parse(storedData);
          }
        } catch (e) {
          console.error("Could not parse report from sessionStorage", e);
        }
      }

      console.log('🎯 Final data for report:', dataForReport);

      if (!dataForReport || !dataForReport.transcript || !dataForReport.topic) {
        console.error('❌ Missing required data for report generation');
        setError('Interview data not found. Please complete an interview to view a report.');
        setIsLoading(false);
        return;
      }

      // Check if we already have a generated report (from database)
      if (dataForReport.generatedReport) {
        console.log('✅ Using pre-generated report');
        setReport(dataForReport.generatedReport);
        setReportId(dataForReport.reportId);
        setIsLoading(false);
        return;
      }

      // Check if user is authenticated
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('❌ No authentication token found');
        setError('Authentication required. Please log in again.');
        setIsLoading(false);
        onNavigate('login');
        return;
      }

      try {
        console.log('🔄 Generating new report from API...');
        setIsLoading(true);
        
        const response = await fetch('http://localhost:5000/api/interview/generate-report', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // ✅ Added Authorization header
          },
          body: JSON.stringify({
            transcript: dataForReport.transcript,
            topic: dataForReport.topic,
            difficulty: dataForReport.difficulty,
            totalQuestions: dataForReport.totalQuestions
          }),
        });

        console.log('📡 Report API response status:', response.status);
        
        if (response.status === 401) {
          console.error('❌ Authentication failed - redirecting to login');
          setError('Session expired. Please log in again.');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          onNavigate('login');
          return;
        }

        const data = await response.json();
        console.log('📊 Report API response data:', data);

        if (data.success && data.report) {
          console.log('✅ Report generated successfully');
          setReport(data.report);
          setReportId(data.sessionId);
        } else {
          console.error('❌ Report generation failed:', data.error);
          setError(data.error || 'Failed to generate report.');
        }
      } catch (err) {
        console.error('❌ Report generation fetch error:', err);
        setError('An error occurred while connecting to the server.');
      } finally {
        setIsLoading(false);
      }
    };

    generateReport();
  }, [interviewData, onNavigate]);

  const toggleQuestion = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  if (isLoading) {
    return (
      <div className="report-container loading-container">
        <div className="loader-animation">
          <div className="loader-icon">🤖</div>
          <h2>PrepMate AI Coach is Analyzing Your Performance...</h2>
          <p>Generating your personalized feedback report. This might take a moment.</p>
          <div className="progress-bar-animated">
            <div className="progress-bar-inner"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="report-container error-container">
        <div className="error-content">
          <div className="error-icon">😞</div>
          <h2>Oops! Something Went Wrong</h2>
          <p>{error}</p>
          <div className="error-actions">
            <button onClick={() => onNavigate('dashboard')} className="primary-btn">
              Back to Dashboard
            </button>
            <button onClick={() => onNavigate('interview')} className="secondary-btn">
              Try Another Interview
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="report-container error-container">
        <div className="error-content">
          <div className="error-icon">⏳</div>
          <h2>No Report Available</h2>
          <p>We couldn't find any report data. Please complete an interview first.</p>
          <button onClick={() => onNavigate('interview')} className="primary-btn">
            Start New Interview
          </button>
        </div>
      </div>
    );
  }
  
  const { overallScore, overallSummary, skillRatings, strengths, areasForImprovement, questionAnalysis, actionableNextSteps } = report;

  return (
    <div className="report-container">
      <div className="report-header">
        <div>
          <h1>Your AI-Powered Interview Report</h1>
          <p>Hi {user?.firstName || 'User'}, here's a detailed breakdown of your {interviewData?.topic || 'latest'} interview.</p>
          {reportId && <p className="report-id">Report ID: {reportId}</p>}
        </div>
        <div className="header-actions">
          <button onClick={() => onNavigate('history')} className="secondary-btn">
            📊 View History
          </button>
          <button onClick={() => onNavigate('interview')} className="primary-btn">
            🔄 Practice Again
          </button>
        </div>
      </div>

      <div className="report-main-grid">
        <div className="report-card score-card">
          <h3>Overall Score</h3>
          <div className="score-visual">
            <div className="score-circle" style={{'--score': overallScore * 10}}>
              <span>{overallScore.toFixed(1)}<span className="score-total">/10</span></span>
            </div>
          </div>
          <p className="summary-text">{overallSummary}</p>
        </div>

        <div className="report-card skills-card">
          <h3>Skill Ratings</h3>
           <ResponsiveContainer width="100%" height={250}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillRatings || []}>
              <PolarGrid />
              <PolarAngleAxis dataKey="skill" />
              <PolarRadiusAxis angle={30} domain={[0, 5]}/>
              <Radar name="Your Rating" dataKey="rating" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="report-card feedback-grid-card">
           <div className="feedback-column strengths">
              <h4>✅ Strengths</h4>
              <ul>
                {(strengths || []).map((item, index) => <li key={index}>{item}</li>)}
              </ul>
           </div>
           <div className="feedback-column improvements">
              <h4>💡 Areas for Improvement</h4>
              <ul>
                {(areasForImprovement || []).map((item, index) => <li key={index}>{item}</li>)}
              </ul>
           </div>
        </div>
        
        <div className="report-card full-width-card">
           <h3>🎯 Actionable Next Steps</h3>
           <div className="next-steps-container">
              {(actionableNextSteps || []).map((item, index) => (
                <div key={index} className="next-step-item">
                  <div className="step-icon">🚀</div>
                  <div className="step-content">
                    <strong>{item.step}</strong>
                    <p>{item.reason}</p>
                  </div>
                </div>
              ))}
           </div>
        </div>

        <div className="report-card full-width-card">
          <h3>🔎 Question-by-Question Analysis</h3>
          <div className="accordion">
            {(questionAnalysis || []).map((item, index) => (
              <div key={index} className="accordion-item">
                <div className="accordion-header" onClick={() => toggleQuestion(index)}>
                  <span>Question {index + 1}: {(item.question || 'Question').substring(0, 80)}...</span>
                  <span className={`accordion-icon ${activeQuestion === index ? 'open' : ''}`}>▼</span>
                </div>
                {activeQuestion === index && (
                  <div className="accordion-content">
                    <h4>Your Answer:</h4>
                    <p className="user-answer">"{item.userAnswer || 'No answer provided'}"</p>
                    
                    <h4>Suggested Answer:</h4>
                    <p className="suggested-answer">{item.suggestedAnswer || 'No suggestion available'}</p>

                    <h4>AI Feedback:</h4>
                    <p className="feedback">{item.feedback || 'No feedback available'}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
