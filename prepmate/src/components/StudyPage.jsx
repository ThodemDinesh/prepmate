import React from 'react';

const StudyPage = ({ user, onNavigate, onLogout }) => {
  return (
    <div style={{ padding: '2rem', minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
      <h1>📚 Study Materials</h1>
      <p>RAG-powered content from standard textbooks coming soon!</p>
      <button 
        onClick={() => onNavigate('dashboard')}
        style={{ padding: '0.75rem 1.5rem', marginTop: '1rem', background: 'white', color: '#333', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default StudyPage;
