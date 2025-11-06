// import React, { useState, useEffect } from 'react';
// import '../styles/Dashboard.css';

// const Dashboard = ({ user, onLogout, onNavigate }) => {
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [todayGoal, setTodayGoal] = useState({ completed: 3, total: 5 });
//   const [showAnalytics, setShowAnalytics] = useState(false);
//   const [recentSession, setRecentSession] = useState({
//     type: "AI Interview",
//     topic: "System Design",
//     score: 78,
//     timeAgo: "2 hours ago"
//   });

//   useEffect(() => {
//     const timer = setInterval(() => setCurrentTime(new Date()), 1000);
//     return () => clearInterval(timer);
//   }, []);

//   const getGreeting = () => {
//     const hour = currentTime.getHours();
//     if (hour < 12) return 'Good Morning';
//     if (hour < 17) return 'Good Afternoon';
//     return 'Good Evening';
//   };

//   const progressPercentage = (todayGoal.completed / todayGoal.total) * 100;

//   const handleNavigation = (page, params = {}) => {
//     if (onNavigate) {
//       onNavigate(page, params);
//     } else {
//       console.log(`Navigation to: ${page}`, params);
//       alert(`Feature coming soon: ${page}`);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     onLogout();
//   };

//   // Mock data for enhanced features
//   const quickStats = [
//     { label: "Today's Progress", value: `${Math.round(progressPercentage)}%`, icon: "🎯" },
//     { label: "Streak", value: "7 days", icon: "🔥" },
//     { label: "Average Score", value: "67%", icon: "📊" }
//   ];

//   const recentActivities = [
//     { type: "Quiz", topic: "DBMS", score: 85, time: "1h ago" },
//     { type: "Study", topic: "OS Concepts", progress: "Reading", time: "3h ago" },
//     { type: "Interview", topic: "OOPs", score: 72, time: "Yesterday" }
//   ];

//   const todayTips = [
//     "💡 Start with easier topics to build confidence",
//     "🎯 Focus on one concept at a time for better retention",
//     "⚡ Take 5-minute breaks between study sessions"
//   ];

//   return (
//     <div className="dashboard">
//       {/* Enhanced Header */}
//       <header className="dashboard-header">
//         <div className="header-left">
//           <div className="logo">
//             <div className="logo-content">
//               <h2>PrepMate</h2>
//               <span className="logo-tagline">Learn • Practice • Succeed</span>
//             </div>
//             <span className="time-badge">{currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
//           </div>
//         </div>
//         <div className="header-right">
//           <div className="user-menu">
//             <div className="user-avatar">
//               {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
//             </div>
//             <button className="logout-btn" onClick={handleLogout}>
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9M16 17L21 12L16 7M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//               </svg>
//             </button>
//           </div>
//         </div>
//       </header>

//       <main className="dashboard-main">
//         <div className="dashboard-container">
          
//           {/* Enhanced Hero Section */}
//           <section className="hero-section">
//             <div className="hero-background">
//               <div className="floating-shape shape-1"></div>
//               <div className="floating-shape shape-2"></div>
//               <div className="floating-shape shape-3"></div>
//             </div>
//             <div className="hero-content">
//              <h1>
//                 <span className="gradient-text">{getGreeting()}, {user.firstName}!</span> 👋
//             </h1>
//               <p className="hero-subtitle">Ready to level up your interview skills?</p>
              
//               {/* Primary Action */}
//               <div className="primary-action">
//                 <button   
//                   className="btn-primary-large"
//                   onClick={() => handleNavigation('interview')}
//                 >
//                   🎤 Start AI Interview
//                 </button>
//                 <p className="action-description">Begin your personalized practice session</p>
//               </div>

//               {/* Recent Context */}
//               {recentSession && (
//                 <div className="recent-context">
//                   <span className="context-label">Last session:</span>
//                   <span className="context-value">
//                     {recentSession.type} • {recentSession.score}% • {recentSession.timeAgo}
//                   </span>
//                   <button 
//                     className="link-btn"
//                     onClick={() => handleNavigation('reports')}
//                   >
//                     View details →
//                   </button>
//                 </div>
//               )}
//             </div>
//           </section>

