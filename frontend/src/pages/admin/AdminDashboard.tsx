import React, { useEffect, useState } from 'react';
import AdminHeader from '../../components/admin/Header&Sidebar/Header';
import AdminSidebar from '../../components/admin/Header&Sidebar/Sidebar';
import LineGraph from '../../components/admin/Graph/lineChart';
import DonutChart from '../../components/admin/Graph/DonutChart';
import axiosJWT from '../../utils/axiosService';
import { ADMIN_API } from '../../constants';

const Dashboard: React.FC = () => {
  const [doctors, setDoctors] = useState<[]>([]);
  const [users, setUsers] = useState<[]>([]);
  const [appointments, setAppointments] = useState<[]>([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axiosJWT.get(`${ADMIN_API}/doctors`);
        if (Array.isArray(response.data.doctors)) {
          setDoctors(response.data.doctors);
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axiosJWT.get(`${ADMIN_API}/users`);
        if (Array.isArray(response.data.users)) {
          setUsers(response.data.users);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const fetchAppointments = async () => {
      try {
        const response = await axiosJWT.get(`${ADMIN_API}/appoinments`);
        if (Array.isArray(response.data.appoinments)) {
          setAppointments(response.data.appoinments);
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchDoctors();
    fetchUsers();
    fetchAppointments();
  }, []);

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex flex-col flex-grow">
        <AdminHeader />
        <div className="p-6 flex flex-col flex-grow overflow-auto">
          <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
          <div className="grid grid-cols-3 gap-6 ">
            {/* Card 1: Doctors Count */}
            <div className="bg-white shadow-md rounded-lg p-6 bg-yellow-100">
              <h2 className="text-lg font-bold">Doctors Count</h2>
              <p className="text-3xl font-bold">{doctors.length}</p>
            </div>
            {/* Card 2: Users Count */}
            <div className="bg-white shadow-md rounded-lg p-6 bg-red-200">
              <h2 className="text-lg font-bold">Users Count</h2>
              <p className="text-3xl font-bold">{users.length}</p>
            </div>
            {/* Card 3: Appointments Count */}
            <div className="bg-white shadow-md rounded-lg p-6 bg-blue-300">
              <h2 className="text-lg font-bold">Appointments</h2>
              <p className="text-3xl font-bold">{appointments.length}</p>
            </div>
          </div>
          <div className="flex justify-between mt-1">
            <LineGraph doctors={doctors} users={users} appointments={appointments} />
            <DonutChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
