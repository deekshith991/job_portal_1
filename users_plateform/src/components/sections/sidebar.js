
import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <div className={`fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
      <div className={`fixed left-0 top-0 w-64 bg-white h-full shadow-lg transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <button onClick={toggleSidebar} className="p-4 text-gray-700 hover:text-blue-500">Close</button>
        <nav className="flex flex-col p-4 space-y-2">
          <Link to="/login" onClick={toggleSidebar}>
            <span className="block w-full py-2 text-center text-white bg-blue-500 hover:bg-blue-600 rounded-md transition duration-200 ease-in-out">Login</span>
          </Link>
          <Link to="/register" onClick={toggleSidebar}>
            <span className="block w-full py-2 text-center text-white bg-blue-500 hover:bg-blue-600 rounded-md transition duration-200 ease-in-out">Register</span>
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;

