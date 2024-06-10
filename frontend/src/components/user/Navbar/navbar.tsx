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
      <div className="px-5 ">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-white font-bold text-xl ml-10">
                   HEALTH MATE
            </Link>
          </div>
          {/* Hamburger Icon */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white  hover:text-gray-300 focus:outline-none focus:text-gray-300"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
          {/* Navigation Links */}
          <div className="hidden md:flex items-center mr-20">
            <Link
              to="/"
              className=" px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-blue-700 md:ml-2"
            >
              Home
            </Link>
            <Link
              to="/user/aboutus"
              className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-blue-700 md:ml-2"
            >
              About Us
            </Link>
            <Link
              to="/user/doctor"
              className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-blue-700 md:ml-2"
            >
              Doctors
            </Link>
            {/* Profile and Login/Logout */}
            {user.isAuthenticated && user.role === "user" ? (
              <>
                <Link
                  to="/user/appoinmentlist"
                  className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-blue-700 md:ml-2"
                >
                  Appointments
                </Link>
                <Link
                  to="/user/profile"
                  className=" px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-blue-700 md:ml-2"
                >
                  Profile
                </Link>
                <Link
                  to="/user/chat"
                  className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-blue-700 md:ml-2"
                >
                  Chat
                </Link>
                <button
                  onClick={handleLogout}
                  className=" text-blue-900 px-3 py-2 text-sm font-medium bg-gray-100 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 rounded-md mt-2 md:mt-0 md:ml-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/user/login"
                className="px-3 py-2 text-sm font-medium bg-gray-100 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 rounded-md mt-2 md:mt-0 md:ml-2 text-blue-900"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700"
            >
              Home
            </Link>
            <Link
              to="/user/aboutus"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700"
            >
              About Us
            </Link>
            <Link
              to="/user/doctor"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700"
            >
              Doctors
            </Link>
            {user.isAuthenticated && user.role === "user" ? (
              <>
                <Link
                  to="/user/appoinmentlist"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700"
                >
                  Appointments
                </Link>
                <Link
                  to="/user/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700"
                >
                  Profile
                </Link>
                <Link
                  to="/user/chat"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700"
                >
                  Chat
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-blue-900 px-3 py-2 text-base font-medium bg-gray-100 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 rounded-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/user/login"
                className="block px-3 py-2 text-base font-medium bg-gray-100 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 rounded-md text-blue-900"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
