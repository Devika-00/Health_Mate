import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // You might need to adjust this import based on your project setup
import { USER_API } from '../../constants';
import axiosJWT from '../../utils/axiosService';

const AppointmentsListPage = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch appointments data from API
    const fetchAppointments = async () => {
      try {
        const response = await axiosJWT.get(`${USER_API}/allAppoinments`); 
        setAppointments(response.data.bookings.bookingDetails);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Appointments List</h1>

      {appointments.length === 0 ? (
        <p className="text-xl">You have no appointments booked.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {appointments.map((appointment:any) => (
            <Link to={`/appoinmentDetails/${appointment._id}`} key={appointment._id}>
              <div className="border rounded-lg shadow-md p-4 cursor-pointer transition duration-300 transform hover:scale-105">
                <h2 className="text-xl font-bold mb-2">{appointment.patientName}</h2>
                <p className="text-gray-600">Age: {appointment.patientAge}</p>
                <p className="text-gray-600">Date: {appointment.date}</p>
                <p className="text-gray-600">Time: {appointment.timeSlot}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppointmentsListPage;
