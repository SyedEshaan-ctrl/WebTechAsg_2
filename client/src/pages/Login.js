import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.email || !formData.password) {
      toast.error('Please fill all required fields');
      return;
    }

    // Validate email domain
    if (!formData.email.endsWith('@cbit.org.in')) {
      toast.error('Only @cbit.org.in email addresses are allowed');
      return;
    }

    // For demo purposes, we'll just simulate a login
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Store user info in localStorage
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', formData.email);
      setIsLoggedIn(true);
      toast.success('Login successful');
      navigate('/');
    }, 1500);
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-container">
        <div className="login-header">
          <div className="login-logo">
            <i className="fas fa-graduation-cap"></i>
          </div>
          <h2 className="login-title">Student Management System</h2>
          <p className="login-subtitle">Welcome back! Please sign in to continue</p>
        </div>
        
        <div className="login-form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="emailInput"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <label htmlFor="emailInput">Email Address</label>
            </div>
            
            <div className="form-floating mb-4">
              <input
                type="password"
                className="form-control"
                id="passwordInput"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <label htmlFor="passwordInput">Password</label>
            </div>
            
            <button 
              type="submit" 
              className="btn login-btn mb-3"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Signing in...
                </>
              ) : 'Sign In'}
            </button>
          </form>
          
          <div className="login-footer">
            <div className="login-note">
              <i className="fas fa-info-circle me-2"></i>
              <span>Only @cbit.org.in accounts are allowed</span>
            </div>
            <p className="login-security-note">Your session will only be used for authentication purposes.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
