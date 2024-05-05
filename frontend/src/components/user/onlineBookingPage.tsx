import React, { useEffect, useState } from 'react';
import { USER_API } from '../../constants';
import axiosJWT from '../../utils/axiosService';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';
import showToast from '../../utils/toaster';
import DatePicker from 'react-datepicker'; // Import react-datepicker
import "react-datepicker/dist/react-datepicker.css"; // Import react-datepicker styles
import { Calendar } from "lucide-react";

const AppointmentOnlineBookingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [doctor, setDoctor] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patientDetails, setPatientDetails] = useState({
    patientName: '',
    patientAge: '',
    patientNumber: '',
    patientProblem: '',
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // State to store selected date
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  console.log(timeSlots);

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
    // Set initial selectedDate to today's date
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
            setTimeSlots([]); // Reset timeSlots state if no slots are scheduled
          }
        } catch (error) {
          console.error('Error fetching time slots:', error);
        }
      }
    };
    fetchTimeSlots();
  }, [selectedDate, id]);

  const handleBookAppointment = () => {
    // Your logic here to book the appointment
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
      // Your logic here to confirm the appointment
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
            <img src={doctor.profileImage} alt={doctor.doctorName} className="w-60 h-60 rounded mr-4" />
            <div className='ml-8'>
              <h2 className="text-xl font-bold">{doctor.doctorName}</h2>
              <p>{doctor.department}</p>
              <p className="text-green-600 font-semibold"> Verified </p>
              <div className="text-gray-800 bg-blue-100 p-4 rounded-md mt-5 font-bold">
                <p className="mb-2">Consultation: Online</p>
                <p>Fee: 300/-</p>
              </div>
            </div>
          </div>

          {/* Calendar */}
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

          {/* Time Slots Section */}
        {timeSlots.length > 0 ? (
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Schedule Time Slots</h1>
            <div className="grid grid-cols-2 gap-4">
              {timeSlots.map((slot, index) => (
                <button key={index} className="w-full bg-white border border-gray-300 rounded-md py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 focus:ring-offset-gray-100">{slot}</button>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-red-600 mt-4">No slots scheduled for the selected date.</p>
        )}

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
            {/* Add other patient detail inputs */}
            <button onClick={handleAppointmentConfirmation} className="bg-blue-950 text-white py-2 px-4 rounded-lg">
              Book Appointment
            </button>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default AppointmentOnlineBookingPage;
