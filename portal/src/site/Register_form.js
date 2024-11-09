import React, { useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Context/axiosInstance';

const RegisterForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState('user');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // State to handle error messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Reset error before submission

    console.log("Submitting registration form with values:", { email, password, accountType });

    try {
      const response = await axiosInstance.post('/auth/register', {
        email,
        password,
        accountType,
      });
      console.log("Registration successful, response:", response.data);

      // Extract values from response.data based on the provided structure
      const { token, accountType: registeredAccountType, accountId } = response.data;

      // Log the user in automatically after registration
      login({ accountType: registeredAccountType, accountId }, token);
      navigate(registeredAccountType === 'company' ? '/company-profileUpdate' : '/profileUpdate');
    } catch (error) {
      console.error("Registration failed:", error);
      setError('Registration failed. Please try again.'); // Set error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Register</h2>
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
        <div className="mb-4">
          <label className="block mb-2">Account Type</label>
          <select
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="user">User</option>
            <option value="company">Company</option>
          </select>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>} {/* Display error if present */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
