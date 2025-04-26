import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="row justify-content-center">
      <div className="col-md-10">
        <div className="welcome-card">
          <h1 className="display-4 mb-3">Welcome to the Student Management System.</h1>
          <p className="lead">Manage your student data efficiently and effectively.</p>
          <p>Navigate through the portal to view, add, or edit student information.</p>
          <Link to="/students" className="btn btn-light mt-3">View Students</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
