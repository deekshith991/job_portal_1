import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../context/axiosInstance.js"; // Import the Axios instance
import { useAuth } from "../context/AuthContext.js";

function LoginForm() {
  const { login } = useAuth(); // Get the login function from context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset any previous errors

    try {
      const response = await axiosInstance.post('/auth/user/login', { email, password }); // Use the Axios instance for API call

      if (response.status === 200) {
        alert("log In");
        const { token, userId } = response.data; // Assume response contains token and userId
        login({ userId }, token); // Call the login function with user data and token
        navigate("/dashboard");
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed'); // Set error message from response or default
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700">Login to Ur Future</h2>
        {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600" htmlFor="email">Email</label>
            <input
              placeholder="email"
              type="email"
              id="email"
              className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600" htmlFor="password">Password</label>
            <input
              placeholder="********"
              type="password"
              id="password"
              className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Log In
          </button>
        </form>
        <div className="text-center">
          {/* <Link to="/lost_password" disabled className="text-sm text-indigo-500 hover:underline">Forgot password?</Link> */}
        </div>
      </div>
    </div>
  );
}

export default LoginForm;

