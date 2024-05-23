import React from 'react';
import { FaSearch, FaCog, FaUser } from 'react-icons/fa';
import showToast from '../../../utils/toaster';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../redux/reducer/reducer';
import { clearAdmin } from '../../../redux/slices/AdminSlice';

const AdminHeader: React.FC = () => {

  const admin = useSelector((state: RootState) => state.AdminSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearAdmin());
    showToast("Logged out successfully","success");
    navigate('/admin/login');
  };

  return (
    <header className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="flex items-center space-x-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-700 text-white px-3 py-1 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
          <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <button onClick={handleLogout} className="border-2 p-2 border-white focus:outline-none hover:bg-blue-950 rounded">
         logout
</      button>
        <button className="focus:outline-none">
          <FaUser className="text-xl text-gray-300 hover:text-white" />
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