//           {/* Secondary Actions - Enhanced */}
//           <section className="secondary-actions">
//             <h2 className="section-title">Continue Learning</h2>
//             <div className="action-grid-enhanced">
//               <div className="action-card-enhanced quiz-card" onClick={() => handleNavigation('quiz')}>
//                 <div className="card-header">
//                   <div className="card-icon">📝</div>
//                   <div className="card-badge">Popular</div>
//                 </div>
//                 <h3>Take Quiz</h3>
//                 <p>Test your knowledge across 5 core topics</p>
//                 <div className="card-footer">
//                   <span className="card-meta">~15 minutes</span>
//                 </div>
//               </div>
              
//               <div className="action-card-enhanced study-card" onClick={() => handleNavigation('study')}>
//                 <div className="card-header">
//                   <div className="card-icon">📚</div>
//                   <div className="card-badge">Updated</div>
//                 </div>
//                 <h3>Study Materials</h3>
//                 <p>Curated content from standard textbooks</p>
//                 <div className="card-footer">
//                   <span className="card-meta">500+ resources</span>
//                 </div>
//               </div>
              
//               <div className="action-card-enhanced analytics-card" onClick={() => setShowAnalytics(!showAnalytics)}>
//                 <div className="card-header">
//                   <div className="card-icon">📊</div>
//                   <div className="card-badge">Insights</div>
//                 </div>
//                 <h3>Analytics</h3>
//                 <p>Track your progress and improvements</p>
//                 <div className="card-footer">
//                   <span className="card-meta">Real-time data</span>
//                 </div>
//               </div>
//             </div>
//           </section>

          

//           {/* Progressive Disclosure - Analytics */}
//           {showAnalytics && (
//             <section className="analytics-section">
//               <div className="analytics-header">
//                 <h2>Detailed Analytics</h2>
//                 <button 
//                   className="btn-secondary"
//                   onClick={() => handleNavigation('reports')}
//                 >
//                   View Full Report
//                 </button>
//               </div>
              
//               <div className="analytics-grid">
//                 <div className="metric-card">
//                   <div className="metric-value">{Math.round(progressPercentage)}%</div>
//                   <div className="metric-label">Today's Goals</div>
//                   <div className="metric-detail">{todayGoal.completed} of {todayGoal.total}</div>
//                 </div>
                
//                 <div className="metric-card">
//                   <div className="metric-value">7</div>
//                   <div className="metric-label">Day Streak</div>
//                   <div className="metric-detail">Keep it up! 🔥</div>
//                 </div>
                
//                 <div className="metric-card">
//                   <div className="metric-value">67%</div>
//                   <div className="metric-label">Average Score</div>
//                   <div className="metric-detail">Trending up ↗️</div>
//                 </div>
//               </div>
//             </section>
//           )}

          

//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from 'react';
import '../styles/Dashboard.css';

