

// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/sections/login_form';
import RegisterForm from './components/sections/register_form';
import Sidebar from './components/sections/sidebar'; // Import the Sidebar component
import { useAuth } from './components/context/AuthContext.js'; // Import the authentication context

function App() {
  const { isAuthenticated } = useAuth(); // Get the authentication status
  const [isOpen, setIsOpen] = useState(false); // State to manage sidebar visibility

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Router>
      <div className="bg-gray-200 min-h-screen w-screen">
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 p-2 bg-blue-500 text-white rounded-md z-50"
        >
          Menu
        </button>

        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} /> {/* Render Sidebar */}

        <Routes>
          <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          {/* Add protected routes based on authentication here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

