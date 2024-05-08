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
          ):(
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {filteredAppointments.map(bookingDetail => (
                <div className="bg-blue-50 p-6 rounded-lg shadow-md border border-blue-200 cursor-pointer" key={bookingDetail._id}>
                  <Link to={`/patient-details/${bookingDetail._id}`}>
                    <p className="text-xl font-bold mb-2">{bookingDetail.patientName}</p>
                    <p className="mb-2">Age: {bookingDetail.patientAge}</p>
                    <p className="mb-2">Date: {new Date(bookingDetail.date).toLocaleDateString()}</p>
                    <p className="mb-2">Time: {bookingDetail.timeSlot}</p>
                  </Link>
                </div>
              ))}
            </div>
          )}

      </div>
    </>
  );
};

export default AppointmentDetails;
