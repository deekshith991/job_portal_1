import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from './axiosInstance';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accountType, setAccountType] = useState(null);
  const [accountId, setAccountId] = useState(null);

  useEffect(() => {
    // Check for token in local storage on mount
    const token = localStorage.getItem('authToken');
    if (token) {
      // Assuming a function or API to validate token exists
      axiosInstance.get('/auth/validate-token')
        .then(response => {
          const { accountType, accountId } = response.data;
          setIsAuthenticated(true);
          setAccountType(accountType);
          setAccountId(accountId);
          console.log("User authenticated on app load:", accountType);
        })
        .catch(error => {
          console.error("Token validation failed:", error);
          localStorage.removeItem('authToken');
        });
    }
  }, []);

  const login = (user, token) => {
    console.log("Logging in user:", user, "with token:", token);
    setIsAuthenticated(true);
    setAccountType(user.accountType);
    setAccountId(user.accountId);
    localStorage.setItem('authToken', token);
    console.log("Authentication state updated:", isAuthenticated, accountType, accountId);
  };

  const logout = () => {
    console.log("Logging out user");
    setIsAuthenticated(false);
    setAccountType(null);
    setAccountId(null);
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, accountType, accountId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
