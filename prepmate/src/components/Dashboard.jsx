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
              <h1>{getGreeting()}, {user.firstName}! 👋</h1>
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

              {/* Quick Stats Bar */}
              <div className="quick-stats">
                {quickStats.map((stat, index) => (
                  <div key={index} className="stat-item">
                    <span className="stat-icon">{stat.icon}</span>
                    <div className="stat-info">
                      <div className="stat-value">{stat.value}</div>
                      <div className="stat-label">{stat.label}</div>
                    </div>
                  </div>
                ))}
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

          {/* Secondary Actions - Enhanced */}
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
                  <span className="card-meta">500+ resources</span>
                </div>
              </div>
              
              <div className="action-card-enhanced analytics-card" onClick={() => setShowAnalytics(!showAnalytics)}>
                <div className="card-header">
                  <div className="card-icon">📊</div>
                  <div className="card-badge">Insights</div>
                </div>
                <h3>Analytics</h3>
                <p>Track your progress and improvements</p>
                <div className="card-footer">
                  <span className="card-meta">Real-time data</span>
                </div>
              </div>
            </div>
          </section>

          {/* Recent Activity Section */}
          <section className="activity-section">
            <h2 className="section-title">Recent Activity</h2>
            <div className="activity-grid">
              {recentActivities.map((activity, index) => (
                <div key={index} className="activity-item">
                  <div className="activity-icon">
                    {activity.type === 'Quiz' ? '📝' : activity.type === 'Study' ? '📚' : '🎤'}
                  </div>
                  <div className="activity-content">
                    <div className="activity-title">{activity.type}: {activity.topic}</div>
                    <div className="activity-meta">
                      {activity.score ? `${activity.score}% score` : activity.progress} • {activity.time}
                    </div>
                  </div>
                  <button className="activity-btn" onClick={() => handleNavigation('reports')}>
                    →
                  </button>
                </div>
              ))}
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

          {/* Today's Tips */}
          <section className="tips-section">
            <h2 className="section-title">Today's Tips</h2>
            <div className="tips-container">
              {todayTips.map((tip, index) => (
                <div key={index} className="tip-item">
                  <span className="tip-text">{tip}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Smart Recommendations */}
          <section className="smart-recommendations">
            <h2 className="section-title">Recommended for You</h2>
            <div className="recommendation-enhanced">
              <div className="rec-header">
                <span className="rec-icon">🎯</span>
                <div className="rec-content">
                  <h3>System Design Deep Dive</h3>
                  <p>Based on your recent performance, we recommend focusing on system design patterns and scalability concepts</p>
                </div>
              </div>
              <button 
                className="btn-ghost"
                onClick={() => handleNavigation('interview', { topic: 'system-design' })}
              >
                Start Practice
              </button>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;
// import React, { useState, useEffect, useCallback } from 'react';
// import '../styles/Dashboard.css';

// const Dashboard = ({ user, onLogout, onNavigate }) => {
//   // Real-time state management
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [loading, setLoading] = useState(true);
//   const [dashboardData, setDashboardData] = useState({
//     todayGoals: { completed: 0, total: 0 },
//     streak: 0,
//     averageScore: 0,
//     recentSessions: [],
//     recentActivities: [],
//     totalSessions: 0,
//     weeklyProgress: [],
//     recommendations: [],
//     achievements: []
//   });
//   const [showAnalytics, setShowAnalytics] = useState(false);
//   const [refreshing, setRefreshing] = useState(false);

//   // Real-time clock
//   useEffect(() => {
//     const timer = setInterval(() => setCurrentTime(new Date()), 1000);
//     return () => clearInterval(timer);
//   }, []);

//   // Fetch real-time dashboard data
//   const fetchDashboardData = useCallback(async () => {
//     try {
//       setRefreshing(true);
//       const token = localStorage.getItem('token');
      
//       const response = await fetch('http://localhost:5000/api/dashboard/stats', {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch dashboard data');
//       }

//       const data = await response.json();
      
//       if (data.success) {
//         setDashboardData(data.dashboardData);
//       } else {
//         console.error('Dashboard data fetch failed:', data.error);
//         // Set empty state if no data available
//         setDashboardData({
//           todayGoals: { completed: 0, total: 0 },
//           streak: 0,
//           averageScore: 0,
//           recentSessions: [],
//           recentActivities: [],
//           totalSessions: 0,
//           weeklyProgress: [],
//           recommendations: [],
//           achievements: []
//         });
//       }
//     } catch (error) {
//       console.error('Error fetching dashboard data:', error);
//       // Set empty state on error
//       setDashboardData({
//         todayGoals: { completed: 0, total: 0 },
//         streak: 0,
//         averageScore: 0,
//         recentSessions: [],
//         recentActivities: [],
//         totalSessions: 0,
//         weeklyProgress: [],
//         recommendations: [],
//         achievements: []
//       });
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   }, []);

