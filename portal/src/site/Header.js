import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from "./Sidebar";

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    console.log("Sidebar toggled:", !sidebarOpen);
  };

  return (
    <header className="bg-blue-800 text-white p-4 md:p-5 flex items-center justify-between">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="p-2 text-white bg-blue-700 rounded-md"
          aria-label="Open Menu"
        >
          ☰
        </button>

        <Link to="/" className="ml-4 text-2xl font-semibold">
          Job Portal
        </Link>
      </div>

      <nav className="hidden md:flex space-x-4">
        <Link to="/dashboard" className="hover:bg-blue-700 px-3 py-2 rounded-md">Dashboard</Link>
        <Link to="/profile" className="hover:bg-blue-700 px-3 py-2 rounded-md">Profile</Link>
        <Link to="/settings" className="hover:bg-blue-700 px-3 py-2 rounded-md">Settings</Link>
      </nav>

      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
    </header>
  );
};

export default Header;
