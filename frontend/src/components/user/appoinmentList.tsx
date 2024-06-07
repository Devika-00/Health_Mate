import React, { useState, useEffect } from "react";
import axiosJWT from "../../utils/axiosService";
import { USER_API } from "../../constants";

const AppointmentsListPage = () => {
  const [appoinments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    // Fetch appointments data from API
    const fetchAppointments = async () => {
      try {
        const response = await axiosJWT.get(`${USER_API}/allAppoinments`);
        setAppointments(response.data.bookings.bookingDetails);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  const formatDate = (dateString: string) => {
    const options: any = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Appointments List</h1>

      {appoinments.length === 0 ? (
        <p className="text-xl">You have no appointments booked.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="w-full bg-gray-800 text-white">
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Age</th>
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Time Slot</th>
              </tr>
            </thead>
            <tbody>
              {appoinments.map((appointment: any) => (
                <tr
                  key={appointment._id}
                  className="hover:bg-gray-200 cursor-pointer transition duration-300"
                  onClick={() =>
                    (window.location.href = `/appoinmentDetails/${appointment._id}`)
                  }
                >
                  <td className="py-2 px-4 border-b text-center">
                    {appointment.patientName}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {appointment.patientAge}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {formatDate(appointment.date)}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {appointment.timeSlot}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AppointmentsListPage;
