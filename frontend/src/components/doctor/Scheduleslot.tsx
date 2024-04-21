import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { DOCTOR_API } from '../../constants';
import showToast from '../../utils/toaster';

const ScheduleAppointmentPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeInput, setTimeInput] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDoctorApproved, setIsDoctorApproved] = useState(false);
  const [timeSlots, setTimeSlots] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch doctor's status and time slots simultaneously
        const [statusResponse, timeSlotsResponse] = await Promise.all([
          axios.get(`${DOCTOR_API}/status`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
          }),
          axios.get(`${DOCTOR_API}/timeslots`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
          })
        ]);

        // Update state with doctor status
        setIsDoctorApproved(statusResponse.data.doctor.status);
        
        // Update state with time slots
        setTimeSlots(timeSlotsResponse.data.timeSlots);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  const handleTimeInputChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setTimeInput(e.target.value);
  };

  const handleTimeClick = (time: React.SetStateAction<string>) => {
    setSelectedTime(time);
    setIsDeleteModalOpen(true); // Open the delete modal
  };

  const handleUploadButtonClick = async () => {
    try {
      // Make a request to save the time slot
      const response = await axios.post(DOCTOR_API + "/schedule", { time: timeInput }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      closeModal();
      // Update the state with the new time slot data
      console.log(response);
      setTimeSlots([...timeSlots, response.data.newTimeSlot]);
      showToast(response.data.message, "success");
    } catch (error: any) {
        showToast(error.response.data.message,"error" )
      console.error('Error uploading time:', error);
    }
  };
  

  const handleDeleteTime = () => {
    // Implement functionality for deleting time
    console.log('Time deleted:', selectedTime);
    closeModal();
  };

  const handleAddMoreClick = () => {
    if (isDoctorApproved) {
      openModal();
    } else {
      alert('You need to be approved to add time slots.');
    }
  };

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const nextHour = minute === 30 ? hour + 1 : hour;
        const nextMinute = minute === 30 ? '00' : '30';
        const nextTime = `${nextHour.toString().padStart(2, '0')}:${nextMinute}`;
        const label = `${time} - ${nextTime}`;
        options.push(
          <option key={time} value={time}>{label}</option>
        );
      }
    }
    return options;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Schedule Appointment</h1>
      <div className="bg-gray-100 p-4 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Morning, Afternoon, and Evening Section */}
          <div className="bg-blue-100 p-4 rounded-lg">
            <div className="flex justify-between mb-4 items-center">
              <h2 className="text-xl font-bold flex items-center">
                Time Slot 
              </h2>
              <button onClick={handleAddMoreClick} className="bg-blue-900 text-white py-2 px-4 rounded-lg">
                + Add More
              </button>
            </div>
            <div className="flex flex-col space-y-4">
              {timeSlots.map((timeSlot) => (
                <p className="text-lg" key={timeSlot._id}>
                  <span
                    className="rounded-full bg-blue-300 text-white px-2 py-1 cursor-pointer"
                    onClick={() => handleTimeClick(timeSlot.time)}
                  >
                    {timeSlot.time}
                  </span>
                </p>
              ))}
            </div>
          </div>
          {/* Add similar sections for Afternoon and Evening */}
          {/* You can reuse the code above and just change the background color and icons */}
        </div>
      </div>

      {/* Enter Time Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-25"
      >
        <div className="bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Add Time Slot</h2>
          <select
            value={timeInput}
            onChange={handleTimeInputChange}
            className="w-full border border-gray-300 rounded-md py-2 px-4 mb-4"
          >
            <option value="">Select a time</option>
            {generateTimeOptions()}
          </select>
          <button
            onClick={handleUploadButtonClick}
            className="bg-blue-900 text-white py-2 px-4 rounded-lg mr-2"
          >
            Upload
          </button>
          <button onClick={closeModal} className="bg-gray-400 text-white py-2 px-4 rounded-lg">
            Cancel
          </button>
        </div>
      </Modal>


      {/* Delete Time Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-25"
      >
        <div className="bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Delete Time</h2>
          <p className="text-lg mb-4">Selected Time: {selectedTime}</p>
          <button
            onClick={handleDeleteTime}
            className="bg-red-500 text-white py-2 px-4 rounded-lg mr-2"
          >
            Delete
          </button>
          <button onClick={closeModal} className="bg-gray-400 text-white py-2 px-4 rounded-lg">
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ScheduleAppointmentPage;
