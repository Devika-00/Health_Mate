import React, { useEffect, useState, useRef } from 'react';
import { USER_API } from '../../constants';
import axiosJWT from '../../utils/axiosService';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';
import showToast from '../../utils/toaster';
import DatePicker from 'react-datepicker'; // Import react-datepicker
import "react-datepicker/dist/react-datepicker.css"; // Import react-datepicker styles
import { Calendar } from "lucide-react";

const AppointmentBookingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [doctor, setDoctor] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patientDetails, setPatientDetails] = useState({
    patientName: '',
    patientAge: '',
    patientNumber: '',
    patientProblem: '',
  });
  const [isSlotAvailable, setIsSlotAvailable] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // State to store selected date

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

  const handleBookAppointment = () => {
    if (isSlotAvailable) {
      setIsModalOpen(true);
    } else {
      showToast('No slots available for this date.', 'error');
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPatientDetails({ ...patientDetails, [name]: value });
  };

  const handleAppointmentConfirmation = async () => {
    try {
      // Appointment booking logic
    } catch (error) {
      console.error('Error booking appointment:', error);
      showToast('Error booking appointment. Please try again later.', 'error');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Book an Appointment</h1>

      {doctor && (
        <div>
          {/* Doctor Profile */}
          <div className="flex items-center mb-8">
            <img src={doctor.profileImage} alt={doctor.doctorName} className="w-28 h-28 rounded-full mr-4" />
            <div>
              <h2 className="text-xl font-bold">{doctor.doctorName}</h2>
              <p>{doctor.department}</p>
              <p className="text-green-600 font-semibold"> Verified </p>
            </div>
          </div>

           {/* Calendar */}
           <div className="mb-4">
            <h1 className='ml-4 mt-6 font-medium text-blue-950 text-lg'>Select The Scheduled Date</h1>
            <DatePicker // Add react-datepicker component
              selected={selectedDate} // Set selected date
              onChange={(date: Date | null) => setSelectedDate(date)} // Handle date change
              className=" rounded-lg px-4 py-2 w-full mt-2" // Add CSS classes
              dateFormat="MM/dd/yyyy" // Specify date format
              minDate={new Date()} // Set minimum date to today
              placeholderText="Select Date" // Placeholder text
              // Custom input with calendar icon
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

          {/* Book Appointment Button */}
          <div className="flex justify-end">
            <button onClick={handleBookAppointment} className="bg-blue-950 text-white py-2 px-4 rounded-lg">
              Book an Appointment
            </button>
          </div>

          {/* Modal for entering patient details */}
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
            <div className="mb-6">
              <label htmlFor="name" className="block mb-2">
                Name
              </label>
              <input
                type="text"
                required
                id="name"
                name="patientName"
                value={patientDetails.patientName}
                onChange={handleInputChange}
                className="border rounded-lg px-4 py-2 w-full"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="age" className="block mb-2">
                Age
              </label>
              <input
                type="text"
                required
                id="age"
                name="patientAge"
                value={patientDetails.patientAge}
                onChange={handleInputChange}
                className="border rounded-lg px-4 py-2 w-full"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="phoneNumber" className="block mb-2">
                Phone Number
              </label>
              <input
                type="text"
                required
                id="phoneNumber"
                name="patientNumber"
                value={patientDetails.patientNumber}
                onChange={handleInputChange}
                className="border rounded-lg px-4 py-2 w-full"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="problem" className="block mb-2">
                Problem
              </label>
              <input
                id="problem"
                required
                name="patientProblem"
                value={patientDetails.patientProblem}
                onChange={handleInputChange}
                className="border rounded-lg px-4 py-2 w-full"
              />
            </div>
            <button onClick={handleAppointmentConfirmation} className="bg-blue-950 text-white py-2 px-4 rounded-lg">
              Book Appointment
            </button>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default AppointmentBookingPage;
