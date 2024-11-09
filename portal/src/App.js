import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './site/Header';
import { useAuth } from './Context/AuthContext';
import ProtectedRoute from './Context/ProtectedRoute';
import LoginForm from './site/login_form';
import RegisterForm from './site/Register_form';
import UserDashboard from './User/DashBoard';
import CompanyDashboard from './Company/DashBoard';

function App() {
  const { isAuthenticated, accountType } = useAuth();

  console.log("Rendering App with isAuthenticated:", isAuthenticated, "accountType:", accountType);

  return (
    <Router>
      <div className="bg-gray-200 min-h-screen w-screen">
        <Header />
        <Routes>
          {/* Redirect based on authentication state */}
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to={accountType === 'company' ? "/company-dashboard" : "/dashboard"} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
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
          <Route
            path="/company-dashboard"
            element={
              <ProtectedRoute>
                <CompanyDashboard />
              </ProtectedRoute>
            }
          />

          {/* Fallback for unmatched routes */}
          <Route
            path="/*"
            element={
              <Navigate
                to={isAuthenticated ? (accountType === 'company' ? "/company-dashboard" : "/dashboard") : "/login"}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
