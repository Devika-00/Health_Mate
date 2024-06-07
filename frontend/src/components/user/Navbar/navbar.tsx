import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/reducer/reducer";
import showToast from "../../../utils/toaster";
import { clearUser } from "../../../redux/slices/UserSlice";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar: React.FC = () => {
  const user = useSelector((state: RootState) => state.UserSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(clearUser());
    showToast("Logged out successfully", "success");
    navigate("/user/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-blue-900 shadow-lg w-full">
      <div className="px-4 mx-auto max-w-7xl pt-3"> {/* Add pt-4 for top padding */}
        <div className="flex justify-between h-14">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-white font-bold text-xl">
              HEALTH MATE
            </Link>
          </div>
          {/* Hamburger Icon */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
          {/* Navigation Links */}
          <div className={`flex flex-col md:flex-row md:items-center z-10 ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${isMenuOpen ? 'text-gray-800'  : 'text-white'}`}
            >
              Home
            </Link>
            <Link
              to="/user/aboutus"
              className={`px-3 py-2 rounded-md text-sm font-medium ${isMenuOpen ? 'text-gray-800' : 'text-white'}`}
            >
              About Us
            </Link>
            <Link
              to="/user/doctor"
              className={`px-3 py-2 rounded-md text-sm font-medium ${isMenuOpen ? 'text-gray-800' : 'text-white'}`}
            >
              Doctors
            </Link>
            {/* Profile and Login/Logout */}
            {user.isAuthenticated && user.role === "user" ? (
              <>
                <Link
                  to="/user/appoinmentlist"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${isMenuOpen ? 'text-gray-800' : 'text-white'}`}
                >
                  Appointments
                </Link>
                <Link
                  to="/user/profile"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${isMenuOpen ? 'text-gray-800' : 'text-white'}`}
                >
                  Profile
                </Link>
                <Link
                  to="/user/chat"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${isMenuOpen ? 'text-gray-800' : 'text-white'}`}
                >
                  Chat
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-blue-900 px-3 py-2 text-sm font-medium bg-gray-100 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 rounded-md ml-2 mt-2 md:mt-0"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/user/login"
                className={`px-3 py-2 text-sm font-medium bg-gray-100 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 rounded-md ml-2 mt-2 md:mt-0 ${isMenuOpen ? 'text-blue-600' : 'text-white'}`}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