//   // Initial data fetch and periodic refresh
//   useEffect(() => {
//     fetchDashboardData();
    
//     // Refresh dashboard data every 5 minutes
//     const refreshInterval = setInterval(fetchDashboardData, 5 * 60 * 1000);
    
//     return () => clearInterval(refreshInterval);
//   }, [fetchDashboardData]);

//   // Manual refresh function
//   const handleRefresh = () => {
//     fetchDashboardData();
//   };

//   const getGreeting = () => {
//     const hour = currentTime.getHours();
//     if (hour < 12) return 'Good Morning';
//     if (hour < 17) return 'Good Afternoon';
//     return 'Good Evening';
//   };

//   const handleNavigation = (page, params = {}) => {
//     if (onNavigate) {
//       onNavigate(page, params);
//     } else {
//       console.log(`Navigation to: ${page}`, params);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     sessionStorage.clear();
//     onLogout();
//   };

//   // Calculate dynamic progress percentage
//   const progressPercentage = dashboardData.todayGoals.total > 0 
//     ? Math.round((dashboardData.todayGoals.completed / dashboardData.todayGoals.total) * 100)
//     : 0;

//   // Generate dynamic quick stats
//   const quickStats = [
//     { 
//       label: "Today's Progress", 
//       value: dashboardData.todayGoals.total > 0 ? `${progressPercentage}%` : "No goals set", 
//       icon: "🎯",
//       detail: `${dashboardData.todayGoals.completed}/${dashboardData.todayGoals.total} completed`
//     },
//     { 
//       label: "Current Streak", 
//       value: dashboardData.streak > 0 ? `${dashboardData.streak} days` : "Start today!", 
//       icon: dashboardData.streak > 0 ? "🔥" : "💪",
//       detail: dashboardData.streak > 0 ? "Keep it going!" : "Begin your journey"
//     },
//     { 
//       label: "Average Score", 
//       value: dashboardData.averageScore > 0 ? `${Math.round(dashboardData.averageScore)}%` : "No data yet", 
//       icon: "📊",
//       detail: dashboardData.totalSessions > 0 ? `From ${dashboardData.totalSessions} sessions` : "Complete your first session"
//     }
//   ];

//   // Generate dynamic tips based on user performance
//   const generateDynamicTips = () => {
//     const tips = [];
    
//     if (dashboardData.averageScore === 0) {
//       tips.push("🚀 Take your first interview to get personalized insights");
//       tips.push("📚 Start with study materials to build your foundation");
//       tips.push("🎯 Set daily goals to track your progress");
//     } else if (dashboardData.averageScore < 50) {
//       tips.push("💡 Focus on fundamentals - revisit core concepts");
//       tips.push("📖 Spend more time with study materials before interviews");
//       tips.push("🎯 Practice with quizzes to reinforce learning");
//     } else if (dashboardData.averageScore < 75) {
//       tips.push("⚡ You're improving! Focus on your weak areas");
//       tips.push("🔄 Regular practice is key to consistency");
//       tips.push("📊 Review your interview reports for targeted improvement");
//     } else {
//       tips.push("🏆 Excellent work! Challenge yourself with advanced topics");
//       tips.push("🎓 Consider mentoring others to reinforce your knowledge");
//       tips.push("🚀 You're ready for real interviews!");
//     }

//     if (dashboardData.streak === 0) {
//       tips.push("🔥 Start a practice streak today for better retention");
//     } else if (dashboardData.streak > 7) {
//       tips.push(`🌟 Amazing ${dashboardData.streak}-day streak! Keep it up!`);
//     }

//     return tips.slice(0, 3); // Return only 3 tips
//   };

//   if (loading) {
//     return (
//       <div className="dashboard">
//         <div className="loading-container">
//           <div className="loader-animation">
//             <div className="loader-icon">🤖</div>
//             <h2>Loading Your Dashboard...</h2>
//             <p>Fetching your latest progress and insights</p>
//             <div className="progress-bar-animated">
//               <div className="progress-bar-inner"></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="dashboard">
//       {/* Enhanced Header with Real-time Updates */}
//       <header className="dashboard-header">
//         <div className="header-left">
//           <div className="logo">
//             <div className="logo-content">
//               <h2>PrepMate</h2>
//               <span className="logo-tagline">Learn • Practice • Succeed</span>
//             </div>
//             <span className="time-badge">
//               {currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
//             </span>
//           </div>
//         </div>
//         <div className="header-right">
//           <button 
//             className={`refresh-btn ${refreshing ? 'refreshing' : ''}`}
//             onClick={handleRefresh}
//             title="Refresh dashboard"
//           >
//             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path d="M23 4V10H17M1 20V14H7M20.49 9A9 9 0 0 0 5.64 5.64L1 10M12.34 2.34A9 9 0 0 1 16.36 18.36L23 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//             </svg>
//           </button>
//           <div className="user-menu">
//             <div className="user-avatar">
//               {user.firstName?.charAt(0) || 'U'}{user.lastName?.charAt(0) || 'S'}
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
          
