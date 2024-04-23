import React, { useEffect, useState } from 'react';
import { USER_API } from '../../constants';
import axiosJWT from '../../utils/axiosService';
import { useParams } from 'react-router-dom';
import { BsChatDots, BsTelephone, BsCameraVideo, BsPerson } from 'react-icons/bs';
import Modal from 'react-modal';
import showToast from '../../utils/toaster';

const AppointmentBookingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [doctor, setDoctor] = useState<any>(null);
  const [selectedPackage, setSelectedPackage] = useState<string>('');
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

  // State to track whether time slot and package are selected
  const [isTimeSlotSelected, setIsTimeSlotSelected] = useState(false);
  const [isPackageSelected, setIsPackageSelected] = useState(false);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await axiosJWT.get(`${USER_API}/doctor/${id}`);
        setDoctor(response.data.doctor);
        // Fetch scheduled dates inside fetchDoctorDetails
        try {
          const datesResponse = await axiosJWT.get(`${USER_API}/time-slots/${id}/dates`);
          // Parse dates to format them as needed
          const formattedDates = datesResponse.data.dateSlots.map((date: any) => {
            const splittedDate = date.date.split('T')[0]; // Split date and time, and take only the date part
            return splittedDate;
          });
          const uniqueDates:string[] = Array.from(new Set(formattedDates));
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
    // Check if both time slot and package are selected
    if (selectedTimeSlot && selectedPackage) {
      setIsModalOpen(true);
    } else {
      // Display error toast if either time slot or package is not selected
      showToast('Please select both time slot and package.', "error");
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
      const {patientName, patientAge, patientNumber, patientProblem} = patientDetails

      const appointmentData = {
        doctorId: id,
        doctorName: doctor.doctorName,
        selectedPackage: selectedPackage,
        selectedTimeSlot: selectedTimeSlot,
        selectedDate:selectedDate,
        patientName: patientName,
        patientAge: patientAge,
        patientNumber: patientNumber,
        patientProblem: patientProblem,
      };
      const response = await axiosJWT.post(`${USER_API}/book-appoinment`, appointmentData);
      console.log('Appointment booked successfully:', response.data);
      setIsModalOpen(false);
      showToast('Appointment booked successfully.', "success");
    } catch (error) {
      console.error('Error booking appointment:', error);
      showToast('Error booking appointment. Please try again later.', "error");
    }
  };

  const handlePackageSelection = (packageName: string) => {
    setSelectedPackage(prevPackage => prevPackage === packageName ? '' : packageName);
    setIsPackageSelected(prevState => !prevState); // Toggle package selection state
  };

  const handleTimeSlotSelection = (timeSlot: string) => {
    setSelectedTimeSlot(prevTimeSlot => prevTimeSlot === timeSlot ? '' : timeSlot);
    setIsTimeSlotSelected(prevState => !prevState); // Toggle time slot selection state
  };

  const handleDateSelection = (date: string) => {
    // Deselect the date if it's already selected
    if (selectedDate === date) {
      setSelectedDate('');
    } else {
      setSelectedDate(date);
      setIsTimeSlotSelected(false); // Reset time slot selection when date changes
      fetchTimeSlots(date);
    }
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
              <p className='text-green-600 font-semibold'> Verified </p>
            </div>
          </div>
        
          {/* Scheduled Dates */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Scheduled Dates</h2>
            <div className="grid grid-cols-4 gap-4">
              {dates && dates.map((date: string, index: number) => (
                <div key={index} className={`bg-blue-100 rounded-lg shadow-md p-4 flex items-center justify-between cursor-pointer ${selectedDate === date && 'border border-blue-500'}`} onClick={() => handleDateSelection(date)}>
                  <div>
                    <input type="radio" id={`dateSlot${index}`} name="dateSlot" value={date} />
                    <label htmlFor={`dateSlot${index}`} className="text-lg font-bold">{date}</label>
                  </div>
                </div>
              ))}
            </div>
          </div>

         {/* Time Slots */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Available Time Slots</h2>
            <div className="grid grid-cols-9 gap-4">
              {timeSlots && timeSlots.map((slot: any, index: number) => (
                <div key={index} className={`bg-blue-100 rounded-lg shadow-md p-4 flex items-center justify-between cursor-pointer ${selectedTimeSlot === slot.time && 'border border-blue-500'}`} onClick={() => handleTimeSlotSelection(slot.time)}>
                  <div>
                    <input type="radio" id={`timeSlot${index}`} name="timeSlot" value={slot.time} />
                    <label htmlFor={`timeSlot${index}`} className="text-lg font-bold">{slot.time}</label>
                    <p className={slot.isAvailable ? 'text-green-700' : 'text-red-600'}>{slot.isAvailable ? 'Available' : 'Not Available'}</p>
                    {/* Render availability status */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        
          {/* Select Package */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Select Package</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Messaging Package */}
              <div 
                className={`bg-blue-100 rounded-lg shadow-md p-4 flex items-center justify-between cursor-pointer ${
                  selectedPackage === 'Messaging' && 'border border-blue-500'
                }`}
                onClick={() => handlePackageSelection('Messaging')}
              >
                <div>
                  <BsChatDots size={24} />
                  <div>
                    <h3 className="text-lg font-bold">Messaging</h3>
                    <p className='text-blue-900'>Chat with Doctor</p>
                  </div>
                </div>
                <p className='font-bold'>$20</p>
              </div>

              {/* Voice Call Package */}
              <div 
                className={`bg-blue-100 rounded-lg shadow-md p-4 flex items-center justify-between cursor-pointer ${
                  selectedPackage === 'Voice Call' && 'border border-blue-500'
                }`}
                onClick={() => handlePackageSelection('Voice Call')}
              >
                <div>
                  <BsTelephone size={24} />
                  <div>
                    <h3 className="text-lg font-bold">Voice Call</h3>
                    <p className='text-blue-900'>Voice call with doctor</p>
                  </div>
                </div>
                <p className='font-bold'>$40</p>
              </div>

              {/* Video Call Package */}
              <div 
                className={`bg-blue-100 rounded-lg shadow-md p-4 flex items-center justify-between cursor-pointer ${
                  selectedPackage === 'Video Call' && 'border border-blue-500'
                }`}
                onClick={() => handlePackageSelection('Video Call')}
              >
                <div>
                  <BsCameraVideo size={24} />
                  <div>
                    <h3 className="text-lg font-bold">Video Call</h3>
                    <p className='text-blue-900'>Video call with doctor</p>
                  </div>
                </div>
                <p className='font-bold'>$80</p>
              </div>

              {/* In Person Package */}
              <div 
                className={`bg-blue-100 rounded-lg shadow-md p-4 flex items-center justify-between cursor-pointer ${
                  selectedPackage === 'In Person' && 'border border-blue-500'
                }`}
                onClick={() => handlePackageSelection('In Person')}
              >
                <div>
                  <BsPerson size={24} />
                  <div>
                    <h3 className="text-lg font-bold">In Person</h3>
                    <p className='text-blue-900'>In person with doctor</p>
                  </div>
                </div>
                <p className='font-bold'>$120</p>
              </div>
            </div>
          </div>
        
          {/* Book Appointment Button */}
          <div className="flex justify-between mb-4">
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
              <label htmlFor="name" className="block mb-2">Name</label>
              <input type="text" required id="name" name="patientName" value={patientDetails.patientName} onChange={handleInputChange} className="border rounded-lg px-4 py-2 w-full" />
            </div>
            <div className="mb-6">
              <label htmlFor="age" className="block mb-2">Age</label>
              <input type="text" required id="age" name="patientAge" value={patientDetails.patientAge} onChange={handleInputChange} className="border rounded-lg px-4 py-2 w-full" />
            </div>
            <div className="mb-6">
              <label htmlFor="phoneNumber" className="block mb-2">Phone Number</label>
              <input type="text" required id="phoneNumber" name="patientNumber" value={patientDetails.patientNumber} onChange={handleInputChange} className="border rounded-lg px-4 py-2 w-full" />
            </div>
            <div className="mb-6">
              <label htmlFor="problem" className="block mb-2">Problem</label>
              <input id="problem" required name="patientProblem" value={patientDetails.patientProblem} onChange={handleInputChange} className="border rounded-lg px-4 py-2 w-full" />
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
