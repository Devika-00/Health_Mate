import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import AdminHeader from '../../components/admin/Header&Sidebar/Header';
import AdminSidebar from '../../components/admin/Header&Sidebar/Sidebar';
import useDoctors from "../../hooks/useDoctors";
import RequestedDoctorData from "../../components/admin/requestedDoctors";

const RequestedDoctorList: React.FC = () => {
  // Using the useUsers hook to fetch doctor data
  const { doctors } = useDoctors();
  

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex flex-col w-full">
        <AdminHeader />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Requested Doctor List</h1> {/* Changed heading */}
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-6 py-3 text-left">ID</th>
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">Email</th>
                  <th className="px-6 py-3 text-left">Department</th>
                  <th className="px-6 py-3 text-left">Details</th> {/* Removed "Verified", "Status", and "Actions" */}
                  <th className="px-6 py-3 text-left">Verification Request</th> {/* Removed "Verified", "Status", and "Actions" */}
                </tr>
              </thead>
              <tbody>
                {doctors.map((doctor) => {
                  return <RequestedDoctorData {...doctor} key={doctor._id} />;
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestedDoctorList;