import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import AdminHeader from '../../components/admin/Header&Sidebar/Header';
import AdminSidebar from '../../components/admin/Header&Sidebar/Sidebar';

const DoctorList: React.FC = () => {
  // Example data for doctors
  const doctors = [
    { id: 1, name: 'Dr. John Doe', email: 'john@example.com', department: 'Cardiology', verified: true, status: 'Active' },
    { id: 2, name: 'Dr. Jane Smith', email: 'jane@example.com', department: 'Dermatology', verified: false, status: 'Blocked' },
    // Add more doctors as needed
  ];

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex flex-col w-full">
        <AdminHeader />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Doctor List</h1>
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Department</th>
                  <th className="px-4 py-2">Verified</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Details</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map(doctor => (
                  <tr key={doctor.id}>
                    <td className="border px-4 py-2">{doctor.id}</td>
                    <td className="border px-4 py-2">{doctor.name}</td>
                    <td className="border px-4 py-2">{doctor.email}</td>
                    <td className="border px-4 py-2">{doctor.department}</td>
                    <td className="border px-4 py-2">{doctor.verified ? 'Yes' : 'No'}</td>
                    <td className={`border px-4 py-2 ${doctor.status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>{doctor.status}</td>
                    <td className="border px-4 py-2">
                      <Link to={`/doctor/${doctor.id}`} className="text-blue-500 hover:underline">
                        View Details
                      </Link>
                    </td>
                    <td className="border px-4 py-2">
                      {doctor.status === 'Active' ? (
                        <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                          Block
                        </button>
                      ) : (
                        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                          Unblock
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorList;
