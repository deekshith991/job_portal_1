
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from "../context/axiosInstance.js"; // Import the Axios instance
import { useAuth } from "../context/AuthContext.js"; // Import the useAuth hook for context

function RegisterForm() {
  const { login } = useAuth(); // Get the login function from context
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage(''); // Clear error message on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that password and confirm password match
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      // Send registration data to the API
      const response = await axiosInstance.post('/auth/user/register', {
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 201) {
        alert("Registration successful!");

        const { token, userId } = response.data; // Assume response contains token and userId
        login({ userId }, token); // Call the login function with user data and token

        // Redirect to dashboard or any other route on successful registration
        navigate('/dashboard');
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Registration failed'); // Set error message from response or default
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700">Register</h2>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>} {/* Display error message */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600" htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Register
          </button>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account? <Link to="/login" className="text-indigo-500 hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;

