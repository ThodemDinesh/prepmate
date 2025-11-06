import React, { useState, useEffect } from 'react';
import '../styles/ReportsPage.css'; // Reuse some styles
import '../styles/AnalyticsPage.css'; // Add some specific styles

const AnalyticsPage = ({ user, onNavigate }) => {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication required. Please log in.');
        setIsLoading(false);
        onNavigate('login');
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/analytics/history', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();

        if (data.success) {
          setHistory(data.history);
        } else {
          setError(data.error || 'Failed to fetch history.');
        }
      } catch (err) {
        setError('Could not connect to the server.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, [onNavigate]);

  const handleViewReport = (reportData) => {
    // Navigate to the reports page, passing the specific report data
    onNavigate('reports', { interviewData: reportData });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  if (isLoading) {
    return <div className="report-container loading-container"><h2>Loading History...</h2></div>;
  }

  if (error) {
    return <div className="report-container error-container"><p>{error}</p></div>;
  }

  return (
    <div className="report-container">
      <div className="report-header">
        <h1>Interview Analytics & History</h1>
        <p>Review your past performance and track your progress.</p>
         <button onClick={() => onNavigate('dashboard')} className="secondary-btn">
            Back to Dashboard
         </button>
      </div>

      <div className="history-list">
        {history.length === 0 ? (
          <div className="no-history-card">
            <h3>No Interviews Found</h3>
            <p>You haven't completed any interviews yet. Practice one to see your report here!</p>
            <button onClick={() => onNavigate('interview')} className="primary-btn">Start an Interview</button>
          </div>
        ) : (
          history.map((item) => (
            <div key={item._id} className="history-item-card">
              <div className="history-item-topic">
                <span>{item.topic}</span>
              </div>
              <div className="history-item-details">
                <p className="history-item-date">{formatDate(item.createdAt)}</p>
                <div className="history-item-score">
                  Score: <strong>{item.report?.overallScore.toFixed(1) || 'N/A'}/10</strong>
                </div>
              </div>
              <button onClick={() => handleViewReport(item)} className="primary-btn">
                View Report
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AnalyticsPage;