import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getStudentById, updateStudent } from '../services/studentService';

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
  const [fetchLoading, setFetchLoading] = useState(true);

  // State to track error details for debugging
  const [errorDetails, setErrorDetails] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setFetchLoading(true);
        console.log('Fetching student with ID:', id);
        
        const student = await getStudentById(id);
        console.log('Student data received:', student);
        
        if (!student) {
          throw new Error('No student data returned');
        }
        
        // Format date to YYYY-MM-DD for input type="date"
        const formattedDate = student.dateOfBirth 
          ? new Date(student.dateOfBirth).toISOString().split('T')[0]
          : '';
        
        setFormData({
          ...student,
          dateOfBirth: formattedDate
        });
        setFetchLoading(false);
      } catch (error) {
        console.error('Error fetching student:', error);
        setErrorDetails({
          message: error.message,
          id: id,
          response: error.response?.data
        });
        toast.error(`Failed to fetch student data: ${error.message}`);
        setFetchLoading(false);
        // Don't navigate away immediately so user can see error
        setTimeout(() => navigate('/students'), 3000);
      }
    };

    if (id) {
      fetchStudent();
    } else {
      toast.error('No student ID provided');
      navigate('/students');
    }
  }, [id, navigate]);

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
      await updateStudent(id, formData);
      toast.success('Student updated successfully');
      navigate('/students');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update student');
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading student data...</p>
      </div>
    );
  }
  
  if (errorDetails) {
    return (
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">Error Loading Student Data</h4>
        <p>There was a problem loading the student information.</p>
        <hr />
        <p className="mb-0">Redirecting to student list...</p>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="text-center m-0">Edit Student</h2>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="studentId" className="form-label">Student ID</label>
            <input
              type="text"
              className="form-control"
              id="studentId"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              readOnly
            />
          </div>

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
            <label className="form-check-label" htmlFor="isActive">Active</label>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Updating Student...
              </>
            ) : 'Update Student'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditStudent;
