// Import necessary modules
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/reducer/reducer';
import { clearDoctor } from '../../../redux/slices/DoctorSlice';
import { useAppDispatch } from '../../../redux/store/Store';
import showToast from '../../../utils/toaster';


// Navbar component
const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Retrieve doctor information from Redux store
  const doctor = useSelector((state: RootState) => state.DoctorSlice);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Handle logout function
  const handleLogout = () => {
    dispatch(clearDoctor());
    navigate('/doctor/login');
    showToast("logout Succesfully","success");
  };


  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-blue-950 shadow-lg w-full">
      <div className="px-4">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-white font-bold text-xl ml-2 md:ml-20">
              HEALTH MATE
            </Link>
          </div>
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-white hover:text-gray-300 focus:outline-none focus:text-gray-300"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
          {/* Navigation Links */}
          <div className="hidden md:flex items-center mr-20">
            <Link to="/doctor" className="text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
            <Link to="/doctor/slot" className="text-white px-3 py-2 rounded-md text-sm font-medium">Slot</Link>
            {doctor.isAuthenticated && doctor.role === 'doctor' && (
              <>
                <Link to="/doctor/patientList" className="text-white px-3 py-2 rounded-md text-sm font-medium">Appointment</Link>
                <Link to="/doctor/profile" className="text-white px-3 py-2 rounded-md text-sm font-medium">Profile</Link>
                <Link to={`/doctor/status/${doctor.id}`} className="text-white px-3 py-2 rounded-md text-sm font-medium">Verification</Link>
                <Link to="/doctor/chat" className="text-white px-3 py-2 rounded-md text-sm font-medium">Chat</Link>
                <button onClick={handleLogout} className="text-blue-900 px-3 py-2 text-sm font-medium bg-gray-100 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 rounded-md ml-2">Logout</button>
              </>
            )}
            {!doctor.isAuthenticated && (
              <Link to="/doctor/login" className="text-blue-900 px-3 py-2 text-sm font-medium bg-gray-100 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 rounded-md ml-2">Login</Link>
            )}
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/doctor" className="text-white block px-3 py-2 rounded-md text-base font-medium">Home</Link>
            <Link to="/doctor/slot" className="text-white block px-3 py-2 rounded-md text-base font-medium">Slot</Link>
            {doctor.isAuthenticated && doctor.role === 'doctor' && (
              <>
                <Link to="/doctor/patientList" className="text-white block px-3 py-2 rounded-md text-base font-medium">Appointment</Link>
                <Link to="/doctor/profile" className="text-white block px-3 py-2 rounded-md text-base font-medium">Profile</Link>
                <Link to={`/doctor/status/${doctor.id}`} className="text-white block px-3 py-2 rounded-md text-base font-medium">Verification</Link>
                <Link to="/doctor/chat" className="text-white block px-3 py-2 rounded-md text-base font-medium">Chat</Link>
                <button onClick={handleLogout} className="text-blue-900 block px-3 py-2 text-base font-medium bg-gray-100 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 rounded-md">Logout</button>
              </>
            )}
            {!doctor.isAuthenticated && (
              <Link to="/doctor/login" className="text-blue-900 block px-3 py-2 text-base font-medium bg-gray-100 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 rounded-md">Login</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;


