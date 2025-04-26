import axios from 'axios';

// Create an axios instance with default configs
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://webtechasg-2.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: false // Set to true if you need to send cookies with requests
});

const API_URL = '/students';

// Get all students
export const getAllStudents = async () => {
  try {
    const response = await api.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching students:', error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    }
    throw error;
  }
};

// Get a single student by ID
export const getStudentById = async (id) => {
  try {
    const response = await api.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching student with id ${id}:`, error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
    throw error;
  }
};

// Create a new student
export const createStudent = async (studentData) => {
  try {
    const response = await api.post(API_URL, studentData);
    return response.data;
  } catch (error) {
    console.error('Error creating student:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
    throw error;
  }
};

// Update a student
export const updateStudent = async (id, studentData) => {
  try {
    const response = await api.put(`${API_URL}/${id}`, studentData);
    return response.data;
  } catch (error) {
    console.error(`Error updating student with id ${id}:`, error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
    throw error;
  }
};

// Delete a student
export const deleteStudent = async (id) => {
  try {
    const response = await api.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting student with id ${id}:`, error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
    throw error;
  }
};
