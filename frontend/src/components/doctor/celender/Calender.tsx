import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { DOCTOR_API } from "../../../constants";
import showToast from "../../../utils/toaster";
import axiosJWT from "../../../utils/axiosService";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/reducer/reducer";
import { RRule } from 'rrule';
import moment from "moment";

interface TimeSlot {
  start: string;
  end: string;
}

interface SelectedTimeSlots {
  [key: number]: TimeSlot[];
}

interface ScheduledSlot {
  _id: string;
  startDate: string;
  endDate: string;
  slots: DaySlot[];
}

interface DaySlot {
  _id: string;
  day: number;
  times: TimeSlot[];
}

const DoctorCalendar: React.FC = () => {
  const [selectedStartDate, setSelectedStartDate] = useState<string | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<string | null>(null);
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [selectedSlots, setSelectedSlots] = useState<TimeSlot[]>([]);
  const [scheduledSlots, setScheduledSlots] = useState<ScheduledSlot[]>([]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<SelectedTimeSlots>({});
  const [editingSlot, setEditingSlot] = useState<{ day: number, index: number } | null>(null);
  const [editedTimeSlot, setEditedTimeSlot] = useState<TimeSlot | null>(null);

  const doctor = useSelector((state: RootState) => state.DoctorSlice);

  const daysOfWeek = [
    { day: 0, label: "Sunday" },
    { day: 1, label: "Monday" },
    { day: 2, label: "Tuesday" },
    { day: 3, label: "Wednesday" },
    { day: 4, label: "Thursday" },
    { day: 5, label: "Friday" },
    { day: 6, label: "Saturday" },
  ];

  const generateTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    for (let i = 9; i <= 17; i++) {
      const startHour = i > 12 ? i - 12 : i;
      const endHour = i + 1 > 12 ? i - 11 : i + 1;
      const period = i >= 12 ? "PM" : "AM";
      const nextPeriod = i + 1 >= 12 ? "PM" : "AM";
      slots.push({ start: `${startHour}:00 ${period}`, end: `${endHour}:00 ${nextPeriod}` });
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosJWT.post(`${DOCTOR_API}/getTimeSlots`, {
          doctorId: doctor.id,
        });

        console.log(response, "response");
        if (response) {
          setScheduledSlots(response.data.timeSlots);
        }
      } catch (error) {
        console.log(error, "error");
      }
    };
    fetchData();
  }, [doctor.id]);

  const handleSlotSelect = (slot: TimeSlot) => {
    setSelectedSlots((prev) => {
      if (prev.some((s) => s.start === slot.start && s.end === slot.end)) {
        return prev.filter((s) => s.start !== slot.start || s.end !== slot.end);
      } else {
        return [...prev, slot];
      }
    });
  };

  const handleDaySelect = (day: number) => {
    setSelectedDays((prev) => {
      if (prev.includes(day)) {
        return prev.filter((d) => d !== day);
      } else {
        return [...prev, day];
      }
    });
  };

  const handleConfirmSlots = () => {
    if (selectedStartDate && selectedEndDate && selectedSlots.length > 0 && selectedDays.length > 0) {
      const updatedSlots: SelectedTimeSlots = { ...selectedTimeSlots };
      
      const rule = new RRule({
        freq: RRule.WEEKLY,
        dtstart: new Date(selectedStartDate),
        until: new Date(selectedEndDate),
        byweekday: selectedDays,
      });
      const dates = rule.all();

      dates.forEach((date) => {
        const day = date.getDay();
        if (!updatedSlots[day]) {
          updatedSlots[day] = [];
        }
        selectedSlots.forEach((slot) => {
          if (!updatedSlots[day].some((s) => s.start === slot.start && s.end === slot.end)) {
            updatedSlots[day].push(slot);
          }
        });
      });

      setSelectedTimeSlots(updatedSlots);
      setSelectedSlots([]);
      setSelectedDays([]);
    } else {
      toast.warn("Please select start date, end date, days, and time slots.");
    }
  };

  const handleDelete = (day: number, index: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedTimeSlots: SelectedTimeSlots = { ...selectedTimeSlots };
        updatedTimeSlots[day].splice(index, 1);
        if (updatedTimeSlots[day].length === 0) {
          delete updatedTimeSlots[day];
        }
        setSelectedTimeSlots(updatedTimeSlots);

        Swal.fire("Deleted!", "Your time slot has been deleted.", "success");
      }
    });
  };

  const handleConfirmAvailableSlots = async () => {
    const doctorId = doctor.id;
    try {
      const slotsData = {
        doctorId,
        startDate: selectedStartDate,
        endDate: selectedEndDate,
        slotTime: selectedTimeSlots,
      };
      const response = await axiosJWT.post(`${DOCTOR_API}/addSlot`, slotsData);
      if (response) {
        showToast("Slots added successfully!", "success");
        setSelectedSlots([]);
        setSelectedEndDate(null);
        setSelectedStartDate(null);
        setSelectedDays([]);
        setSelectedTimeSlots({});
      }
    } catch (error) {
      toast.error("Failed to save slots. Please try again.");
    }
  };

  const handleDeleteScheduled = async (_id: string) => {
    try {
      await axiosJWT.delete(`${DOCTOR_API}/deleteSlot/${_id}`);
      setScheduledSlots((prev) => prev.filter((slot) => slot._id !== _id));
      Swal.fire("Deleted!", "Your time slot has been deleted.", "success");
    } catch (error) {
      toast.error("Failed to delete slot. Please try again.");
    }
  };

  const handleEdit = (day: number, index: number) => {
    setEditingSlot({ day, index });
    setEditedTimeSlot(selectedTimeSlots[day][index]);
  };

  const handleEditedTimeSlotChange = (field: 'start' | 'end', value: string) => {
    setEditedTimeSlot((prev) => prev ? { ...prev, [field]: value } : null);
  };

  const handleSaveEdit = () => {
    if (editingSlot && editedTimeSlot) {
      const updatedTimeSlots = { ...selectedTimeSlots };
      updatedTimeSlots[editingSlot.day][editingSlot.index] = editedTimeSlot;
      setSelectedTimeSlots(updatedTimeSlots);
      setEditingSlot(null);
      setEditedTimeSlot(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingSlot(null);
    setEditedTimeSlot(null);
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row bg-blue-100">
          <div className="w-full md:w-1/2 p-4">
            <div className="mb-4">
              <label className="block mb-2">Start Date:</label>
              <input
                type="date"
                className="w-full p-2 border rounded"
                value={selectedStartDate || ""}
                onChange={(e) => setSelectedStartDate(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">End Date:</label>
              <input
                type="date"
                className="w-full p-2 border rounded"
                value={selectedEndDate || ""}
                onChange={(e) => setSelectedEndDate(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <h2 className="text-lg font-bold mb-2">Select Days</h2>
              <div className="grid grid-cols-3 gap-2">
                {daysOfWeek.map((day) => (
                  <button
                    key={day.day}
                    className={`p-2 border rounded ${selectedDays.includes(day.day) ? "bg-blue-500 text-white" : "bg-white"}`}
                    onClick={() => handleDaySelect(day.day)}
                  >
                    {day.label}
                  </button>
                ))}
              </div>
            </div>
            {selectedDays.length > 0 && (
              <div className="mb-4">
                <h2 className="text-lg font-bold mb-2">Select Time Slots</h2>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((slot, index) => (
                    <button
                      key={index}
                      className={`p-2 border rounded ${selectedSlots.some((s) => s.start === slot.start && s.end === slot.end) ? "bg-blue-500 text-white" : "bg-white"}`}
                      onClick={() => handleSlotSelect(slot)}
                    >
                      {slot.start} - {slot.end}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="text-center">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleConfirmSlots}>
                Save Slots
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/2 p-4">
            <h2 className="text-xl font-semibold mb-4">Selected Slots</h2>
            {Object.keys(selectedTimeSlots).length === 0 ? (
              <p>No slots selected.</p>
            ) : (
              <div>
                {Object.entries(selectedTimeSlots).map(([day, slots]) => (
                  <div key={day} className="mb-4">
                    <h3 className="font-bold">{daysOfWeek.find((d) => d.day.toString() === day)?.label}</h3>
                    <ul>
                      {slots.map((slot:any, index:any) => (
                        <li key={index} className="flex justify-between items-center">
                          <span>{slot.start} - {slot.end}</span>
                          <div>
                            <button
                              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 mb-1 px-2 rounded mr-2"
                              onClick={() => handleEdit(Number(day), index)}
                            >
                              Edit
                            </button>
                            <button
                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 mb-1 px-2 rounded"
                              onClick={() => handleDelete(Number(day), index)}
                            >
                              Delete
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {editingSlot && editedTimeSlot && (
          <div className="mt-4 p-4 bg-gray-100 border rounded">
            <h3 className="font-bold mb-2">Edit Time Slot</h3>
            <div className="mb-2">
              <label className="block mb-1">Start Time:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={editedTimeSlot.start}
                onChange={(e) => handleEditedTimeSlotChange('start', e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1">End Time:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={editedTimeSlot.end}
                onChange={(e) => handleEditedTimeSlotChange('end', e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={handleSaveEdit}
              >
                Save
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        <div className="flex justify-center mt-4">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleConfirmAvailableSlots}
          >
            Confirm Available Slots
          </button>
        </div>
      </div>

      {/* Already Scheduled Slots */}
      <div className="mt-10">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800">Already Scheduled Slots</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {scheduledSlots.map((slot) => (
            <div key={slot._id} className="bg-blue-100 border border-blue-300 shadow-lg rounded-lg p-6 ml-16 mb-8">
              <div className="flex justify-end mb-4">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDeleteScheduled(slot._id)}
                >
                  Delete
                </button>
              </div>
              <p className="text-black mb-2">
                Start Date:{" "}
                <strong className="text-red-900 text-xl">
                  {moment(slot.startDate).format("MMM D, YYYY")}
                </strong>
              </p>
              <p className="text-black mb-2">
                End Date:{" "}
                <strong className="text-red-900 text-xl">
                  {moment(slot.endDate).format("MMM D, YYYY")}
                </strong>
              </p>
              <ul className="list-disc list-inside">
                {slot.slots.map((daySlot) => (
                  <div key={daySlot._id} className="mb-4">
                    <h3 className="font-bold">
                      {daysOfWeek.find((d) => d.day === daySlot.day)?.label}
                    </h3>
                    {daySlot.times.map((time, index) => (
                      <li key={index} className="text-gray-600">
                        {time.start} - {time.end}
                      </li>
                    ))}
                  </div>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DoctorCalendar;
