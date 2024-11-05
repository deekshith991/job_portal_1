// src/components/Dashboard/UserNavbar.js
import React from 'react';

const UserNavbar = ({ toggleSidebar }) => {
  return (
    <nav className="hidden md:flex items-center justify-between bg-blue-800 text-white p-5">
      <h2 className="text-2xl font-semibold">User Dashboard</h2>
      <div className="flex space-x-4">
        <a href="#" className="hover:bg-blue-700 p-2 rounded">Job Recommendations</a>
        <a href="#" className="hover:bg-blue-700 p-2 rounded">My Applications</a>
        <a href="#" className="hover:bg-blue-700 p-2 rounded">Profile</a>
        <a href="#" className="hover:bg-blue-700 p-2 rounded">Settings</a>
      </div>
    </nav>
  );
};

export default UserNavbar;

