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
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statusResponse, timeSlotsResponse] = await Promise.all([
          axios.get(`${DOCTOR_API}/status`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
          }),
          fetchTimeSlots(selectedDate)
        ]);

        setIsDoctorApproved(statusResponse.data.doctor.status === 'approved'); // Update here
        setTimeSlots(timeSlotsResponse);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedDate]);

  const fetchTimeSlots = async (date: Date | null) => {
    try {
      if (!date) return [];
      const response = await axios.get(`${DOCTOR_API}/timeslots/${date.toISOString().split('T')[0]}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      return response.data.timeSlots;
    } catch (error) {
      console.error('Error fetching time slots:', error);
      return [];
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  const handleTimeInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeInput(e.target.value);
  };

  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
    setIsDeleteModalOpen(true);
  };

  const handleUploadButtonClick = async () => {
    try {
      const response = await axios.post(
        `${DOCTOR_API}/schedule`,
        {
          time: timeInput,
          date: selectedDate ? selectedDate.toISOString().split('T')[0] : ''
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
        }
      );
      closeModal();
      setTimeSlots([...timeSlots, response.data.newTimeSlot]);
      showToast(response.data.message, 'success');
    } catch (error:any) {
      showToast(error.response.data.message, 'error');
      console.error('Error uploading time:', error);
    }
  };

  const handleDeleteTime = async () => {
    try {
      const selectedTimeSlot = timeSlots.find(timeSlot => timeSlot.time === selectedTime);
      if (!selectedTimeSlot) {
        console.error('Selected time slot not found');
        return;
      }
      const response = await axios.delete(`${DOCTOR_API}/deleteTime/${selectedTimeSlot._id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      closeModal();
      setTimeSlots(timeSlots.filter(timeSlot => timeSlot.time !== selectedTime));
      showToast(response.data.message, "success");
    } catch (error) {
      console.error('Error deleting time:', error);
    }
  };

  const handleAddMoreClick = () => {
    if (isDoctorApproved && selectedDate) {
      openModal();
    } else {
      alert('You need to select a date and be approved to add time slots.');
    }
  };

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 9; hour <= 21; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const period = hour < 12 ? 'AM' : 'PM';
        const formattedHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
        const time = `${formattedHour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${period}`;
        const nextHour = minute === 30 ? (hour === 12 ? 1 : hour + 1) : hour;
        const nextMinute = minute === 30 ? '00' : '30';
        const nextPeriod = nextHour < 12 ? 'AM' : 'PM';
        const nextFormattedHour = nextHour > 12 ? nextHour - 12 : nextHour === 0 ? 12 : nextHour;
        const nextTime = `${nextFormattedHour.toString().padStart(2, '0')}:${nextMinute} ${nextPeriod}`;
        const label = `${time} - ${nextTime}`;
        options.push(
          <option key={time} value={time}>{label}</option>
        );
      }
    }
    return options;
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleSelectClick = async () => {
    if (!selectedDate) return;
    const timeSlots = await fetchTimeSlots(selectedDate);
    setTimeSlots(timeSlots);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Schedule Appointment</h1>
      <div className="bg-gray-100 p-4 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Calendar Section */}
          <div>
            <h2 className="text-xl font-bold mb-4">Select Date</h2>
            <div className="flex">
              <input
                type="date"
                value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
                onChange={e => handleDateChange(new Date(e.target.value))}
                className="border border-gray-300 rounded-md py-2 px-4 mb-4"
              />
              <button onClick={handleSelectClick} className="bg-blue-900 text-white py-1 px-4 rounded-lg ml-2">
                Select
              </button>
            </div>
          </div>

          {/* Time Slots Section */}
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
