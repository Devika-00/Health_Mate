import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../../redux/slices/UserSlice';
import { RootState } from '../../../redux/reducer/reducer';

const Navbar: React.FC = () => {
  const doctor = useSelector((state: RootState) => state.UserSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setUser({ isAuthenticated: false, name: null, role: null, id: null }));
    navigate('/doctor/login');
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
              <Link to="/doctors" className="text-white px-3 py-2 rounded-md text-sm font-medium">Patients</Link>
            </div>
            {/* Profile and Login */}
            <div className=" flex items-center">
            {doctor.isAuthenticated && doctor.role === 'doctor' ? (
                <>
                  <Link to="/doctor/profile" className="text-white px-3 py-2 rounded-md text-sm font-medium">Profile</Link>
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
