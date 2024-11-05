
// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); // Get the authentication status

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }

  return children; // Render the child components if authenticated
};

export default ProtectedRoute;