//           {/* Dynamic Hero Section */}
//           <section className="hero-section">
//             <div className="hero-background">
//               <div className="floating-shape shape-1"></div>
//               <div className="floating-shape shape-2"></div>
//               <div className="floating-shape shape-3"></div>
//             </div>
//             <div className="hero-content">
//               <h1>{getGreeting()}, {user.firstName || 'there'}! 👋</h1>
//               <p className="hero-subtitle">
//                 {dashboardData.totalSessions === 0 
//                   ? "Ready to start your interview preparation journey?" 
//                   : `You've completed ${dashboardData.totalSessions} session${dashboardData.totalSessions === 1 ? '' : 's'}. Keep going!`
//                 }
//               </p>
              
//               {/* Primary Action */}
//               <div className="primary-action">
//                 <button 
//                   className="btn-primary-large"
//                   onClick={() => handleNavigation('interview')}
//                 >
//                   🎤 Start AI Interview
//                 </button>
//                 <p className="action-description">
//                   {dashboardData.totalSessions === 0 
//                     ? "Begin your personalized practice session" 
//                     : "Continue improving your skills"
//                   }
//                 </p>
//               </div>

//               {/* Dynamic Quick Stats Bar */}
//               <div className="quick-stats">
//                 {quickStats.map((stat, index) => (
//                   <div key={index} className="stat-item">
//                     <span className="stat-icon">{stat.icon}</span>
//                     <div className="stat-info">
//                       <div className="stat-value">{stat.value}</div>
//                       <div className="stat-label">{stat.label}</div>
//                       {stat.detail && <div className="stat-detail">{stat.detail}</div>}
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Dynamic Recent Context */}
//               {dashboardData.recentSessions.length > 0 && (
//                 <div className="recent-context">
//                   <span className="context-label">Last session:</span>
//                   <span className="context-value">
//                     {dashboardData.recentSessions[0].type} • {dashboardData.recentSessions[0].topic} • 
//                     {dashboardData.recentSessions[0].score}% • {dashboardData.recentSessions[0].timeAgo}
//                   </span>
//                   <button 
//                     className="link-btn"
//                     onClick={() => handleNavigation('reports')}
//                   >
//                     View details →
//                   </button>
//                 </div>
//               )}

//               {/* First-time user encouragement */}
//               {dashboardData.totalSessions === 0 && (
//                 <div className="welcome-message">
//                   <div className="welcome-icon">🌟</div>
//                   <div className="welcome-content">
//                     <h3>Welcome to PrepMate!</h3>
//                     <p>Start with any feature below to begin tracking your progress</p>
//                   </div>
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
//                   {dashboardData.recentActivities.some(a => a.type === 'Quiz') && (
//                     <div className="card-badge">Recent</div>
//                   )}
//                 </div>
//                 <h3>Take Quiz</h3>
//                 <p>Test your knowledge with interactive questions</p>
//                 <div className="card-footer">
//                   <span className="card-meta">
//                     {dashboardData.recentActivities.filter(a => a.type === 'Quiz').length > 0 
//                       ? `${dashboardData.recentActivities.filter(a => a.type === 'Quiz').length} completed`
//                       : "Start your first quiz"
//                     }
//                   </span>
//                 </div>
//               </div>
              
//               <div className="action-card-enhanced study-card" onClick={() => handleNavigation('study')}>
//                 <div className="card-header">
//                   <div className="card-icon">📚</div>
//                   <div className="card-badge">Essential</div>
//                 </div>
//                 <h3>Study Materials</h3>
//                 <p>Comprehensive resources for interview prep</p>
//                 <div className="card-footer">
//                   <span className="card-meta">Always updated</span>
//                 </div>
//               </div>
              
//               <div className="action-card-enhanced analytics-card" onClick={() => setShowAnalytics(!showAnalytics)}>
//                 <div className="card-header">
//                   <div className="card-icon">📊</div>
//                   {dashboardData.totalSessions > 0 && <div className="card-badge">Live Data</div>}
//                 </div>
//                 <h3>Analytics</h3>
//                 <p>
//                   {dashboardData.totalSessions > 0 
//                     ? "Track your progress and improvements" 
//                     : "No data yet - start practicing!"
//                   }
//                 </p>
//                 <div className="card-footer">
//                   <span className="card-meta">
//                     {dashboardData.totalSessions > 0 ? "Real-time updates" : "Complete sessions to unlock"}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </section>

