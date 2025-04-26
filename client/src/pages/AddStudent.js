import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createStudent } from '../services/studentService';

const AddStudent = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('manual');
  const [formData, setFormData] = useState({
    studentId: '',
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    department: '',
    enrollmentYear: '',
    status: 'Active'
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.studentId || !formData.firstName || !formData.lastName || !formData.email || 
        !formData.dateOfBirth || !formData.department || !formData.enrollmentYear) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      setLoading(true);
      await createStudent(formData);
      toast.success('Student added successfully');
      navigate('/students');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add student');
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-center mb-4">Add Student</h2>
      
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'manual' ? 'active' : ''}`}
            onClick={() => setActiveTab('manual')}
          >
            Manual Entry
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'file' ? 'active' : ''}`}
            onClick={() => setActiveTab('file')}
          >
            File Upload
          </button>
        </li>
      </ul>
      
      <div className="tab-content">
        {activeTab === 'manual' ? (
          <div className="manual-entry">
            <h3 className="mb-3 text-dark">Manual Student Entry</h3>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="firstName" className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="lastName" className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="studentId" className="form-label">Student ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="studentId"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="dateOfBirth" className="form-label">Date of Birth</label>
                  <input
                    type="date"
                    className="form-control"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="enrollmentYear" className="form-label">Enrollment Year</label>
                  <input
                    type="number"
                    className="form-control"
                    id="enrollmentYear"
                    name="enrollmentYear"
                    value={formData.enrollmentYear}
                    onChange={handleChange}
                    min="2000"
                    max="2099"
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="department" className="form-label">Department</label>
                <select
                  className="form-select"
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Department</option>
                  <option value="Computer Science and Engineering">Computer Science and Engineering</option>
                  <option value="Electrical Engineering">Electrical Engineering</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                  <option value="Civil Engineering">Civil Engineering</option>
                  <option value="Business Administration">Business Administration</option>
                </select>
              </div>

              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="isActive"
                  name="status"
                  checked={formData.status === 'Active'}
                  onChange={(e) => setFormData({...formData, status: e.target.checked ? 'Active' : 'Inactive'})}
                />
                <label className="form-check-label" htmlFor="isActive">Is Active</label>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Adding Student...
                  </>
                ) : 'Add Student'}
              </button>
            </form>
          </div>
        ) : (
          <div className="file-upload p-4">
            <h3 className="mb-3 text-dark">Upload Student Data</h3>
            <div className="mb-3">
              <label htmlFor="excelFile" className="form-label">Upload Excel File</label>
              <input
                type="file"
                className="form-control"
                id="excelFile"
                accept=".xlsx, .xls, .csv"
              />
              <div className="form-text">Upload an Excel or CSV file with student data.</div>
            </div>
            <button className="btn btn-primary">Upload and Process</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddStudent;
