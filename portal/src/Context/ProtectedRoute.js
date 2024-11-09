import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Assuming the AuthContext is correctly implemented

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); // Extract authentication status from the context

  if (!isAuthenticated) {
    // If the user is not authenticated, redirect them to the login page
    return <Navigate to="/login" />;
  }

  // If the user is authenticated, render the protected route
  return children;
};

export default ProtectedRoute;
