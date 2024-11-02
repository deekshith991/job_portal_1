

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import LoginForm from "./components/sections/login_form";
import RegisterForm from "./components/sections/register_form";
import Sidebar from "./components/sections/sidebar.js"; // Import the Sidebar component

function App() {
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
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

