import React, { useEffect, useState } from "react";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { toast } from "react-toastify";
import SmallCalendar from "../celender/SmallCalender";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import "./c.css";
import Button from "@mui/material/Button";
import axiosJWT from "../../../utils/axiosService";
import { useNavigate } from "react-router-dom";
import DoctorSlice from "../../../redux/slices/DoctorSlice";
import { RootState } from "../../../redux/reducer/reducer";
import { DOCTOR_API } from "../../../constants";
import showToast from "../../../utils/toaster";
import { error } from "console";

const DoctorCalendar: React.FC = () => {
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const [alreadyScheduledSlotes, setAlreadyScheduledSlotes] = useState<any[]>([]);
  const [selectedSlots, setSelectedSlots] = useState<any[]>([]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
  const doctor = useSelector((state: RootState) => state.DoctorSlice);
  const navigate = useNavigate();


  const doctorId:any=doctor.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosJWT.post(`${DOCTOR_API}/getTimeSlots`, doctorId);
        if (response) {
          setAlreadyScheduledSlotes(response.data.timeSlots);
        }
      } catch (error) {
        console.log(error, "error");
      }
    };
    fetchData();
  }, [navigate]);

  const handleDeleteForScheduledSlot = async (slotId: string) => {
    try {
      const response = await axiosJWT.delete(`${DOCTOR_API}/deleteSlot/${slotId}`);
      if(response){
       
      }
    } catch (error) {}
  };

  const handleConfirmSlots = () => {
    if (selectedStartDate && selectedEndDate && selectedSlots.length > 0) {
      const newSlots = selectedSlots.map((slot) => {
        const newSlot = `${moment(slot.start).format("h:mm A")} - ${moment(
          slot.end
        ).format("h:mm A")}`;
        return newSlot;
      });

      const filteredNewSlots = newSlots.filter(
        (newSlot) => !selectedTimeSlots.includes(newSlot)
      );

      setSelectedSlots((prevSlots) =>
        prevSlots.filter((prevSlot) => !filteredNewSlots.includes(prevSlot))
      );

      setSelectedTimeSlots((prevSlots) => [...prevSlots, ...filteredNewSlots]);
    } else {
      toast.warn("Please select a start date, end date, and time slots.");
    }
  };

  const timeSlots: { start: Date; end: Date }[] = [];

  const startTime = new Date(2023, 3, 1, 9, 0); // 9 AM
  const endTime = new Date(2023, 3, 1, 18, 0); // 6 PM

  let currentTime = startTime;
  while (currentTime < endTime) {
    const slotStart = new Date(currentTime);
    const slotEnd = new Date(currentTime);
    slotEnd.setMinutes(slotStart.getMinutes() + 60); // 1 hour slot for consultation

    if (slotEnd <= endTime) {
      timeSlots.push({ start: slotStart, end: slotEnd });
    }

    currentTime = new Date(slotEnd);
    currentTime.setMinutes(currentTime.getMinutes() + 15); // 15 minutes break
  }

  const handleSlotSelect = (slot: any) => {
    setSelectedSlots((prevSlots) => {
      if (prevSlots.some((s) => s.start.getTime() === slot.start.getTime())) {
        return prevSlots.filter(
          (s) => s.start.getTime() !== slot.start.getTime()
        );
      } else {
        return [...prevSlots, slot];
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
      if (slotsData.slotTime.length == 0) {
        showToast("Add Atleast One Slot","error");
      } else {
        if (response) {
          showToast("Slot Added Succesfully","success");
          setSelectedSlots([]);
          setSelectedEndDate(null);
          setSelectedStartDate(null);
        }
      }
    } catch (error) {
      console.error("Error in saving the slots to the backend:", error);
    }
  };

  const handleDelete = (index: any) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result: any) => {
      if (result.isConfirmed) {
        // Remove the slot from selectedTimeSlots
        const updatedTimeSlots = [...selectedTimeSlots];
        updatedTimeSlots.splice(index, 1);
        setSelectedTimeSlots(updatedTimeSlots);
  
        // Remove the slot from selectedSlots
        const updatedSlots = [...selectedSlots];
        updatedSlots.splice(index, 1);
        setSelectedSlots(updatedSlots);
  
        Swal.fire("Deleted!", "Your time slot has been deleted.", "success");
      } else {
        Swal.fire("Error", "Deletion failed. Please try again.", "error");
      }
    });
  };
  

  return (
    <div className="">
      <div className="mx-auto p-4 flex bg-blue-100">
        <div className="w-1/2 pr-8 pl-8   flex justify-center items-center  ">
          <div className="mb-4">
            <div className="mb-4 p-10">
              <SmallCalendar
                selectedStartDate={selectedStartDate}
                selectedEndDate={selectedEndDate}
                setSelectedStartDate={setSelectedStartDate}
                setSelectedEndDate={setSelectedEndDate}
              />
              <div className="p-4">
                <h2 className="text-lg font-bold mb-2">Select Time Slots</h2>
                <div className="space-y-2 p-6 ">
                  {timeSlots.map((slot, index) => (
                    <button
                      key={index}
                      className={`checkbox-button ${
                        selectedSlots.some(
                          (s) => s.start.getTime() === slot.start.getTime()
                        ) && "selected"
                      }`}
                      onClick={() => handleSlotSelect(slot)}
                    >
                      <span className="text-xl">
                        {moment(slot.start).format("h:mm A")} -{" "}
                        {moment(slot.end).format("h:mm A")}
                      </span>
                    </button>
                  ))}
                </div>
              </div>    
            </div>
            <div className=" rounded-lg  text-center">
              <button
                className="bg-blue-950 hover:bg-blue-900 text-white font-bold py-2 px-8 rounded "
                onClick={handleConfirmSlots}
              >
                Save Date And Time
              </button>
            </div>
          </div>
        </div>

        <div className="w-1/2 pl-4 p-10">
          <h2 className="text-xl font-semibold mb-2 text-rose-800">
            Selected Date:
          </h2>
          {selectedStartDate && selectedEndDate ? (
            <p className="mb-4">
              {`${moment(selectedStartDate).format("MMM D, YYYY")} - ${moment(
                selectedEndDate
              ).format("MMM D, YYYY")}`}
            </p>
          ) : (
            "No date Scheduled"
          )}

          <div className="overflow-x-auto ">
            <table className="table-auto w-full border-collapse">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-rose-500 text-center">
                    Time Slot
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedTimeSlots.map((slot, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2 text-center">{slot}</td>

                    <td className="px-4 py-2 flex items-center">
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <br />
          <br />
          <div className="flex justify-center">
            <button
              className="bg-blue-950 hover:bg-blue-900 text-white font-bold py-2 px-8 rounded"
              onClick={handleConfirmAvailableSlots}
            >
              Confirm Your Available Slots
            </button>
          </div>
        </div>
      </div>

      <div className="w-auto  h-auto p-10">
        <div className="flex justify-between items-center text-center">
          <h2 className="text-xl font-bold text-gray-800  p-10">
            Already Scheduled Slots
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {alreadyScheduledSlotes && alreadyScheduledSlotes.map((slot) => (
         <div
         key={slot._id}
         className="bg-blue-100 shadow-md rounded-lg p-6 pt-9 relative"
         >
              <div className="  flex justify-end ">
                <div className="text-center">
                <Button variant="outlined" color="error">
                <button onClick={() => handleDeleteForScheduledSlot(slot._id)}>Delete</button>
                </Button>
                </div>
              </div>
              <p className="text-black mb-2">
                Start Date:{" "}
                <strong className="text-red-900 text-xl">
                  {moment(slot.startDate).format("MMM D, YYYY")}
                </strong>
              </p>
              <p className="text-black mb-2">
                End Date:
                <strong className="text-red-900 text-xl">
                  {" "}
                  {moment(slot.endDate).format("MMM D, YYYY")}
                </strong>
              </p>
              <div className="mt-4">
                <p className="text-gray-600 font-semibold">Slot Times:</p>
                <ul className="list-disc list-inside">
                  {slot.slotTime.map((time: string, index: number) => (
                    <li key={index} className="text-gray-600">
                      {time}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorCalendar;
