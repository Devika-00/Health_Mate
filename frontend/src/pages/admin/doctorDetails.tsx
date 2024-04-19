import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; // Assuming you're using React Router for navigation
import AdminHeader from '../../components/admin/Header&Sidebar/Header';
import AdminSidebar from '../../components/admin/Header&Sidebar/Sidebar';

const DoctorDetails: React.FC = () => {
  // Example doctor details data
  const doctorDetails = {
    id: 1,
    name: 'Dr. John Doe',
    email: 'john@example.com',
    department: 'Cardiology',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in molestie nunc, eget condimentum lacus.',
  };

  // State for selected action
  const [selectedAction, setSelectedAction] = useState('pending');

  // Function to handle action change
  const handleActionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAction(e.target.value);
  };

  // Function to handle update action
  const handleUpdate = () => {
    // Handle the update action with selectedAction
    console.log(`Updating with action: ${selectedAction}`);
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex flex-col w-full">
        <AdminHeader />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Doctor Details</h1>
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">ID:</label>
              <p>{doctorDetails.id}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
              <p>{doctorDetails.name}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
              <p>{doctorDetails.email}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Department:</label>
              <p>{doctorDetails.department}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
              <p>{doctorDetails.description}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Action:</label>
              <select value={selectedAction} onChange={handleActionChange} className="block w-full mt-1">
                <option value="rejected" style={{ color: 'red' }}>Reject</option>
                <option value="pending" style={{ color: 'yellow' }}>Pending</option>
                <option value="approved" style={{ color: 'green' }}>Approve</option>
              </select>
            </div>
            <div className="mb-4">
              <button onClick={handleUpdate} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;
