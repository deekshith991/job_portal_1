import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../Context/AuthContext";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { isAuthenticated, accountType } = useAuth();

  console.log("Sidebar rendered. Open:", isOpen, "Authenticated:", isAuthenticated, "Account Type:", accountType);

  return (
    <div
      className={`fixed top-0 left-0 w-64 h-full bg-gray-900 text-white shadow-lg transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } z-50`}
      aria-hidden={!isOpen}
      aria-label="Sidebar Navigation"
    >
      <button onClick={toggleSidebar} className="p-4 text-3xl text-white hover:bg-red-500" aria-label="Close Sidebar">
        X
      </button>
      <nav className="flex flex-col p-4 space-y-2">
        {!isAuthenticated ? (
          <>
            <Link to="/login" onClick={toggleSidebar} aria-label="Login">
              <span className="block w-full py-3 text-center bg-blue-500 hover:bg-blue-600 rounded-md transition duration-200 ease-in-out">
                Login
              </span>
            </Link>
            <Link to="/register" onClick={toggleSidebar} aria-label="Register">
              <span className="block w-full py-3 text-center bg-blue-500 hover:bg-blue-600 rounded-md transition duration-200 ease-in-out">
                Register
              </span>
            </Link>
          </>
        ) : accountType === 'user' ? (
          <>
            <Link to="/dashboard" onClick={toggleSidebar} aria-label="User Dashboard">
              <span className="block w-full py-2 text-center bg-blue-500 hover:bg-blue-600 rounded-md transition duration-200 ease-in-out">
                Dashboard
              </span>
            </Link>
            <Link to="/profile" onClick={toggleSidebar} aria-label="User Profile">
              <span className="block w-full py-2 text-center bg-blue-500 hover:bg-blue-600 rounded-md transition duration-200 ease-in-out">
                Profile
              </span>
            </Link>
            <Link to="/settings" onClick={toggleSidebar} aria-label="User Settings">
              <span className="block w-full py-2 text-center bg-blue-500 hover:bg-blue-600 rounded-md transition duration-200 ease-in-out">
                Settings
              </span>
            </Link>
          </>
        ) : accountType === 'company' ? (
          <>
            <Link to="/company-dashboard" onClick={toggleSidebar} aria-label="Company Dashboard">
              <span className="block w-full py-2 text-center bg-blue-500 hover:bg-blue-600 rounded-md transition duration-200 ease-in-out">
                Dashboard
              </span>
            </Link>
            <Link to="/company-profile" onClick={toggleSidebar} aria-label="Company Profile">
              <span className="block w-full py-2 text-center bg-blue-500 hover:bg-blue-600 rounded-md transition duration-200 ease-in-out">
                Company Profile
              </span>
            </Link>
            <Link to="/manage-jobs" onClick={toggleSidebar} aria-label="Manage Jobs">
              <span className="block w-full py-2 text-center bg-blue-500 hover:bg-blue-600 rounded-md transition duration-200 ease-in-out">
                Manage Jobs
              </span>
            </Link>
            <Link to="/applications" onClick={toggleSidebar} aria-label="Applications">
              <span className="block w-full py-2 text-center bg-blue-500 hover:bg-blue-600 rounded-md transition duration-200 ease-in-out">
                Applications
              </span>
            </Link>
          </>
        ) : null}
      </nav>
    </div>
  );
};

export default Sidebar;
