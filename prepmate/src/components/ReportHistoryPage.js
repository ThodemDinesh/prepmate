import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import '../styles/ReportHistoryPage.css';

const ReportHistoryPage = ({ user, onNavigate }) => {
  const [reports, setReports] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ topic: 'all', page: 1 });
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    fetchReports();
    fetchStats();
  }, [filter]);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/reports/history?page=${filter.page}&topic=${filter.topic}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      const data = await response.json();
      
      if (data.success) {
        setReports(data.reports);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/reports/stats/overview', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      
      if (data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const viewReport = async (reportId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/reports/${reportId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      
      if (data.success) {
        onNavigate('reports', { 
          transcript: data.report.transcript,
          topic: data.report.topic,
          generatedReport: data.report.report,
          reportId: data.report._id
        });
      }
    } catch (error) {
      console.error('Error fetching report:', error);
    }
  };

  const deleteReport = async (reportId, event) => {
    event.stopPropagation(); // Prevent triggering viewReport
    
    if (!window.confirm('Are you sure you want to delete this report?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/reports/${reportId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Refresh the reports list
        fetchReports();
        fetchStats();
      } else {
        alert('Failed to delete report');
      }
    } catch (error) {
      console.error('Error deleting report:', error);
      alert('Error deleting report');
    }
  };

  const getScoreColor = (score) => {
    if (score >= 8) return '#4CAF50';
    if (score >= 6) return '#FF9800';
    return '#F44336';
  };

  const formatTopicName = (topic) => {
    return topic.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  if (loading && reports.length === 0) {
    return (
      <div className="history-container">
        <div className="loading">Loading your interview history...</div>
      </div>
    );
  }

  return (
    <div className="history-container">
      <div className="history-header">
        <div>
          <h1>Interview History</h1>
          <p>Track your progress and review past performances</p>
        </div>
        <div className="header-actions">
          <button onClick={() => onNavigate('dashboard')} className="secondary-btn">
            ← Dashboard
          </button>
          <button onClick={() => onNavigate('interview')} className="primary-btn">
            Start New Interview
          </button>
        </div>
      </div>

      {stats && (
        <div className="stats-overview">
          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-content">
              <h3>Total Interviews</h3>
              <div className="stat-value">{stats.totalInterviews}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <h3>Average Score</h3>
              <div className="stat-value">{stats.averageScore?.toFixed(1) || 0}/10</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">❓</div>
            <div className="stat-content">
              <h3>Questions Answered</h3>
              <div className="stat-value">{stats.totalQuestions}</div>
            </div>
          </div>
        </div>
      )}

      <div className="history-controls">
        <div className="history-filters">
          <select 
            value={filter.topic} 
            onChange={(e) => setFilter({...filter, topic: e.target.value, page: 1})}
          >
            <option value="all">All Topics</option>
            <option value="algorithms">Algorithms</option>
            <option value="system-design">System Design</option>
            <option value="javascript">JavaScript</option>
            <option value="react">React</option>
            <option value="database">Database</option>
            <option value="resume">Resume Based</option>
            <option value="behavioral">Behavioral</option>
            <option value="networking">Networking</option>
          </select>
        </div>
        
        {pagination && (
          <div className="pagination-info">
            Showing {reports.length} of {pagination.total} reports
          </div>
        )}
      </div>

      <div className="reports-list">
        {reports.map((report) => (
          <div key={report._id} className="report-item" onClick={() => viewReport(report._id)}>
            <div className="report-info">
              <div className="report-main-info">
                <h3>{formatTopicName(report.topic)}</h3>
                <div className="report-meta">
                  <span className="question-count">{report.totalQuestions} questions</span>
                  <span className="difficulty-badge difficulty-{report.difficulty}">
                    {report.difficulty}
                  </span>
                  {report.metadata?.duration && (
                    <span className="duration">{report.metadata.duration}min</span>
                  )}
                </div>
              </div>
              <div className="report-date">
                {new Date(report.completedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
            <div className="report-actions">
              <div className="report-score">
                <div 
                  className="score-circle small" 
                  style={{ 
                    backgroundColor: getScoreColor(report.report.overallScore),
                    color: 'white'
                  }}
                >
                  {report.report.overallScore.toFixed(1)}
                </div>
              </div>
              <button 
                className="delete-btn"
                onClick={(e) => deleteReport(report._id, e)}
                title="Delete Report"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {pagination && pagination.pages > 1 && (
        <div className="pagination">
          <button 
            onClick={() => setFilter({...filter, page: filter.page - 1})}
            disabled={filter.page === 1}
            className="pagination-btn"
          >
            ← Previous
          </button>
          <span className="pagination-info">
            Page {filter.page} of {pagination.pages}
          </span>
          <button 
            onClick={() => setFilter({...filter, page: filter.page + 1})}
            disabled={filter.page === pagination.pages}
            className="pagination-btn"
          >
            Next →
          </button>
        </div>
      )}

      {reports.length === 0 && !loading && (
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <h3>No interviews found</h3>
          <p>
            {filter.topic === 'all' 
              ? "Start your first interview to see your history here"
              : `No interviews found for ${formatTopicName(filter.topic)}`
            }
          </p>
          <button onClick={() => onNavigate('interview')} className="primary-btn">
            Start Interview
          </button>
        </div>
      )}
    </div>
  );
};

export default ReportHistoryPage;