const Dashboard = ({ user, onLogout, onNavigate }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [todayGoal, setTodayGoal] = useState({ completed: 3, total: 5 });
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [recentSession, setRecentSession] = useState({
    type: "AI Interview",
    topic: "System Design",
    score: 78,
    timeAgo: "2 hours ago"
  });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const progressPercentage = (todayGoal.completed / todayGoal.total) * 100;

  const handleNavigation = (page, params = {}) => {
    if (onNavigate) {
      onNavigate(page, params);
    } else {
      console.log(`Navigation to: ${page}`, params);
      alert(`Feature coming soon: ${page}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    onLogout();
  };

  // Mock data for enhanced features
  const quickStats = [
    { label: "Today's Progress", value: `${Math.round(progressPercentage)}%`, icon: "🎯" },
    { label: "Streak", value: "7 days", icon: "🔥" },
    { label: "Average Score", value: "67%", icon: "📊" }
  ];

  const recentActivities = [
    { type: "Quiz", topic: "DBMS", score: 85, time: "1h ago" },
    { type: "Study", topic: "OS Concepts", progress: "Reading", time: "3h ago" },
    { type: "Interview", topic: "OOPs", score: 72, time: "Yesterday" }
  ];

  const todayTips = [
    "💡 Start with easier topics to build confidence",
    "🎯 Focus on one concept at a time for better retention",
    "⚡ Take 5-minute breaks between study sessions"
  ];

  return (
    <div className="dashboard">
      {/* Enhanced Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <div className="logo">
            <div className="logo-content">
              <h2>PrepMate</h2>
              <span className="logo-tagline">Learn • Practice • Succeed</span>
            </div>
            <span className="time-badge">{currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
          </div>
        </div>
        <div className="header-right">
          <div className="user-menu">
            <div className="user-avatar">
              {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9M16 17L21 12L16 7M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-container">
          
          {/* Enhanced Hero Section */}
          <section className="hero-section">
            <div className="hero-background">
              <div className="floating-shape shape-1"></div>
              <div className="floating-shape shape-2"></div>
              <div className="floating-shape shape-3"></div>
            </div>
            <div className="hero-content">
              <h1>
                <span className="gradient-text">{getGreeting()}, {user.firstName}!</span> 👋
              </h1>
              <p className="hero-subtitle">Ready to level up your interview skills?</p>
              
              {/* Primary Action */}
              <div className="primary-action">
                <button   
                  className="btn-primary-large"
                  onClick={() => handleNavigation('interview')}
                >
                  🎤 Start AI Interview
                </button>
                <p className="action-description">Begin your personalized practice session</p>
              </div>

              {/* Recent Context */}
              {recentSession && (
                <div className="recent-context">
                  <span className="context-label">Last session:</span>
                  <span className="context-value">
                    {recentSession.type} • {recentSession.score}% • {recentSession.timeAgo}
                  </span>
                  <button 
                    className="link-btn"
                    onClick={() => handleNavigation('reports')}
                  >
                    View details →
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* Secondary Actions - Enhanced with Resume Card */}
          <section className="secondary-actions">
            <h2 className="section-title">Continue Learning</h2>
            <div className="action-grid-enhanced">
              <div className="action-card-enhanced quiz-card" onClick={() => handleNavigation('quiz')}>
                <div className="card-header">
                  <div className="card-icon">📝</div>
                  <div className="card-badge">Popular</div>
                </div>
                <h3>Take Quiz</h3>
                <p>Test your knowledge across 5 core topics</p>
                <div className="card-footer">
                  <span className="card-meta">~15 minutes</span>
                </div>
              </div>
              
              <div className="action-card-enhanced study-card" onClick={() => handleNavigation('study')}>
                <div className="card-header">
                  <div className="card-icon">📚</div>
                  <div className="card-badge">Updated</div>
                </div>
                <h3>Study Materials</h3>
                <p>Curated content from standard textbooks</p>
                <div className="card-footer">
                  <span className="card-meta">100+ resources</span>
                </div>
              </div>
              
              {/* NEW - Resume ATS Analyzer Card */}
              <div className="action-card-enhanced resume-card" onClick={() => handleNavigation('resume')}>
                <div className="card-header">
                  <div className="card-icon">📄</div>
                  <div className="card-badge new-badge">New</div>
                </div>
                <h3>Resume Analyzer</h3>
                <p>Get ATS score & AI-powered interview questions</p>
                <div className="card-footer">
                  <span className="card-meta">AI-powered</span>
                </div>
              </div>
              
              {/* <div className="action-card-enhanced analytics-card" onClick={() => setShowAnalytics(!showAnalytics)}>
                <div className="card-header">
                  <div className="card-icon">📊</div>
                  <div className="card-badge">Insights</div>
                </div>
                <h3>Analytics</h3>
                <p>Track your progress and improvements</p>
                <div className="card-footer">
                  <span className="card-meta">Real-time data</span>
                </div>
              </div> */}
            </div>
          </section>

          {/* Progressive Disclosure - Analytics */}
          {showAnalytics && (
            <section className="analytics-section">
              <div className="analytics-header">
                <h2>Detailed Analytics</h2>
                <button 
                  className="btn-secondary"
                  onClick={() => handleNavigation('reports')}
                >
                  View Full Report
                </button>
              </div>
              
              <div className="analytics-grid">
                <div className="metric-card">
                  <div className="metric-value">{Math.round(progressPercentage)}%</div>
                  <div className="metric-label">Today's Goals</div>
                  <div className="metric-detail">{todayGoal.completed} of {todayGoal.total}</div>
                </div>
                
                <div className="metric-card">
                  <div className="metric-value">7</div>
                  <div className="metric-label">Day Streak</div>
                  <div className="metric-detail">Keep it up! 🔥</div>
                </div>
                
                <div className="metric-card">
                  <div className="metric-value">67%</div>
                  <div className="metric-label">Average Score</div>
                  <div className="metric-detail">Trending up ↗️</div>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
