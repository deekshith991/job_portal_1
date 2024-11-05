
// src/components/Dashboard/UserDashboard.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../context/axiosInstance';

const UserDashboard = () => {
  const { userId } = useAuth();
  const [userData, setUserData] = useState(null);
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(`/user/${userId}`);
        setUserData(response.data);
      } catch (err) {
        setError('Failed to fetch user data');
      }
    };

    const fetchApplications = async () => {
      try {
        const response = await axiosInstance.get(`/applications`);
        setApplications(response.data);
      } catch (err) {
        setError('Failed to fetch applications');
      }
    };

    fetchUserData();
    fetchApplications();
  }, [userId]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">

      <main className="flex-1 p-4 md:p-6">
        <h1 className="text-5xl font-semibold ">DASHBOARD</h1>

        <header className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Welcome, {userData ? userData.name : 'User'}</h1>
        </header>

        {error && <p className="text-red-500">{error}</p>}

        <section className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-lg font-bold mb-4">My Applications</h2>
          {applications.length > 0 ? (
            <ul>
              {applications.map(app => (
                <li key={app.id} className="mb-2">
                  <p><strong>Position:</strong> {app.position}</p>
                  <p><strong>Status:</strong> {app.status}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No applications found.</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default UserDashboard;

