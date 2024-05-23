import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; 
import axiosJWT from '../../utils/axiosService';
import { DOCTOR_API } from '../../constants';
import { RootState } from '../../redux/reducer/reducer';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt } from 'react-icons/fa';

interface BookingDetail {
  _id: string;
  patientName: string;
  patientAge: number;
  date: string;
  timeSlot: string;
}

const AppointmentDetails: React.FC = () => {
  const dispatch = useDispatch();
  const id = useSelector((state: RootState) => state.DoctorSlice.id);

  const [bookingDetails, setBookingDetails] = useState<BookingDetail[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await axiosJWT.get(`${DOCTOR_API}/bookingdetails/${id}`);
        const bookingData = response.data.data.bookingDetails;
        console.log(bookingData);
        setBookingDetails(bookingData);
      } catch (error) {
        console.error('Error fetching booking details:', error);
      }
    };
    fetchBookingDetails();
  }, [id]);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const filteredAppointments = bookingDetails.filter(bookingDetail => {
    if (!selectedDate) return true;
    return new Date(bookingDetail.date).toLocaleDateString() === selectedDate.toLocaleDateString();
  });

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Appointment List</h1>
        
        <div className="border border-gray-500 shadow-lg rounded-md ml-3 mb-4 w-40 relative ">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            className="rounded-md px-4 py-2 w-full pl-10 "
            placeholderText="Select Date"
          />
          <div className="absolute top-3 left-2 text-gray-700">
            <FaCalendarAlt />
          </div>
        </div>   

        {filteredAppointments.length === 0 ? (
          <p className="text-xl">You have no appointments booked.</p>
        ) : (
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Patient Name</th>
                <th className="px-4 py-2">Age</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Time</th>
                <th className="px-4 py-2">Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map(bookingDetail => (
                <tr key={bookingDetail._id}
                className="hover:bg-gray-200 cursor-pointer transition duration-300">
                  <td className="border px-4 py-2">{bookingDetail.patientName}</td>
                  <td className="border px-4 py-2">{bookingDetail.patientAge}</td>
                  <td className="border px-4 py-2">{new Date(bookingDetail.date).toLocaleDateString()}</td>
                  <td className="border px-4 py-2">{bookingDetail.timeSlot}</td>
                  <td className="border px-4 py-2">
                    <Link to={`/patient-details/${bookingDetail._id}`} className="text-blue-500 hover:underline">
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default AppointmentDetails;
