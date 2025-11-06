import React from 'react';

const Header = ({ onPageChange, user, onLogout }) => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h2>PrepMate</h2>
          <span className="logo-subtitle">Learn • Practice • Succeed</span>
        </div>
        <nav className="nav">
          <a href="#features" className="nav-link">Features</a>
          <a href="#how-it-works" className="nav-link">How It Works</a>
          <a href="#testimonials" className="nav-link">Reviews</a>
         
        </nav>
        <div className="header-actions">
          {user ? (
            <div className="user-menu">
              <span>Welcome, {user.name}</span>
              <button className="btn btn-outline" onClick={onLogout}>
                Logout
              </button>
            </div>
          ) : (
            <>
              <button 
                className="btn btn-outline"
                onClick={() => onPageChange('login')}
              >
                Sign In
              </button>
              <button 
                className="btn btn-primary"
                onClick={() => onPageChange('signup')}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
