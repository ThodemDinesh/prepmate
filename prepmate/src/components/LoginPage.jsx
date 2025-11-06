// import React, { useState } from 'react';
// import '../styles/Auth.css';

// const LoginPage = ({ onPageChange, onLogin }) => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [errors, setErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: ''
//       }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.email) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Please enter a valid email';
//     }

//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (formData.password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//     }

//     return newErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const newErrors = validateForm();
    
//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     setIsLoading(true);
    
//     // Simulate API call
//     setTimeout(() => {
//       // Mock successful login
//       onLogin({
//         name: formData.email.split('@')[0],
//         email: formData.email
//       });
//       setIsLoading(false);
//     }, 1000);
//   };

//   return (
//     <div className="auth-page">
//       <div className="auth-container">
//         <div className="auth-header">
//           <button 
//             className="back-button"
//             onClick={() => onPageChange('landing')}
//           >
//             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//             </svg>
//             Back to Home
//           </button>
//           <div className="logo">
//             <h2>PrepMate</h2>
//             <span className="logo-subtitle">Learn • Practice • Succeed</span>
//           </div>
//         </div>

//         <div className="auth-content">
//           <div className="auth-form-container">
//             <div className="auth-form-header">
//               <div className="welcome-animation">
//                 <div className="welcome-icon">👋</div>
//                 <h1>Welcome Back!</h1>
//                 <p>Ready to continue your journey to landing your dream job? Let's get you signed in.</p>
//               </div>
//             </div>

//             <form className="auth-form" onSubmit={handleSubmit}>
//               <div className="form-group">
//                 <label htmlFor="email">
//                   <svg className="form-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                     <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                   </svg>
//                   Email Address
//                 </label>
//                 <div className="input-wrapper">
//                   <input
//                     id="email"
//                     name="email"
//                     type="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className={errors.email ? 'error' : ''}
//                     placeholder="student@university.edu"
//                   />
//                   {formData.email && !errors.email && (
//                     <div className="input-success">
//                       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                       </svg>
//                     </div>
//                   )}
//                 </div>
//                 {errors.email && <span className="error-message">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <circle cx="12" cy="12" r="10" stroke="#EF4444" strokeWidth="2"/>
//                     <line x1="15" y1="9" x2="9" y2="15" stroke="#EF4444" strokeWidth="2"/>
//                     <line x1="9" y1="9" x2="15" y2="15" stroke="#EF4444" strokeWidth="2"/>
//                   </svg>
//                   {errors.email}
//                 </span>}
//               </div>

