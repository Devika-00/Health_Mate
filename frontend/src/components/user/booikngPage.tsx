import React, { useEffect, useState } from 'react';
import { USER_API } from '../../constants';
import axiosJWT from '../../utils/axiosService';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';
import showToast from '../../utils/toaster';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from "lucide-react";
import { loadStripe } from '@stripe/stripe-js';
import { Navigate, useNavigate } from "react-router-dom";


const AppointmentBookingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [doctor, setDoctor] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [patientDetails, setPatientDetails] = useState({
    patientName: '',
    patientAge: '',
    patientNumber: '',
    patientGender: '',
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [existingPatientDetails, setExistingPatientDetails] = useState<any>(null);
  const [scheduledAppointments, setScheduledAppointments] = useState<any[]>([]);

  console.log(existingPatientDetails);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await axiosJWT.get(`${USER_API}/doctor/${id}`);
        setDoctor(response.data.doctor);
      } catch (error) {
        console.error('Error fetching doctor details:', error);
      }
    };
    fetchDoctorDetails();
  }, [id]);

  useEffect(() => {
    setSelectedDate(new Date());
  }, []);

  useEffect(() => {
    const fetchTimeSlots = async () => {
      if (selectedDate) {
        try {
          const response = await axiosJWT.get(`${USER_API}/timeslots/${id}?date=${selectedDate.toISOString()}`);
          if (response.data.timeSlots.length > 0) {
            setTimeSlots(response.data.timeSlots[0].slotTime);
          } else {
            setTimeSlots([]);
          }
        } catch (error) {
          console.error('Error fetching time slots:', error);
        }
      }
    };
    fetchTimeSlots();
  }, [selectedDate, id]);

  const stripePromise = loadStripe('pk_test_51PD7KTSIzXVKkSTfUhacmtu4D3bCdX2OCgy7mCYS0JJVvro7cM8QwwIoQVHcBlCEg41UUlqIplqs0avKVML03Bnc00iATAKl4Y');

  const handleBookAppointment = async () => {
    try {
      const appointmentData = {
        doctorId: id,
        patientDetails: existingPatientDetails || patientDetails,
        consultationType: 'Offline',
        fee: 400,
        paymentStatus: 'Pending',
        date: selectedDate,
        timeSlot: selectedTimeSlot,
      };
      const response = await axiosJWT.post(`${USER_API}/appointments`, appointmentData);
      
      if (response.data.id) {
        const stripe = await stripePromise;
        const result = await stripe?.redirectToCheckout({
          sessionId:response.data.id,
        });
        if (result?.error) console.error(result.error);
      }
      const bookingId = response.data.booking.bookingId;
      Navigate({
        to: `${USER_API}/payment_status/${bookingId}?success=true`
      });
    }catch (error) {
      console.error('Error booking appointment:', error);
      showToast('Error booking appointment. Please try again later.', 'error');
    }
  };

  const handleNextStepBookAppointment = () => {
    if (selectedTimeSlot) {
      setIsModalOpen(true);
    } else {
      showToast('Please select a time slot', 'error');
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'patientName') {
      const formattedValue = value.replace(/[^a-zA-Z ]/g, '').replace(/\b\w/g, (char) => char.toUpperCase());
      setPatientDetails({ ...patientDetails, [name]: formattedValue });
    }
    else if (name === 'patientAge') {
      const formattedValue = value.replace(/\D/g, '');
      setPatientDetails({ ...patientDetails, [name]: formattedValue });
    }
    else if (name === 'patientNumber') {
      const formattedValue = value.replace(/\D/g, '').slice(0, 10);
      setPatientDetails({ ...patientDetails, [name]: formattedValue });
    }
    else {
      setPatientDetails({ ...patientDetails, [name]: value });
    }
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPatientDetails({ ...patientDetails, [name]: value });
  };


  const handleAddDetails = () => {
    setIsDetailsModalOpen(true);
  };

  const handleSelectExisting = (patientDetails: any) => {
    setPatientDetails(patientDetails);
    setIsModalOpen(false);
  };

  const handleAddPatientDetails = () => {
    if (patientDetails.patientName && patientDetails.patientAge && patientDetails.patientNumber && patientDetails.patientGender) {
      setIsDetailsModalOpen(false);
      setExistingPatientDetails(patientDetails);
    } else {
      showToast('Please fill in all fields', 'error');
    }
  };

  const handleTimeSlotSelection = (slot: string) => {
    setSelectedTimeSlot(selectedTimeSlot === slot ? null : slot);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Book an Appointment</h1>

      {doctor && (
        <div>
          <div className="flex items-center mb-8">
            <img src={doctor.profileImage} alt={doctor.doctorName} className="w-60 h-60 rounded mr-4" />
            <div className='ml-8'>
              <h2 className="text-xl font-bold">{doctor.doctorName}</h2>
              <p>{doctor.department}</p>
              <p className="text-green-600 font-semibold"> Verified </p>
              <div className="text-gray-800 bg-blue-100 p-4 rounded-md mt-5 font-bold">
                <p className="mb-2">Consultation: Offline</p>
                <p>Fee: 400/-</p>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h1 className='ml-4 mt-6 font-medium text-blue-950 text-lg'>Select The Scheduled Date</h1>
            <DatePicker
              selected={selectedDate}
              onChange={(date: Date | null) => setSelectedDate(date)}
              className="rounded-lg px-4 py-2 w-full mt-2"
              dateFormat="MM/dd/yyyy"
              minDate={new Date()}
              placeholderText="Select Date"
              customInput={
                <div className="relative">
                  <input
                    className="border shadow-2xl border-gray-900 rounded-lg px-4 py-2 w-full font-medium text-gray-900"
                    value={selectedDate ? selectedDate.toDateString() : ''}
                    readOnly
                    placeholder="Select Date"
                  />
                  <Calendar className="absolute right-3 top-3 text-gray-800 cursor-pointer mr-3" />
                </div>
              }
            />
          </div>

          {timeSlots.length > 0 ? (
            <div className="max-w-md mx-auto">
              <h1 className="text-2xl font-bold mb-4 ">Schedule Time Slots</h1>
              <div className="grid grid-cols-2 gap-4">
                {timeSlots.map((slot, index) => (
                  <button
                    key={index}
                    className={`w-full border rounded-md py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 focus:ring-offset-gray-100 ${
                      selectedTimeSlot === slot ? ' border-blue-900' : 'border-gray-300'
                    }`}
                    onClick={() => handleTimeSlotSelection(slot)}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-red-600 mt-4">No slots scheduled for the selected date.</p>
          )}

          <Modal
            isOpen={isModalOpen}
            onRequestClose={handleModalClose}
            style={{
              overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              },
              content: {
                position: 'relative',
                top: 'auto',
                left: 'auto',
                right: 'auto',
                bottom: 'auto',
                width: '400px',
                borderRadius: '8px',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
                padding: '20px',
                margin: '0 auto',
              },
            }}
          >
            <button onClick={handleModalClose} className="absolute top-0 right-0 m-4 bg-gray-400 p-2 rounded">
              close
            </button>
            <h2 className="text-xl font-bold mb-4">Patient Details</h2>
            {existingPatientDetails ? (
              <div
                onClick={() => handleSelectExisting(existingPatientDetails)}
                className="border rounded-lg p-4 mb-4 cursor-pointer"
              >
                <p>Name: {existingPatientDetails.patientName}</p>
                <p>Age: {existingPatientDetails.patientAge}</p>
                <p>Phone Number: {existingPatientDetails.patientNumber}</p>
                <p>Gender: {existingPatientDetails.patientGender}</p>
              </div>
            ) : (
              <p className="mb-4">No patient details found.</p>
            )}
            <button onClick={handleAddDetails} className="bg-blue-950 text-white py-2 px-4 rounded-lg mr-2">Add Details +</button>
          </Modal>

          <Modal
            isOpen={isDetailsModalOpen}
            onRequestClose={() => setIsDetailsModalOpen(false)}
            style={{
              overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              },
              content: {
                position: 'relative',
                top: 'auto',
                left: 'auto',
                right: 'auto',
                bottom: 'auto',
                width: '400px',
                borderRadius: '8px',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
                padding: '20px',
                margin: '0 auto',
              },
            }}
          >
            <button onClick={() => setIsDetailsModalOpen(false)} className="absolute top-0 right-0 m-4 bg-gray-400 p-2 rounded">
              close
            </button>
            <h2 className="text-xl font-bold mb-4">Enter Patient Details</h2>
            <div className="mb-4">
              <label className="block mb-1">Name:</label>
              <input
                type="text"
                name="patientName"
                value={patientDetails.patientName}
                onChange={handleInputChange}
                className="border border-gray-400 rounded-lg px-4 py-2 w-full mt-1"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Age:</label>
              <input
                type="text"
                name="patientAge"
                value={patientDetails.patientAge}
                onChange={handleInputChange}
                className="border border-gray-400 rounded-lg px-4 py-2 w-full mt-1"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Phone Number:</label>
              <input
                type="text"
                name="patientNumber"
                value={patientDetails.patientNumber}
                onChange={handleInputChange}
                className="border border-gray-400 rounded-lg px-4 py-2 w-full mt-1"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Gender:</label>
              <select
                name="patientGender"
                value={patientDetails.patientGender}
                onChange={handleGenderChange}
                className="border border-gray-400 rounded-lg px-4 py-2 w-full mt-1"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </div>
            <button onClick={handleAddPatientDetails} className="bg-blue-950 text-white py-2 px-4 rounded-lg mt-4">Submit</button>
          </Modal>
        </div>
      )}

      <div className="mt-8 ml-8">
        {existingPatientDetails ? (
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-gray-500 p-4 rounded-md">
              <h2 className=' font-bold mb-3 text-lg'>Patient Details</h2>
              <p>Name: {existingPatientDetails.patientName}</p>
              <p>Age: {existingPatientDetails.patientAge}</p>
              <p>Phone Number: {existingPatientDetails.patientNumber}</p>
              <p>Gender: {existingPatientDetails.patientGender}</p>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>

      <div className="flex justify-start ml-8 mt-8">
          {existingPatientDetails ? (
            <button
              onClick={handleBookAppointment}
              disabled={timeSlots.length === 0}
              className={`bg-blue-950 text-white py-2 px-4 rounded-lg ${
                timeSlots.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Book an Appointment
            </button>
          ):(
            <button
              onClick={handleNextStepBookAppointment}
              disabled={timeSlots.length === 0}
              className={`bg-blue-950 text-white py-2 px-4 rounded-lg ${
                timeSlots.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Next
            </button>
          )}
          </div> 

    </div>
  );
};

export default AppointmentBookingPage;
