import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>PrepMate</h3>
            <p>Empowering developers to ace their technical interviews</p>
          </div>
          <div className="footer-section">
            <h4>Platform</h4>
            <ul>
              <li><a href="#">Practice Questions</a></li>
              <li><a href="#">Mock Interviews</a></li>
              <li><a href="#">Study Plans</a></li>
              <li><a href="#">Progress Tracking</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Resources</h4>
            <ul>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Interview Tips</a></li>
              <li><a href="#">Coding Guides</a></li>
              <li><a href="#">Success Stories</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Support</h4>
            <ul>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Community</a></li>
              <li><a href="#">Feedback</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 PrepMate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
