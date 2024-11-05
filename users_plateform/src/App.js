

// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/sections/login_form';
import RegisterForm from './components/sections/register_form';
import Header from './components/sections/Header.js';
import { useAuth } from './components/context/AuthContext.js';
import UserDashboard from './components/DashBoard/UserDashboard.js';
import ProtectedRoute from './components/context/ProtectedRoute.js'; // Import the ProtectedRoute

function App() {
  const { isAuthenticated } = useAuth(); // Get the authentication status

  return (
    <Router>
      <div className="bg-gray-200 min-h-screen w-screen">
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          {/* You can add more protected routes here */}
          <Route path="/*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;

