import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import '../styles/LandingPage.css';

const LandingPage = ({ onPageChange, user, onLogout }) => {
  // Animated hero title highlights
  const titleHighlights = [
    "Tech Interview",
    "Dream Job", 
    "FAANG Interview",
    "Coding Challenge",
  ];

  // Animated hero subtitle phrases
  const heroSubtitles = [
    "Master coding interviews with PrepMate's comprehensive platform. Practice, learn, and succeed with personalized preparation tools.",
    "Transform your interview anxiety into confidence with our AI-powered practice sessions and real-time feedback.",
    "Join thousands of developers who landed their dream jobs using PrepMate's proven preparation methodology.",
    "Get personalized coding challenges, mock interviews, and expert guidance tailored to your target companies.",
    "Practice system design, algorithms, and behavioral questions with industry professionals as your mentors."
  ];

  // Code snippets in different languages (function only)
  const codeSnippets = [
    `function prepareForInterview() {
  const success = practice();
  return success ? 'hired' : 'keep trying';
}`,
    `def prepare_for_interview():
    success = practice()
    return 'hired' if success else 'keep trying'`,
    `public String prepareForInterview() {
    boolean success = practice();
    return success ? 'hired' : 'keep trying';
}`,
    `func prepareForInterview() string {
    success := practice()
    if success {
        return 'hired'
    }
    return 'keep trying'
}`,
    `fn prepare_for_interview() -> &str {
    let success = practice();
    if success { 'hired' } else { 'keep trying' }
}`
  ];

  const [currentSnippetIndex, setCurrentSnippetIndex] = useState(0);
  const [isCodeVisible, setIsCodeVisible] = useState(true);
  
  // State for animated subtitle
  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(0);
  const [isSubtitleVisible, setIsSubtitleVisible] = useState(true);

  // Simplified state for title animation
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState(titleHighlights[0]);

  // Code animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIsCodeVisible(false);
      setTimeout(() => {
        setCurrentSnippetIndex((prevIndex) => 
          (prevIndex + 1) % codeSnippets.length
        );
        setIsCodeVisible(true);
      }, 600);
    }, 4000);

    return () => clearInterval(interval);
  }, [codeSnippets.length]);

  // Subtitle animation effect
  useEffect(() => {
    const subtitleInterval = setInterval(() => {
      setIsSubtitleVisible(false);
      setTimeout(() => {
        setCurrentSubtitleIndex((prevIndex) => 
          (prevIndex + 1) % heroSubtitles.length
        );
        setIsSubtitleVisible(true);
      }, 500);
    }, 5000);

    return () => clearInterval(subtitleInterval);
  }, [heroSubtitles.length]);

  // Simplified title animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % titleHighlights.length;
        setDisplayText(titleHighlights[nextIndex]);
        return nextIndex;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [titleHighlights.length]);

  // Enhanced features with modern icons
  const features = [
    {
      icon: (
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" stroke="url(#gradient1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="url(#gradient1)" fillOpacity="0.1"/>
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366F1"/>
              <stop offset="100%" stopColor="#FF6B35"/>
            </linearGradient>
          </defs>
        </svg>
      ),
      title: 'Targeted Practice',
      description: 'Practice questions tailored to your target companies and roles with AI-powered recommendations'
    },
    {
      icon: (
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 3V21H21" stroke="url(#gradient2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 9L12 6L16 10L21 5" stroke="url(#gradient2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="9" cy="9" r="2" fill="url(#gradient2)" fillOpacity="0.3"/>
          <circle cx="12" cy="6" r="2" fill="url(#gradient2)" fillOpacity="0.3"/>
          <circle cx="16" cy="10" r="2" fill="url(#gradient2)" fillOpacity="0.3"/>
          <circle cx="21" cy="5" r="2" fill="url(#gradient2)" fillOpacity="0.3"/>
          <defs>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981"/>
              <stop offset="100%" stopColor="#6366F1"/>
            </linearGradient>
          </defs>
        </svg>
      ),
      title: 'Progress Tracking',
      description: 'Monitor your improvement with detailed analytics, performance insights, and skill assessments'
    },
    {
      icon: (
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 21L12 17L16 21" stroke="url(#gradient3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 17V3" stroke="url(#gradient3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 7H21L19 10H5L3 7Z" stroke="url(#gradient3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="url(#gradient3)" fillOpacity="0.1"/>
          <circle cx="12" cy="6" r="3" stroke="url(#gradient3)" strokeWidth="2" fill="url(#gradient3)" fillOpacity="0.2"/>
          <defs>
            <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B"/>
              <stop offset="100%" stopColor="#EF4444"/>
            </linearGradient>
          </defs>
        </svg>
      ),
      title: 'Mock Interviews',
      description: 'Simulate real interview scenarios with AI-powered feedback and industry-standard questions'
    },
    {
      icon: (
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="3" stroke="url(#gradient4)" strokeWidth="2" fill="url(#gradient4)" fillOpacity="0.2"/>
          <path d="M12 1V3" stroke="url(#gradient4)" strokeWidth="2" strokeLinecap="round"/>
          <path d="M12 21V23" stroke="url(#gradient4)" strokeWidth="2" strokeLinecap="round"/>
          <path d="M4.22 4.22L5.64 5.64" stroke="url(#gradient4)" strokeWidth="2" strokeLinecap="round"/>
          <path d="M18.36 18.36L19.78 19.78" stroke="url(#gradient4)" strokeWidth="2" strokeLinecap="round"/>
          <path d="M1 12H3" stroke="url(#gradient4)" strokeWidth="2" strokeLinecap="round"/>
          <path d="M21 12H23" stroke="url(#gradient4)" strokeWidth="2" strokeLinecap="round"/>
          <path d="M4.22 19.78L5.64 18.36" stroke="url(#gradient4)" strokeWidth="2" strokeLinecap="round"/>
          <path d="M18.36 5.64L19.78 4.22" stroke="url(#gradient4)" strokeWidth="2" strokeLinecap="round"/>
          <defs>
            <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6"/>
              <stop offset="100%" stopColor="#06B6D4"/>
            </linearGradient>
          </defs>
        </svg>
      ),
      title: 'Expert Tips',
      description: 'Learn from industry professionals and successful candidates with proven strategies'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Software Engineer at Google',
      content: 'PrepMate helped me land my dream job! The mock interviews were incredibly realistic.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Product Manager at Meta',
      content: 'The progress tracking feature kept me motivated throughout my preparation journey.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Data Scientist at Netflix',
      content: 'Excellent platform with comprehensive resources. Highly recommended!',
      rating: 5
    }
  ];

  return (
    <div className="landing-page">
      <Header onPageChange={onPageChange} user={user} onLogout={onLogout} />
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="hero-title-main">Ace Your Next</span>
              <span className="highlight-simple" key={currentTitleIndex}>
                {displayText}
              </span>
            </h1>
            <p className={`hero-subtitle ${isSubtitleVisible ? 'fade-in' : 'fade-out'}`}>
              {heroSubtitles[currentSubtitleIndex]}
            </p>
            <div className="hero-buttons">
              <button 
                className="btn btn-primary"
                onClick={() => onPageChange('signup')}
              >
                Start Preparing Free
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => onPageChange('login')}
              >
                Sign In
              </button>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">50K+</span>
                <span className="stat-label">Students Helped</span>
              </div>
              <div className="stat">
                <span className="stat-number">95%</span>
                <span className="stat-label">Success Rate</span>
              </div>
              <div className="stat">
                <span className="stat-number">500+</span>
                <span className="stat-label">Companies</span>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <div className="code-editor-container">
              <div className="code-editor">
                <div className="code-header">
                  <div className="window-controls">
                    <span className="control red"></span>
                    <span className="control yellow"></span>
                    <span className="control green"></span>
                  </div>
                </div>
                <div className="code-snippet-container">
                  <pre 
                    className={`code-snippet ${isCodeVisible ? 'fade-in' : 'fade-out'}`}
                  >
                    {codeSnippets[currentSnippetIndex]}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="features">
        <div className="container">
          <h2 className="section-title">Why Choose PrepMate?</h2>
          <p className="section-subtitle">
            Everything you need to succeed in technical interviews
          </p>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced How It Works Section */}
      <section className="how-it-works-section" id="how-it-works">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">Your journey to success in 4 simple steps</p>
          <div className="steps-container">
            <div className="step">
              <div className="step-number">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="7" r="4" stroke="white" strokeWidth="2"/>
                </svg>
              </div>
              <h3 className="step-title">Sign Up & Assess</h3>
              <p className="step-description">Create your account and take our comprehensive skill assessment to identify your strengths and areas for improvement</p>
            </div>
            <div className="step">
              <div className="step-number">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 11H15M9 15H15M17 21L20 18L17 15M4 5C4 3.89543 4.89543 3 6 3H18C19.1046 3 20 3.89543 20 5V12.5M6 21H13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="step-title">Personalized Plan</h3>
              <p className="step-description">Get a customized study plan based on your goals, target companies, and current skill level with AI-powered recommendations</p>
            </div>
            <div className="step">
              <div className="step-number">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 6.042A8.967 8.967 0 006 3.75C5.455 3.75 4.93 3.822 4.435 3.957A.75.75 0 003.75 4.5V12C3.75 16.556 7.444 20.25 12 20.25S20.25 16.556 20.25 12V4.5A.75.75 0 0019.565 3.957A8.967 8.967 0 0018 3.75C16.93 3.75 15.939 4.097 15.12 4.689" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 12L11 14L15 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="step-title">Practice & Learn</h3>
              <p className="step-description">Practice with real interview questions, coding challenges, and mock interviews with instant feedback and detailed explanations</p>
            </div>
            <div className="step">
              <div className="step-number">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 12H16M8 8H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="step-title">Land Your Job</h3>
              <p className="step-description">Apply your enhanced skills and confidence to ace your interviews and secure offers at top companies</p>
            </div>
          </div>
          <div className="progress-flow">
            <div className="flow-line"></div>
          </div>
        </div>
      </section>

      <section className="testimonials-section" id="testimonials">
        <div className="container">
          <h2 className="section-title">Success Stories</h2>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-rating">
                  {'★'.repeat(testimonial.rating)}
                </div>
                <p className="testimonial-content">"{testimonial.content}"</p>
                <div className="testimonial-author">
                  <div className="author-info">
                    <h4 className="author-name">{testimonial.name}</h4>
                    <p className="author-role">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Start Your Journey?</h2>
            <p className="cta-subtitle">
              Join thousands of developers who have successfully landed their dream jobs
            </p>
            <button 
              className="btn btn-primary btn-large"
              onClick={() => onPageChange('signup')}
            >
              Get Started Today
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
