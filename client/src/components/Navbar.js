import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar = ({ onLogout }) => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');
  
  useEffect(() => {
    // Get user email from localStorage
    const email = localStorage.getItem('userEmail');
    if (email) {
      setUserEmail(email);
    }
  }, []);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Student Management System</Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/students">Student List</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/students/add">Add Student</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/students/edit">Edit Student</NavLink>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Profile
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <div className="dropdown-item">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <strong>My Account</strong>
                        {userEmail && <div className="small text-muted">{userEmail}</div>}
                      </div>
                      <button 
                        className="btn btn-sm btn-outline-danger ms-2" 
                        onClick={() => {
                          onLogout();
                          toast.success('Logged out successfully');
                          navigate('/login');
                        }}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </li>
                <li><a className="dropdown-item" href="#">Settings</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button 
                    className="dropdown-item text-danger" 
                    onClick={() => {
                      onLogout();
                      toast.success('Logged out successfully');
                      navigate('/login');
                    }}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
