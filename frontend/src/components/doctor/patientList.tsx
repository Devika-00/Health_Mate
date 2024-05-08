import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; 
import axiosJWT from '../../utils/axiosService';
import { DOCTOR_API } from '../../constants';
import { RootState } from '../../redux/reducer/reducer';

const AppointmentDetails: React.FC = () => {
  const dispatch = useDispatch();
  const id = useSelector((state: RootState) => state.DoctorSlice.id); // Replace 'RootState' with your actual RootState type

  const [bookingDetails, setBookingDetails] = useState([]);

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
  }, []);

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Appointment List</h1>

          {bookingDetails.length === 0 ? (
            <p className="text-xl">You have no appointments booked.</p>
          ):(
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {bookingDetails.map((bookingDetail:any)=>(
            <div className="bg-blue-50 p-6 rounded-lg shadow-md border border-blue-200 cursor-pointer">
              <Link to={`/patient-details/${bookingDetail._id}`}>
                <p className="text-xl font-bold mb-2">{bookingDetail.patientName}</p>
                <p className="mb-2">Age: {bookingDetail.patientAge}</p>
                <p className="mb-2">Date: {new Date(bookingDetail.date).toLocaleDateString()}</p>
                <p className="mb-2">Time: {bookingDetail.timeSlot}</p>
              </Link>
            </div>
          )
          )}
        </div>
          )}

      </div>
    </>
  );
};

export default AppointmentDetails;
