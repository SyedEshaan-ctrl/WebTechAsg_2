import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// For debugging
console.log('Application starting...');
console.log('Environment:', process.env.NODE_ENV);
console.log('API URL:', process.env.REACT_APP_API_URL || 'Not set');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
