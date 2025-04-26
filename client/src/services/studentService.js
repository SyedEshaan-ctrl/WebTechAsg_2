import axios from 'axios';

// Direct API URL for reliability
const BASE_URL = 'https://webtechasg-2.onrender.com/api';
const API_URL = `${BASE_URL}/students`;

console.log('API URL being used:', API_URL);

// Create an axios instance with default configs
const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: false // Set to true if you need to send cookies with requests
});

// Get all students
export const getAllStudents = async () => {
  console.log('Fetching all students from:', API_URL);
  try {
    const response = await axios.get(API_URL);
    console.log('Students fetched successfully:', response.data);
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
  console.log(`Fetching student with id ${id} from: ${API_URL}/${id}`);
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    console.log('Student fetched successfully:', response.data);
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
  console.log('Creating student with data:', studentData);
  console.log('POST request to:', API_URL);
  try {
    const response = await axios.post(API_URL, studentData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('Student created successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating student:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    } else if (error.request) {
      console.error('No response received, request:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    throw error;
  }
};

// Update a student
export const updateStudent = async (id, studentData) => {
  console.log(`Updating student with id ${id} with data:`, studentData);
  console.log('PUT request to:', `${API_URL}/${id}`);
  try {
    const response = await axios.put(`${API_URL}/${id}`, studentData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('Student updated successfully:', response.data);
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
  console.log(`Deleting student with id ${id}`);
  console.log('DELETE request to:', `${API_URL}/${id}`);
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    console.log('Student deleted successfully:', response.data);
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
