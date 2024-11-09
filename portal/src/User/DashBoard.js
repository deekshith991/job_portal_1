import React, { useState, useEffect } from 'react';
import { useAuth } from "../Context/AuthContext";
import axiosInstance from "../Context/axiosInstance";

const UserDashboard = () => {
  const { accountId } = useAuth();
  const [userData, setUserData] = useState(null);
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data for accountId:", accountId);
      try {
        // Fetch user data
        const userRes = await axiosInstance.get(`/users/${accountId}`);
        console.log("User data fetched successfully:", userRes.data);
        setUserData(userRes.data);

        // Fetch user's job applications
        const applicationsRes = await axiosInstance.get(`/applications/user/${accountId}`);
        console.log("Applications data fetched successfully:", applicationsRes.data);
        setApplications(applicationsRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError('Failed to fetch data.');
      }
    };

    fetchData();
  }, [accountId]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold">
        Welcome, {userData?.name || 'User'}
      </h1>
      {error && <p className="text-red-500">{error}</p>}

      <h2 className="mt-4">Your Applications</h2>
      <ul>
        {applications.length > 0 ? (
          applications.map((app, index) => (
            <li key={index}>{app.jobTitle} - {app.status}</li>
          ))
        ) : (
          <li>No applications found.</li>
        )}
      </ul>
    </div>
  );
};

export default UserDashboard;
