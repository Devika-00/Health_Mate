import React, { useEffect, useState } from 'react';
import { USER_API } from '../../constants';
import axiosJWT from '../../utils/axiosService';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';
import showToast from '../../utils/toaster';

const AppointmentOnlineBookingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [doctor, setDoctor] = useState<any>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [timeSlots, setTimeSlots] = useState<any[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patientDetails, setPatientDetails] = useState({
    patientName: '',
    patientAge: '',
    patientNumber: '',
    patientProblem: '',
  });

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await axiosJWT.get(`${USER_API}/doctor/${id}`);
        setDoctor(response.data.doctor);
        // Fetch scheduled dates inside fetchDoctorDetails
        try {
          const datesResponse = await axiosJWT.get(`${USER_API}/time-slots/${id}/dates`);
          console.log(datesResponse);
          // Parse dates to format them as needed
          const formattedDates: string[] = datesResponse.data.dateSlots.map((date: any) => {
            const splittedDate = date.date.split('T')[0]; // Split date and time, and take only the date part
            return splittedDate;
          });
          const uniqueDates: string[] = Array.from(new Set(formattedDates));
          setDates(uniqueDates);
        } catch (error) {
          console.error('Error fetching scheduled dates:', error);
        }
      } catch (error) {
        console.error('Error fetching doctor details:', error);
      }
    };

    fetchDoctorDetails();
  }, [id]);

  const handleBookAppointment = () => {
    // Check if both time slot and date are selected
    if (selectedTimeSlot && selectedDate) {
      setIsModalOpen(true);
    } else {
      // Display error toast if either time slot or date is not selected
      showToast('Please select both time slot and date.', 'error');
    }
  };

  const handleModalClose = () => {
    // Close the modal
    setIsModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPatientDetails({ ...patientDetails, [name]: value });
  };

  const handleAppointmentConfirmation = async () => {
    try {
      const { patientName, patientAge, patientNumber, patientProblem } = patientDetails;

      // Validation checks
      const nameRegex = /^[A-Z][a-zA-Z]+$/; // Regex for name validation
      const ageRegex = /^\d+$/; // Regex for age validation
      const numberRegex = /^\d{10}$/; // Regex for phone number validation

      // Validate patient name
      if (!patientName || !nameRegex.test(patientName)) {
        showToast('Please enter a valid name (first letter capital, letters only).', 'error');
        return;
      }

      // Validate patient age
      if (!patientAge || !ageRegex.test(patientAge) || parseInt(patientAge) < 3) {
        showToast('Please enter a valid age (numeric value, at least 3 years old).', 'error');
        return;
      }

      // Validate patient number
      if (!patientNumber || !numberRegex.test(patientNumber)) {
        showToast('Please enter a valid phone number (10 digits, numbers only).', 'error');
        return;
      }

      // Validate patient problem
      if (!patientProblem.trim()) {
        showToast('Please enter the patient\'s problem.', 'error');
        return;
      }

      const appointmentData = {
        doctorId: id,
        doctorName: doctor.doctorName,
        selectedTimeSlot: selectedTimeSlot,
        selectedDate: selectedDate,
        patientName: patientName,
        patientAge: patientAge,
        patientNumber: patientNumber,
        patientProblem: patientProblem,
      };
      const response = await axiosJWT.post(`${USER_API}/book-appointment`, appointmentData);
      console.log('Appointment booked successfully:', response.data);
      setIsModalOpen(false);
      showToast('Appointment booked successfully.', 'success');
    } catch (error) {
      console.error('Error booking appointment:', error);
      showToast('Error booking appointment. Please try again later.', 'error');
    }
  };

  const handleTimeSlotSelection = (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot);
  };

  const handleDateSelection = (date: string) => {
    setSelectedDate(date);
    setTimeSlots([]); // Clear time slots when date changes
    fetchTimeSlots(date);
  };

  const fetchTimeSlots = async (selectedDate: string) => {
    try {
      const response = await axiosJWT.get(`${USER_API}/time-slots/${id}?date=${selectedDate}`);
      setTimeSlots(response.data.timeSlots);
    } catch (error) {
      console.error('Error fetching time slots:', error);
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
              <p className="text-lg">Consultation: Online</p>
              <p className="text-lg">Fee: 300/-</p>
            </div>
          </div>

          {/* Scheduled Dates */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Scheduled Dates</h2>
            <div className="grid grid-cols-4 gap-4">
              {dates &&
                dates.map((date: string, index: number) => (
                  <div
                    key={index}
                    className={`bg-blue-100 rounded-lg shadow-md p-4 flex items-center justify-between cursor-pointer ${
                      selectedDate === date && 'border border-blue-500'
                    }`}
                    onClick={() => handleDateSelection(date)}
                  >
                    <div>
                      <input type="radio" id={`dateSlot${index}`} name="dateSlot" value={date} />
                      <label htmlFor={`dateSlot${index}`} className="text-lg font-bold">
                        {date}
                      </label>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Time Slots */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Available Time Slots</h2>
            <div className="grid grid-cols-9 gap-4">
              {timeSlots &&
                timeSlots.map((slot: any, index: number) => (
                  <div
                    key={index}
                    className={`bg-blue-100 rounded-lg shadow-md p-4 flex items-center justify-between cursor-pointer ${
                      selectedTimeSlot === slot.time && 'border border-blue-500'
                    }`}
                    onClick={() => handleTimeSlotSelection(slot.time)}
                  >
                    <div>
                      <input type="radio" id={`timeSlot${index}`} name="timeSlot" value={slot.time} />
                      <label htmlFor={`timeSlot${index}`} className="text-lg font-bold">
                        {slot.time}
                      </label>
                      <p className={slot.isAvailable ? 'text-green-700' : 'text-red-600'}>
                        {slot.isAvailable ? 'Available' : 'Not Available'}
                      </p>
                      {/* Render availability status */}
                    </div>
                  </div>
                ))}
            </div>
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
            {/* Form elements without <form> */}
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

export default AppointmentOnlineBookingPage;
