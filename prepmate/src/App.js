
// import React, { useState, useEffect } from 'react';
// import LandingPage from './components/LandingPage';
// import LoginPage from './components/LoginPage';
// import SignupPage from './components/SignupPage';
// import Dashboard from './components/Dashboard';
// import InterviewPage from './components/InterviewPage';
// import QuizPage from './components/QuizPage';
// import StudySelectionPage from './components/StudySelectionPage'; // NEW
// import DuolingoRoadmap from './components/DuolingoRoadmap'; // NEW
// import ReportsPage from './components/ReportsPage';
// import './styles/global.css';

// function App() {
//   const [currentPage, setCurrentPage] = useState('landing');
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedSubject, setSelectedSubject] = useState(null); // NEW - for roadmap

//   // Check for existing login on page load
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const userData = localStorage.getItem('user');
    
//     if (token && userData) {
//       try {
//         const parsedUser = JSON.parse(userData);
//         setUser(parsedUser);
//         setCurrentPage('dashboard');
//       } catch (error) {
//         console.error('Error parsing user data:', error);
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//       }
//     }
//     setLoading(false);
//   }, []);

//   const handlePageChange = (page, params = {}) => {
//     setCurrentPage(page);
//     // Handle params for future use
//     if (params.topic) {
//       sessionStorage.setItem('selectedTopic', params.topic);
//     }
//     if (params.mode) {
//       sessionStorage.setItem('interviewMode', params.mode);
//     }
//   };

//   const handleLogin = (userData) => {
//     setUser(userData);
//     localStorage.setItem('user', JSON.stringify(userData));
//     setCurrentPage('dashboard');
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     sessionStorage.clear();
//     setUser(null);
//     setSelectedSubject(null); // NEW - clear selected subject
//     setCurrentPage('landing');
//   };

//   // NEW - Handle subject selection for roadmap
//   const handleSelectSubject = (subject) => {
//     setSelectedSubject(subject);
//     setCurrentPage('roadmap');
//   };

//   // NEW - Handle back from roadmap to study selection
//   const handleBackToStudy = () => {
//     setSelectedSubject(null);
//     setCurrentPage('study');
//   };

//   // Protected route wrapper
//   const ProtectedRoute = ({ children }) => {
//     if (!user) {
//       setCurrentPage('login');
//       return <LoginPage onPageChange={handlePageChange} onLogin={handleLogin} />;
//     }
//     return children;
//   };

//   const renderPage = () => {
//     if (loading) {
//       return (
//         <div className="loading-screen">
//           <div className="spinner"></div>
//           <p>Loading PrepMate AI...</p>
//         </div>
//       );
//     }

//     switch (currentPage) {
//       case 'login':
//         return <LoginPage onPageChange={handlePageChange} onLogin={handleLogin} />;
      
//       case 'signup':
//         return <SignupPage onPageChange={handlePageChange} onLogin={handleLogin} />;
      
//       case 'dashboard':
//         return (
//           <ProtectedRoute>
//             <Dashboard 
//               user={user} 
//               onLogout={handleLogout} 
//               onNavigate={handlePageChange}
//             />
//           </ProtectedRoute>
//         );
      
//       case 'interview':
//         return (
//           <ProtectedRoute>
//             <InterviewPage 
//               user={user} 
//               onNavigate={handlePageChange}
//               onLogout={handleLogout}
//             />
//           </ProtectedRoute>
//         );
      
//       case 'quiz':
//         return (
//           <ProtectedRoute>
//             <QuizPage 
//               user={user} 
//               onNavigate={handlePageChange}
//               onLogout={handleLogout}
//             />
//           </ProtectedRoute>
//         );
      
//       // NEW - Study subject selection page
//       case 'study':
//         return (
//           <ProtectedRoute>
//             <StudySelectionPage 
//               user={user}
//               onSelectSubject={handleSelectSubject}
//               onNavigate={handlePageChange}
//               onLogout={handleLogout}
//             />
//           </ProtectedRoute>
//         );
      
//       // NEW - Duolingo-style roadmap for selected subject
//       case 'roadmap':
//         return (
//           <ProtectedRoute>
//             <DuolingoRoadmap 
//               subject={selectedSubject}
//               user={user}
//               onBack={handleBackToStudy}
//               onLogout={handleLogout}
//             />
//           </ProtectedRoute>
//         );
      
