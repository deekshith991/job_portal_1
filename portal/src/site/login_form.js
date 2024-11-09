import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../Context/AuthContext";
import axiosInstance from "../Context/axiosInstance";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Login form submitted. Email:", email);

    try {
      console.log("Sending login request...");
      const response = await axiosInstance.post('/auth/login', { email, password });
      const { token, accountType, accountId } = response.data;

      console.log("Login successful. Response data:", response.data);

      // Login the user
      login({ accountType, accountId }, token);
      console.log("User logged in. Redirecting to the dashboard...");
      navigate(accountType === 'company' ? '/company-dashboard' : '/dashboard');
    } catch (error) {
      console.error("Login failed. Error:", error);
      alert('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
      console.log("Login process completed. Loading state:", loading);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
