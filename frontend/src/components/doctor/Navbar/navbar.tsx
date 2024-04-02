import React from 'react';
import { Link } from 'react-router-dom'; 

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-950 shadow-lg w-full">
      <div className="px-4">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-white font-bold text-xl ml-20">HEALTH MATE</Link>
          </div>
          {/* Navigation Links */}
          <div className="flex items-center mr-20">
            <div className="hidden md:block">
              <Link to="/" className="text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
              <Link to="/about" className="text-white px-3 py-2 rounded-md text-sm font-medium">Appoinment</Link>
              <Link to="/doctors" className="text-white px-3 py-2 rounded-md text-sm font-medium">Patients</Link>
            </div>
            {/* Profile and Login */}
            <div className=" flex items-center">
              <Link to="/profile" className="text-white px-3 py-2 rounded-md text-sm font-medium">Profile</Link>
              <Link to="/doctor/login" className="text-blue-900 px-3 py-2  text-sm font-medium bg-gray-100 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 rounded-md ml-2">Login</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
