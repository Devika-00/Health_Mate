import React from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar: React.FC = () => {
  return (
    <div className="bg-gray-800 text-white w-64 py-4 px-6 h-full flex flex-col">
      <h1 className="text-2xl font-bold mb-8">HEALTH MATE</h1>
      <ul className="space-y-2">
        <li>
          <Link
            to="/admin"
            className="block py-2 px-4 rounded-md hover:bg-gray-700"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/admin/doctors"
            className="block py-2 px-4 rounded-md hover:bg-gray-700"
          >
            Verified Doctors
          </Link>
        </li>
        <li>
          <Link
            to="/admin/requesteddoctors"
            className="block py-2 px-4 rounded-md hover:bg-gray-700"
          >
            Requested Doctors
          </Link>
        </li>
        <li>
          <Link
            to="/admin/users"
            className="block py-2 px-4 rounded-md hover:bg-gray-700"
          >
            Users
          </Link>
        </li>
        <li>
          <Link
            to="/admin/department"
            className="block py-2 px-4 rounded-md hover:bg-gray-700"
          >
            Department
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
