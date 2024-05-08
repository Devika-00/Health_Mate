import React, { useEffect, useState } from 'react';
import Navbar from '../../components/user/Navbar/navbar';
import Footer from '../../components/user/Footer/Footer';
import axiosJWT from '../../utils/axiosService';
import { USER_API } from '../../constants';
import { useParams } from 'react-router-dom';
import showToast from '../../utils/toaster';

const AppointmentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [doctorDetails, setDoctorDetails] = useState<any>(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await axiosJWT.get(`${USER_API}/bookingdetails/${id}`);
        console.log(response);
        const bookingData = response.data.data.bookingDetails;
        setBookingDetails(bookingData);

        // Fetch doctor details using doctorId from bookingDetails
        const doctorResponse = await axiosJWT.get(`${USER_API}/doctor/${bookingData.doctorId}`);
        setDoctorDetails(doctorResponse.data.doctor);
      } catch (error) {
        console.error('Error fetching booking details:', error);
      }
    };
    fetchBookingDetails();
  }, [id]);

  const handleCancelAppointment = async () => {
    try {
      await axiosJWT.put(`${USER_API}/bookingdetails/${id}`, { appoinmentStatus: 'Cancelled' });
      setBookingDetails((prevState: any) => ({ ...prevState, appoinmentStatus: 'Cancelled' }));
      showToast("Cancel request send","success");
    } catch (error) {
      console.error('Error cancelling appointment:', error);
    }
  };

  const renderStatus = () => {
    if (bookingDetails.appoinmentStatus === "Booked") {
      return <button onClick={handleCancelAppointment} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-5">Cancel Appointment</button>
    } else if (bookingDetails.appoinmentStatus === "Cancelled") {
      return <p className="text-red-500">Appointment Cancelled</p>;
    } else if (bookingDetails.appoinmentStatus === "Consulted") {
      return <p className="text-green-500">Consultation Completed</p>;
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Booking Details</h1>

        {bookingDetails && doctorDetails && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Doctor details */}
            <div className="bg-blue-50 p-6 rounded-lg shadow-md border border-blue-200">
              <div className="flex items-center mb-4">
                <img src={doctorDetails.profileImage} alt={doctorDetails.doctorName} className="w-40 h-40 rounded mr-4" />
                <div>
                  <h2 className="text-2xl font-bold">{doctorDetails.doctorName}</h2>
                  <p>{doctorDetails.department}</p>
                  <p className="text-green-600 font-semibold">Verified</p>
                </div>
              </div>
            </div>

            {/* Appointment details */}
            <div className="bg-blue-50 p-6 rounded-lg shadow-md border border-blue-200">
              <h2 className="text-2xl font-bold mb-4">Scheduled Appointment</h2>
              <div>
                <p className='font-medium'>Date: {new Date(bookingDetails.date).toLocaleDateString()}</p>
                <p className='font-medium'>Time: {bookingDetails.timeSlot}</p>
                <p className='font-medium'>Patient Name: {bookingDetails.patientName}</p>
                <p className='font-medium'>Patient Age: {bookingDetails.patientAge}</p>
                <p className='font-medium'>Patient Gender: {bookingDetails.patientGender}</p>
                {/* Render status based on appointmentStatus */}
                {renderStatus()}
              </div>
            </div>

            {/* Consultation details */}
            <div className="bg-blue-50 p-6 rounded-lg shadow-md border border-blue-200">
              <h2 className="text-2xl font-bold mb-4">Consultation Details</h2>
              <div>
                <p className='font-medium'>Consultation Type: {bookingDetails.consultationType}</p>
                <p className='font-medium'>Payment Status: {bookingDetails.paymentStatus}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default AppointmentDetails;