//               <div className="form-group">
//                 <label htmlFor="password">
//                   <svg className="form-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
//                     <circle cx="12" cy="16" r="1" stroke="currentColor" strokeWidth="2"/>
//                     <path d="M7 11V7A5 5 0 0 1 17 7V11" stroke="currentColor" strokeWidth="2"/>
//                   </svg>
//                   Password
//                 </label>
//                 <div className="input-wrapper">
//                   <input
//                     id="password"
//                     name="password"
//                     type={showPassword ? "text" : "password"}
//                     value={formData.password}
//                     onChange={handleChange}
//                     className={errors.password ? 'error' : ''}
//                     placeholder="Enter your secure password"
//                   />
//                   <button
//                     type="button"
//                     className="password-toggle"
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     {showPassword ? (
//                       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20C7 20 2.73 16.39 1 12A18.45 18.45 0 0 1 5.06 5.06L17.94 17.94ZM9.9 4.24A9.12 9.12 0 0 1 12 4C17 4 21.27 7.61 23 12A18.5 18.5 0 0 1 19.74 16.74L9.9 4.24ZM1 1L23 23" stroke="currentColor" strokeWidth="2"/>
//                       </svg>
//                     ) : (
//                       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z" stroke="currentColor" strokeWidth="2"/>
//                         <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
//                       </svg>
//                     )}
//                   </button>
//                 </div>
//                 {errors.password && <span className="error-message">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <circle cx="12" cy="12" r="10" stroke="#EF4444" strokeWidth="2"/>
//                     <line x1="15" y1="9" x2="9" y2="15" stroke="#EF4444" strokeWidth="2"/>
//                     <line x1="9" y1="9" x2="15" y2="15" stroke="#EF4444" strokeWidth="2"/>
//                   </svg>
//                   {errors.password}
//                 </span>}
//               </div>

//               <div className="form-options">
//                 <label className="checkbox-container">
//                   <input type="checkbox" />
//                   <span className="checkmark">
//                     <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                       <polyline points="20,6 9,17 4,12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                     </svg>
//                   </span>
//                   Keep me logged in
//                 </label>
//                 <button type="button" className="forgot-password" onClick={() => alert('Password reset functionality coming soon!')}>
//                   Forgot Password?
//                 </button>
//               </div>

//               <button 
//                 type="submit" 
//                 className="btn btn-primary btn-full"
//                 disabled={isLoading}
//               >
//                 {isLoading ? (
//                   <>
//                     <div className="loading-spinner"></div>
//                     Signing you in...
//                   </>
//                 ) : (
//                   <>
//                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                       <path d="M15 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H15M10 17L15 12L10 7M15 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                     </svg>
//                     Sign In to Continue
//                   </>
//                 )}
//               </button>
//             </form>

//             <div className="auth-divider">
//               <div className="divider-line"></div>
//               <span>or continue with</span>
//               <div className="divider-line"></div>
//             </div>

//             <div className="social-buttons">
//               <button className="btn btn-social google">
//                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                   <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.79 15.71 17.57V20.34H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4"/>
//                   <path d="M12 23C15.24 23 17.95 21.92 19.28 20.34L15.71 17.57C14.74 18.22 13.48 18.62 12 18.62C8.91 18.62 6.26 16.65 5.4 13.89H1.67V16.75C3.01 19.42 7.26 23 12 23Z" fill="#34A853"/>
//                   <path d="M5.4 13.89C5.18 13.24 5.06 12.54 5.06 11.82C5.06 11.1 5.18 10.4 5.4 9.75V6.89H1.67C0.96 8.31 0.56 9.91 0.56 11.62C0.56 13.33 0.96 14.93 1.67 16.35L5.4 13.89Z" fill="#FBBC05"/>
//                   <path d="M12 5.38C13.62 5.38 15.06 5.94 16.21 7.02L19.36 3.87C17.95 2.61 15.24 1.62 12 1.62C7.26 1.62 3.01 5.2 1.67 7.87L5.4 10.73C6.26 7.97 8.91 6 12 6V5.38Z" fill="#EA4335"/>
//                 </svg>
//                 Continue with Google
//               </button>
//               <button className="btn btn-social github">
//                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                   <path d="M12 2C6.477 2 2 6.484 2 12.017C2 16.624 5.185 20.496 9.452 21.76C9.952 21.85 10.152 21.543 10.152 21.287C10.152 21.058 10.142 20.243 10.138 19.217C7.091 19.846 6.509 17.644 6.509 17.644C6.052 16.534 5.397 16.229 5.397 16.229C4.485 15.582 5.463 15.595 5.463 15.595C6.466 15.666 6.991 16.645 6.991 16.645C7.887 18.207 9.355 17.765 10.172 17.518C10.263 16.873 10.534 16.433 10.831 16.193C8.411 15.95 5.865 15.041 5.865 11.374C5.865 10.329 6.26 9.477 7.011 8.817C6.908 8.574 6.544 7.507 7.109 6.111C7.109 6.111 7.954 5.851 10.127 7.302C10.94 7.09 11.805 6.983 12.665 6.979C13.525 6.983 14.39 7.09 15.204 7.302C17.376 5.851 18.22 6.111 18.22 6.111C18.786 7.507 18.422 8.574 18.319 8.817C19.071 9.477 19.464 10.329 19.464 11.374C19.464 15.051 16.915 15.946 14.487 16.184C14.866 16.505 15.191 17.133 15.191 18.093C15.191 19.507 15.178 20.648 15.178 21.287C15.178 21.546 15.375 21.856 15.883 21.758C20.146 20.49 23.327 16.621 23.327 12.017C23.327 6.484 18.853 2 12.333 2H12Z" fill="currentColor"/>
//                 </svg>
//                 Continue with GitHub
//               </button>
//             </div>

//             <div className="auth-footer">
//               <div className="student-friendly-message">
//                 <p className="new-here">New to PrepMate?</p>
//                 <button 
//                   className="link-button signup-link"
//                   onClick={() => onPageChange('signup')}
//                 >
//                   Create your free account
//                 </button>
//                 <p className="benefits">Join thousands of students already preparing for their dream jobs! 🚀</p>
//               </div>
//             </div>
//           </div>

//           <div className="auth-image">
//             <div className="motivation-card">
//               <div className="motivation-icon">🎯</div>
//               <h3>Your Success Journey Starts Here</h3>
//               <div className="motivation-stats">
//                 <div className="motivation-stat">
//                   <div className="stat-number">15K+</div>
//                   <div className="stat-label">Students Placed</div>
//                 </div>
//                 <div className="motivation-stat">
//                   <div className="stat-number">500+</div>
//                   <div className="stat-label">Top Companies</div>
//                 </div>
//                 <div className="motivation-stat">
//                   <div className="stat-number">94%</div>
//                   <div className="stat-label">Success Rate</div>
//                 </div>
//               </div>
//               <div className="motivation-message">
//                 <p>💡 Quick tip: Practice 30 minutes daily to increase your interview success rate by 3x!</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;








import React, { useState } from 'react';
import '../styles/Auth.css';

const LoginPage = ({ onPageChange, onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Store token in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Call parent login handler
        onLogin(data.user);
      } else {
        setErrors({ 
          general: data.message || 'Login failed. Please try again.' 
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ 
        general: 'Network error. Please check your connection and try again.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <button 
            className="back-button"
            onClick={() => onPageChange('landing')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Home
          </button>
          <div className="logo">
            <h2>PrepMate</h2>
            <span className="logo-subtitle">Learn • Practice • Succeed</span>
          </div>
        </div>

        <div className="auth-content">
          <div className="auth-form-container">
            <div className="auth-form-header">
            < div className="welcome-icon hand">👋</div>
                <h1>Welcome Back!</h1>
                <p>Ready to continue your journey to landing your dream job? Let's get you signed in.</p>
              </div>
            <form className="auth-form" onSubmit={handleSubmit}>
              {errors.general && (
                <div className="error-banner" style={{ 
                  padding: '12px 16px', 
                  backgroundColor: '#fef2f2', 
                  border: '1px solid #fecaca', 
                  borderRadius: '8px', 
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#dc2626'
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="#EF4444" strokeWidth="2"/>
                    <line x1="15" y1="9" x2="9" y2="15" stroke="#EF4444" strokeWidth="2"/>
                    <line x1="9" y1="9" x2="15" y2="15" stroke="#EF4444" strokeWidth="2"/>
                  </svg>
                  {errors.general}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="email">
                  <svg className="form-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Email Address
                </label>
                <div className="input-wrapper">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'error' : ''}
                    placeholder="student@university.edu"
                  />
                  {formData.email && !errors.email && (
                    <div className="input-success">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                </div>
                {errors.email && <span className="error-message">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="#EF4444" strokeWidth="2"/>
                    <line x1="15" y1="9" x2="9" y2="15" stroke="#EF4444" strokeWidth="2"/>
                    <line x1="9" y1="9" x2="15" y2="15" stroke="#EF4444" strokeWidth="2"/>
                  </svg>
                  {errors.email}
                </span>}
              </div>

              <div className="form-group">
                <label htmlFor="password">
                  <svg className="form-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="16" r="1" stroke="currentColor" strokeWidth="2"/>
                    <path d="M7 11V7A5 5 0 0 1 17 7V11" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  Password
                </label>
                <div className="input-wrapper">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    className={errors.password ? 'error' : ''}
                    placeholder="Enter your secure password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20C7 20 2.73 16.39 1 12A18.45 18.45 0 0 1 5.06 5.06L17.94 17.94ZM9.9 4.24A9.12 9.12 0 0 1 12 4C17 4 21.27 7.61 23 12A18.5 18.5 0 0 1 19.74 16.74L9.9 4.24ZM1 1L23 23" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && <span className="error-message">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="#EF4444" strokeWidth="2"/>
                    <line x1="15" y1="9" x2="9" y2="15" stroke="#EF4444" strokeWidth="2"/>
                    <line x1="9" y1="9" x2="15" y2="15" stroke="#EF4444" strokeWidth="2"/>
                  </svg>
                  {errors.password}
                </span>}
              </div>

              <div className="form-options">
                <label className="checkbox-container">
                  <input type="checkbox" />
                  <span className="checkmark">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <polyline points="20,6 9,17 4,12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  Keep me logged in
                </label>
                <button type="button" className="forgot-password" onClick={() => alert('Password reset functionality coming soon!')}>
                  Forgot Password?
                </button>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary btn-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="loading-spinner"></div>
                    Signing you in...
                  </>
                ) : (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H15M10 17L15 12L10 7M15 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Sign In to Continue
                  </>
                )}
              </button>
            </form>

            <div className="auth-divider">
              <div className="divider-line"></div>
              <span>or continue with</span>
              <div className="divider-line"></div>
            </div>

            <div className="social-buttons">
              <button className="btn btn-social google">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.79 15.71 17.57V20.34H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4"/>
                  <path d="M12 23C15.24 23 17.95 21.92 19.28 20.34L15.71 17.57C14.74 18.22 13.48 18.62 12 18.62C8.91 18.62 6.26 16.65 5.4 13.89H1.67V16.75C3.01 19.42 7.26 23 12 23Z" fill="#34A853"/>
                  <path d="M5.4 13.89C5.18 13.24 5.06 12.54 5.06 11.82C5.06 11.1 5.18 10.4 5.4 9.75V6.89H1.67C0.96 8.31 0.56 9.91 0.56 11.62C0.56 13.33 0.96 14.93 1.67 16.35L5.4 13.89Z" fill="#FBBC05"/>
                  <path d="M12 5.38C13.62 5.38 15.06 5.94 16.21 7.02L19.36 3.87C17.95 2.61 15.24 1.62 12 1.62C7.26 1.62 3.01 5.2 1.67 7.87L5.4 10.73C6.26 7.97 8.91 6 12 6V5.38Z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>
              <button className="btn btn-social github">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017C2 16.624 5.185 20.496 9.452 21.76C9.952 21.85 10.152 21.543 10.152 21.287C10.152 21.058 10.142 20.243 10.138 19.217C7.091 19.846 6.509 17.644 6.509 17.644C6.052 16.534 5.397 16.229 5.397 16.229C4.485 15.582 5.463 15.595 5.463 15.595C6.466 15.666 6.991 16.645 6.991 16.645C7.887 18.207 9.355 17.765 10.172 17.518C10.263 16.873 10.534 16.433 10.831 16.193C8.411 15.95 5.865 15.041 5.865 11.374C5.865 10.329 6.26 9.477 7.011 8.817C6.908 8.574 6.544 7.507 7.109 6.111C7.109 6.111 7.954 5.851 10.127 7.302C10.94 7.09 11.805 6.983 12.665 6.979C13.525 6.983 14.39 7.09 15.204 7.302C17.376 5.851 18.22 6.111 18.22 6.111C18.786 7.507 18.422 8.574 18.319 8.817C19.071 9.477 19.464 10.329 19.464 11.374C19.464 15.051 16.915 15.946 14.487 16.184C14.866 16.505 15.191 17.133 15.191 18.093C15.191 19.507 15.178 20.648 15.178 21.287C15.178 21.546 15.375 21.856 15.883 21.758C20.146 20.49 23.327 16.621 23.327 12.017C23.327 6.484 18.853 2 12.333 2H12Z" fill="currentColor"/>
                </svg>
                Continue with GitHub
              </button>
            </div>

            <div className="auth-footer">
              <div className="student-friendly-message">
                <p className="new-here">New to PrepMate?</p>
                <button 
                  className="link-button signup-link"
                  onClick={() => onPageChange('signup')}
                >
                  Create your free account
                </button>
                <p className="benefits">Join thousands of students already preparing for their dream jobs! 🚀</p>
              </div>
            </div>
          </div>

          <div className="auth-image">
            <div className="motivation-card">
              <div className="motivation-icon">🎯</div>
              <h3>Your Success Journey Starts Here</h3>
              <div className="motivation-stats">
                <div className="motivation-stat">
                  <div className="stat-number">15K+</div>
                  <div className="stat-label">Students Placed</div>
                </div>
                <div className="motivation-stat">
                  <div className="stat-number">500+</div>
                  <div className="stat-label">Top Companies</div>
                </div>
                <div className="motivation-stat">
                  <div className="stat-number">94%</div>
                  <div className="stat-label">Success Rate</div>
                </div>
              </div>
              <div className="motivation-message">
                <p>💡 Quick tip: Practice 30 minutes daily to increase your interview success rate by 3x!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
