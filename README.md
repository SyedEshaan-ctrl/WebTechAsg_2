# Student Management System

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) application for managing student records with CRUD operations.

## Features

- Add new student records
- View a list of students
- Edit existing student information
- Delete student records
- Upload student data via Excel file
- Search functionality
- User authentication

## Color Scheme

- White and forest light green theme

## Tech Stack

### Backend
- Node.js with Express.js
- MongoDB with Mongoose
- RESTful API architecture

### Frontend
- React.js
- React Router for navigation
- Bootstrap for styling
- Axios for API calls
- React Toastify for notifications

## Student Fields

- ID
- First Name
- Last Name
- Email
- Date of Birth
- Department
- Enrollment Year
- Status (Active/Inactive)

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)

### Backend Setup
1. Navigate to the server directory:
   ```
   cd server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/student-management-system
   ```

4. Start the server:
   ```
   npm start
   ```

### Frontend Setup
1. Navigate to the client directory:
   ```
   cd client
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the React application:
   ```
   npm start
   ```

4. Open your browser and go to `http://localhost:3000`

## API Endpoints

- `GET /api/students` - Fetch all students
- `GET /api/students/:id` - Fetch a student by ID
- `POST /api/students` - Add a new student
- `PUT /api/students/:id` - Update student information
- `DELETE /api/students/:id` - Delete a student

## Screenshots

The application includes:
- Login page
- Home dashboard
- Student listing page
- Add student form (manual entry and file upload)
- Edit student form
