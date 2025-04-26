import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import StudentList from './pages/StudentList';
import AddStudent from './pages/AddStudent';
import EditStudent from './pages/EditStudent';
import Login from './pages/Login';
import { toast } from 'react-toastify';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Debug info
    console.log('App component mounted');
    
    // Check if user is logged in
    try {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      console.log('Login status from localStorage:', loggedIn);
      setIsLoggedIn(loggedIn);

      // Auto-login for testing if needed
      if (!loggedIn) {
        console.log('No login detected, using demo login');
        // Uncomment the next line to auto-login for testing
        // setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogout = () => {
    console.log('Logging out user');
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    toast.info('You have been logged out');
  };

  // For debugging
  console.log('Rendering App component, isLoggedIn:', isLoggedIn);

  if (loading) {
    return (
      <div className="loading-container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      {isLoggedIn && <Navbar onLogout={handleLogout} />}
      <div className={isLoggedIn ? "container mt-4" : ""}>
        <Routes>
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
          <Route path="/students" element={isLoggedIn ? <StudentList /> : <Navigate to="/login" />} />
          <Route path="/students/add" element={isLoggedIn ? <AddStudent /> : <Navigate to="/login" />} />
          <Route path="/students/edit/:id" element={isLoggedIn ? <EditStudent /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