//           {/* Dynamic Recent Activity Section */}
//           {dashboardData.recentActivities.length > 0 && (
//             <section className="activity-section">
//               <h2 className="section-title">Recent Activity</h2>
//               <div className="activity-grid">
//                 {dashboardData.recentActivities.map((activity, index) => (
//                   <div key={index} className="activity-item">
//                     <div className="activity-icon">
//                       {activity.type === 'Quiz' ? '📝' : 
//                        activity.type === 'Study' ? '📚' : 
//                        activity.type === 'Interview' ? '🎤' : '📊'}
//                     </div>
//                     <div className="activity-content">
//                       <div className="activity-title">{activity.type}: {activity.topic}</div>
//                       <div className="activity-meta">
//                         {activity.score ? `${activity.score}% score` : activity.progress} • {activity.timeAgo}
//                       </div>
//                     </div>
//                     <button className="activity-btn" onClick={() => handleNavigation('reports')}>
//                       →
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </section>
//           )}

//           {/* Progressive Disclosure - Real Analytics */}
//           {showAnalytics && dashboardData.totalSessions > 0 && (
//             <section className="analytics-section">
//               <div className="analytics-header">
//                 <h2>Live Analytics</h2>
//                 <button 
//                   className="btn-secondary"
//                   onClick={() => handleNavigation('reports')}
//                 >
//                   View Detailed Report
//                 </button>
//               </div>
              
//               <div className="analytics-grid">
//                 <div className="metric-card">
//                   <div className="metric-value">{progressPercentage}%</div>
//                   <div className="metric-label">Today's Progress</div>
//                   <div className="metric-detail">
//                     {dashboardData.todayGoals.completed} of {dashboardData.todayGoals.total} goals
//                   </div>
//                 </div>
                
//                 <div className="metric-card">
//                   <div className="metric-value">{dashboardData.streak}</div>
//                   <div className="metric-label">Day Streak</div>
//                   <div className="metric-detail">
//                     {dashboardData.streak > 0 ? "Keep it up! 🔥" : "Start today! 💪"}
//                   </div>
//                 </div>
                
//                 <div className="metric-card">
//                   <div className="metric-value">{Math.round(dashboardData.averageScore)}%</div>
//                   <div className="metric-label">Average Score</div>
//                   <div className="metric-detail">
//                     {dashboardData.averageScore > 0 
//                       ? `Across ${dashboardData.totalSessions} sessions`
//                       : "No sessions yet"
//                     }
//                   </div>
//                 </div>
//               </div>
//             </section>
//           )}

//           {/* Dynamic Tips */}
//           <section className="tips-section">
//             <h2 className="section-title">Personalized Tips</h2>
//             <div className="tips-container">
//               {generateDynamicTips().map((tip, index) => (
//                 <div key={index} className="tip-item">
//                   <span className="tip-text">{tip}</span>
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* Dynamic Smart Recommendations */}
//           {dashboardData.recommendations.length > 0 && (
//             <section className="smart-recommendations">
//               <h2 className="section-title">Recommended for You</h2>
//               {dashboardData.recommendations.map((rec, index) => (
//                 <div key={index} className="recommendation-enhanced">
//                   <div className="rec-header">
//                     <span className="rec-icon">🎯</span>
//                     <div className="rec-content">
//                       <h3>{rec.title}</h3>
//                       <p>{rec.description}</p>
//                     </div>
//                   </div>
//                   <button 
//                     className="btn-ghost"
//                     onClick={() => handleNavigation(rec.action, rec.params)}
//                   >
//                     {rec.buttonText}
//                   </button>
//                 </div>
//               ))}
//             </section>
//           )}

//           {/* Default recommendation for new users */}
//           {dashboardData.recommendations.length === 0 && dashboardData.totalSessions === 0 && (
//             <section className="smart-recommendations">
//               <h2 className="section-title">Get Started</h2>
//               <div className="recommendation-enhanced">
//                 <div className="rec-header">
//                   <span className="rec-icon">🚀</span>
//                   <div className="rec-content">
//                     <h3>Begin Your Journey</h3>
//                     <p>Start with an AI interview or explore study materials to get personalized recommendations</p>
//                   </div>
//                 </div>
//                 <button 
//                   className="btn-ghost"
//                   onClick={() => handleNavigation('interview')}
//                 >
//                   Start First Interview
//                 </button>
//               </div>
//             </section>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;