//       case 'reports':
//         return (
//           <ProtectedRoute>
//             <ReportsPage 
//               user={user} 
//               onNavigate={handlePageChange}
//               onLogout={handleLogout}
//             />
//           </ProtectedRoute>
//         );
      
//       case 'landing':
//       default:
//         return (
//           <LandingPage 
//             onPageChange={handlePageChange} 
//             user={user} 
//             onLogout={handleLogout} 
//           />
//         );
//     }
//   };

//   return (
//     <div className="App">
//       {renderPage()}
//     </div>
//   );
// }

// export default App;
import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import Dashboard from './components/Dashboard';
import InterviewPage from './components/InterviewPage';
import QuizPage from './components/QuizPage';
import StudySelectionPage from './components/StudySelectionPage';
import DuolingoRoadmap from './components/DuolingoRoadmap';
import ReportsPage from './components/ReportsPage';
import ResumePage from './components/ResumePage'; // NEW - Resume module
import './styles/global.css';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState(null);

  // Check for existing login on page load
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setCurrentPage('dashboard');
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const handlePageChange = (page, params = {}) => {
    setCurrentPage(page);
    // Handle params for future use
    if (params.topic) {
      sessionStorage.setItem('selectedTopic', params.topic);
    }
    if (params.mode) {
      sessionStorage.setItem('interviewMode', params.mode);
    }
  };

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.clear();
    setUser(null);
    setSelectedSubject(null);
    setCurrentPage('landing');
  };

  // Handle subject selection for roadmap
  const handleSelectSubject = (subject) => {
    setSelectedSubject(subject);
    setCurrentPage('roadmap');
  };

  // Handle back from roadmap to study selection
  const handleBackToStudy = () => {
    setSelectedSubject(null);
    setCurrentPage('study');
  };

  // Protected route wrapper
  const ProtectedRoute = ({ children }) => {
    if (!user) {
      setCurrentPage('login');
      return <LoginPage onPageChange={handlePageChange} onLogin={handleLogin} />;
    }
    return children;
  };

  const renderPage = () => {
    if (loading) {
      return (
        <div className="loading-screen">
          <div className="spinner"></div>
          <p>Loading PrepMate AI...</p>
        </div>
      );
    }

    switch (currentPage) {
      case 'login':
        return <LoginPage onPageChange={handlePageChange} onLogin={handleLogin} />;
      
      case 'signup':
        return <SignupPage onPageChange={handlePageChange} onLogin={handleLogin} />;
      
      case 'dashboard':
        return (
          <ProtectedRoute>
            <Dashboard 
              user={user} 
              onLogout={handleLogout} 
              onNavigate={handlePageChange}
            />
          </ProtectedRoute>
        );
      
      case 'interview':
        return (
          <ProtectedRoute>
            <InterviewPage 
              user={user} 
              onNavigate={handlePageChange}
              onLogout={handleLogout}
            />
          </ProtectedRoute>
        );
      
      case 'quiz':
        return (
          <ProtectedRoute>
            <QuizPage 
              user={user} 
              onNavigate={handlePageChange}
              onLogout={handleLogout}
            />
          </ProtectedRoute>
        );
      
      case 'study':
        return (
          <ProtectedRoute>
            <StudySelectionPage 
              user={user}
              onSelectSubject={handleSelectSubject}
              onNavigate={handlePageChange}
              onLogout={handleLogout}
            />
          </ProtectedRoute>
        );
      
      case 'roadmap':
        return (
          <ProtectedRoute>
            <DuolingoRoadmap 
              subject={selectedSubject}
              user={user}
              onBack={handleBackToStudy}
              onLogout={handleLogout}
            />
          </ProtectedRoute>
        );
      
      case 'reports':
        return (
          <ProtectedRoute>
            <ReportsPage 
              user={user} 
              onNavigate={handlePageChange}
              onLogout={handleLogout}
            />
          </ProtectedRoute>
        );
      
      // NEW - Resume ATS Analyzer
      case 'resume':
        return (
          <ProtectedRoute>
            <ResumePage 
              user={user} 
              onNavigate={handlePageChange}
              onLogout={handleLogout}
            />
          </ProtectedRoute>
        );
      
      case 'landing':
      default:
        return (
          <LandingPage 
            onPageChange={handlePageChange} 
            user={user} 
            onLogout={handleLogout} 
          />
        );
    }
  };

  return (
    <div className="App">
      {renderPage()}
    </div>
  );
}

export default App;
