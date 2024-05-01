// Import necessary modules
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/reducer/reducer';
import logout from '../../../utils/logout';
import { clearDoctor } from '../../../redux/slices/DoctorSlice';
import { useAppDispatch } from '../../../redux/store/Store';
import showToast from '../../../utils/toaster';
import { error } from 'console';

// Navbar component
const Navbar: React.FC = () => {
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
              <Link to="/doctor" className="text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
              <Link to="/doctor/slot" className="text-white px-3 py-2 rounded-md text-sm font-medium">Slot</Link>
              <Link to="/doctor/patientList" className="text-white px-3 py-2 rounded-md text-sm font-medium">Patients</Link>
            </div>
            {/* Profile and Login */}
            <div className=" flex items-center">
            {doctor.isAuthenticated && doctor.role === 'doctor' ? (
                <>
                  <Link to="/doctor/profile" className="text-white px-3 py-2 rounded-md text-sm font-medium">Profile</Link>
                  <Link to={`/doctor/status/${doctor.id}`} className="text-white px-3 py-2 rounded-md text-sm font-medium">Verification</Link>
                  <button onClick={handleLogout} className="text-blue-900 px-3 py-2  text-sm font-medium bg-gray-100 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 rounded-md ml-2">Logout</button>
                </>
              ) : (
                <Link to="/doctor/login" className="text-blue-900 px-3 py-2  text-sm font-medium bg-gray-100 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 rounded-md ml-2">Login</Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;


