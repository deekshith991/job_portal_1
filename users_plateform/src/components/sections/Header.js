

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UserSidebar from "../DashBoard/UserSidebar";

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <header className="bg-blue-800 text-white p-4 md:p-5 flex items-center justify-between">
      {/* Left Side - Menu Button and Title */}
      <div className="flex items-center">
        {/* Menu Button - Now visible in all views */}
        <button
          onClick={toggleSidebar}
          className="p-2 text-white bg-blue-700 rounded-md"
          aria-label="Open Menu"
        >
          ☰
        </button>

        {/* Title with Link */}
        <Link to="/" className="ml-4 text-2xl font-semibold">
          Job Portal
        </Link>
      </div>

      {/* Right Side - Navbar for Standard View */}
      <nav className="hidden md:flex space-x-4">
        <Link to="/dashboard" className="hover:bg-blue-700 px-3 py-2 rounded-md">Dashboard</Link>
        <Link to="/profile" className="hover:bg-blue-700 px-3 py-2 rounded-md">Profile</Link>
        <Link to="/settings" className="hover:bg-blue-700 px-3 py-2 rounded-md">Settings</Link>
        {/* Additional links can be added here for larger screens */}
      </nav>

      {/* Sidebar for Mobile View */}
      <UserSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
    </header>
  );
};

export default Header;

