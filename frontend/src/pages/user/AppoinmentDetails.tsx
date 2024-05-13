import React, { useEffect, useState } from 'react';
import Navbar from '../../components/user/Navbar/navbar';
import Footer from '../../components/user/Footer/Footer';
import axiosJWT from '../../utils/axiosService';
import { USER_API } from '../../constants';
import { useNavigate, useParams } from 'react-router-dom';
import showToast from '../../utils/toaster';
import { Modal, Button } from 'react-bootstrap';

const AppointmentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [doctorDetails, setDoctorDetails] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await axiosJWT.get(`${USER_API}/bookingdetails/${id}`);
        const bookingData = response.data.data.bookingDetails;
        setBookingDetails(bookingData);

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
      await axiosJWT.put(`${USER_API}/bookingdetails/${id}`, { appoinmentStatus: 'Cancelled', cancelReason });
      setBookingDetails((prevState: any) => ({ ...prevState, appoinmentStatus: 'Cancelled' }));
      showToast("Appoinment Cancelled", "success");
      setShowModal(false);
    } catch (error) {
      console.error('Error cancelling appointment:', error);
    }
  };

  const handleReschedule = () =>{
    if (bookingDetails.consultationType === "Online") {
      navigate(`/user/appoinmentOnline/${bookingDetails.doctorId}`);
    } else if (bookingDetails.consultationType === "Offline") {
      navigate(`/user/appoinmentOffline/${bookingDetails.doctorId}`);
    }
  }

  const renderStatus = () => {
    if (bookingDetails.appoinmentStatus === "Booked") {
      return <button onClick={() => setShowModal(true)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-5">Cancel Appointment</button>
    } else if (bookingDetails.appoinmentStatus === "Cancelled") {
      return (
        <div className="flex justify-between items-center">
          <p className="text-red-500">Appointment Cancelled</p>
          <button onClick={handleReschedule} className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Reschedule Appointment
          </button>
        </div>
      );
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

            <div className="bg-blue-50 p-6 rounded-lg shadow-md border border-blue-200">
              <h2 className="text-2xl font-bold mb-4">Scheduled Appointment</h2>
              <div>
                <p className='font-medium'>Date: {new Date(bookingDetails.date).toLocaleDateString()}</p>
                <p className='font-medium'>Time: {bookingDetails.timeSlot}</p>
                <p className='font-medium'>Patient Name: {bookingDetails.patientName}</p>
                <p className='font-medium'>Patient Age: {bookingDetails.patientAge}</p>
                <p className='font-medium'>Patient Gender: {bookingDetails.patientGender}</p>
                {renderStatus()}
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg shadow-md border border-blue-200">
              <h2 className="text-2xl font-bold mb-4">Consultation Details</h2>
              <div>
                <p className='font-medium'>Consultation Type: {bookingDetails.consultationType}</p>
                <p className='font-medium'>Payment Status: {bookingDetails.paymentStatus}</p>
              </div>
            </div>
          </div>
        )}

        {/* Modal for cancellation reason */}
        {showModal && (
          <div className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-full">
              <div className="bg-gray-50 px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">Reason for Cancellation</h3>
                <div className="mt-2">
                  <textarea
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                    className="block w-full p-2 sm:text-sm border-gray-300 rounded-md"
                    rows={4}
                    placeholder="Enter reason for cancellation"
                  ></textarea>
                </div>
              </div>
              <div className="bg-gray-100 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleCancelAppointment}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
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
