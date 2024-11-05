

import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [userId, setUserId] = useState(() => localStorage.getItem('userId') || null);

  const isAuthenticated = !!token; // Determine if user is authenticated

  const login = async (userData, token) => {
    setToken(token);
    setUserId(userData.userId);
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userData.userId);

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');

    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ token, userId, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

