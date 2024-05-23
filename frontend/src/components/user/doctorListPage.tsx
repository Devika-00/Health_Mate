import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosJWT from "../../utils/axiosService";
import { USER_API } from "../../constants";
import { FaCalendarAlt, FaSearch } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DoctorListingPage: React.FC = () => {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchActive, setSearchActive] = useState<boolean>(false);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [selectedConsultationType, setSelectedConsultationType] =
    useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [departments, setDepartments] = useState<string[]>([
    "Cardiologist",
    "Neurologist",
    "Dermatologist",
    "Gynecologist",
    "Physician",
    "Radiologist",
    "Dentist",
    "Psychiatrists",
    "Allergist",
  ]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(8);

  console.log(doctors);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axiosJWT.get(`${USER_API}/doctors`);
        const fetchedDoctors = response.data.doctors;

        // Fetch all timeslots once
        const timeslotResponse = await axiosJWT.get(`${USER_API}/timeslots`);
        const allTimeslots = timeslotResponse.data.timeslots;

        const doctorsWithTimeslots = fetchedDoctors.map(
          (doctor: { _id: any }) => {
            // Filter timeslots for this doctor
            const doctorTimeslots = allTimeslots.filter(
              (timeslot: { doctorId: any }) => timeslot.doctorId === doctor._id
            );
            return {
              ...doctor,
              slotTimes: doctorTimeslots,
            };
          }
        );

        // Filter doctors based on search query and selected department
        let filteredDoctors = doctorsWithTimeslots.filter(
          (doctor: {
            status: string;
            doctorName: string;
            consultationType: string;
          }) =>
            doctor.status === "approved" &&
            (doctor.consultationType === "online" ||
              doctor.consultationType === "both" ||
              doctor.consultationType === "offline") &&
            doctor.doctorName.toLowerCase().includes(searchQuery.toLowerCase())
        );

        // Apply additional filtering by department if a department is selected
        if (selectedDepartment !== "") {
          filteredDoctors = filteredDoctors.filter(
            (doctor: { department: string }) =>
              doctor.department === selectedDepartment
          );
        }

        if (selectedDate) {
          filteredDoctors = filteredDoctors.filter(
            (doctor: { slotTimes: any[] }) =>
              doctor.slotTimes.some((slot) => {
                const startDate = new Date(slot.startDate);
                const endDate = new Date(slot.endDate);
                const selectedDateObj = new Date(selectedDate);

                // Check if selected date is between start date and end date
                return (
                  startDate <= selectedDateObj && selectedDateObj <= endDate
                );
              })
          );
        }

        if (selectedTimeSlot !== "") {
          // Filter doctors based on their available time slots matching the selected time slot
          filteredDoctors = fetchedDoctors.filter((doctor: { _id: any }) => {
            const doctorTimeslots = allTimeslots.filter(
              (timeslot: { doctorId: any }) => timeslot.doctorId === doctor._id
            );
            return doctorTimeslots.some(
              (slot: { slotTime: string | string[] }) =>
                slot.slotTime.includes(selectedTimeSlot)
            );
          });
        }

        setDoctors(filteredDoctors);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, [
    searchQuery,
    selectedDepartment,
    selectedConsultationType,
    selectedDate,
    selectedTimeSlot,
  ]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchIconClick = () => {
    setSearchActive(!searchActive);
  };

  const handleDepartmentChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedDepartment(event.target.value);
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleTimeSlotChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedTimeSlot(event.target.value);
  };

  //   const handleConsultationTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   const selectedValue = event.target.value;
  //   setSelectedConsultationType(selectedValue);

  //   // Filter doctors based on selected consultation type
  //   let filteredDoctors = doctors.filter((doctor) => {
  //     if (selectedValue === "") {
  //       // If no specific consultation type selected, show all doctors
  //       return true;
  //     } else if (selectedValue=== "both") {
  //       // Show doctors with consultation type both
  //       return doctor.consultationType === "both";
  //     } else if(selectedValue === "online"){
  //       // Show doctors with selected consultation type
  //       return doctor.consultationType === "online";
  //     }else if(selectedValue === "offline"){
  //       return doctor.consultationType === "offline"
  //     }
  //   });
  //   setDoctors(filteredDoctors);
  // };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDoctors = doctors.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Find a Doctor</h1>
      <div className="flex items-center mb-4">
        <div
          className={`border border-${
            searchActive ? "gray-300" : "gray-500"
          } shadow-lg flex items-center relative rounded-md w-80`}
        >
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            className="rounded-md px-4 py-2 w-full"
          />
          <div
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-700 cursor-pointer"
            onClick={handleSearchIconClick}
          >
            <FaSearch />
          </div>
        </div>
        <div
          className={`border border-gray-500 shadow-lg rounded-md w-80 ml-4`}
        >
          <select
            className="rounded-md px-4 py-2 w-full"
            value={selectedDepartment}
            onChange={handleDepartmentChange}
          >
            <option value="">All Departments</option>
            {/* Render options from the departments array */}
            {departments.map((department, index) => (
              <option key={index} value={department}>
                {department}
              </option>
            ))}
          </select>
        </div>
        {/* <div className={`border border-gray-500 shadow-lg rounded-md w-80 ml-4`}>
          <select className="rounded-md px-4 py-2 w-full" value={selectedConsultationType} onChange={handleConsultationTypeChange}>
            <option value="">All Consultation Types</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
            <option value="both">Both</option>
          </select>
        </div> */}

        <div className="border border-gray-500 shadow-lg rounded-md ml-3 w-80">
          <select
            className="rounded-md px-4 py-2 w-full"
            value={selectedTimeSlot}
            onChange={handleTimeSlotChange}
          >
            <option value="">Select Time Slot</option>
            <option value="9:00 AM - 10:00 AM">9:00 AM - 10:00 AM</option>
            <option value="11:30 AM - 12:30 PM">11:30 AM - 12:30 PM</option>
            <option value="10:15 AM - 11:15 AM">10:15 AM - 11:15 AM</option>
            <option value="12:45 PM - 1:45 PM">12:45 PM - 1:45 PM</option>
            <option value="3:15 PM - 4:15 PM">3:15 PM - 4:15 PM</option>
            <option value="2:00 PM - 3:00 PM">2:00 PM - 3:00 PM</option>
            <option value="4:30 PM - 5:30 PM">4:30 PM - 5:30 PM</option>
          </select>
        </div>
        <div className="border border-gray-500 shadow-lg rounded-md ml-3 w-40 relative ">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            className="rounded-md px-4 py-2 w-full pl-10 "
            minDate={new Date()}
            placeholderText="Select Date"
          />
          <div className="absolute top-3 left-2 text-gray-700">
            <FaCalendarAlt />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {currentDoctors.map((doctor) => (
          <Link key={doctor._id} to={`/user/doctor/${doctor._id}`}>
            <div className="bg-gray-300 shadow-md rounded-lg p-6 cursor-pointer flex flex-col justify-center items-center">
              <img
                src={doctor.profileImage}
                alt="Doctor"
                className="w-64 h-64 mx-auto rounded mb-4"
              />
              <h2 className="text-xl font-semibold text-center mb-2">
                {doctor.doctorName}
              </h2>
              <p className="text-gray-600 text-m font-medium text-center mb-2">
                {doctor.department}
              </p>
              <button className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mt-3">
                Book Appointment
              </button>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-10 flex justify-center">
        <ul className="flex pl-0 list-none rounded my-2">
          {Array.from(
            { length: Math.ceil(doctors.length / itemsPerPage) },
            (_, index) => (
              <li key={index}>
                <button
                  className={`${
                    currentPage === index + 1
                      ? "bg-blue-900 text-white"
                      : "text-blue-900 hover:text-blue-700"
                  } cursor-pointer px-3 py-2`}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            )
          )}
        </ul>
      </div>
      <div className="flex justify-center mt-4">
        {currentPage !== Math.ceil(doctors.length / itemsPerPage) && (
          <button
            className="bg-blue-900 text-white py-2 px-4 rounded"
            onClick={() => paginate(currentPage + 1)}
          >
            Next Page
          </button>
        )}
      </div>
    </div>
  );
};

export default DoctorListingPage;
