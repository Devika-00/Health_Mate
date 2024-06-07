import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosJWT from "../../utils/axiosService";
import { USER_API } from "../../constants";
import { FaSearch, FaCalendarAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Interface for TimeSlot
interface TimeSlot {
  start: string;
  end: string;
}

// Function to generate time slots
const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  for (let i = 9; i <= 17; i++) {
    const startHour = i > 12 ? i - 12 : i;
    const endHour = i + 1 > 12 ? i - 11 : i + 1;
    const period = i >= 12 ? "PM" : "AM";
    const nextPeriod = i + 1 >= 12 ? "PM" : "AM";
    slots.push({
      start: `${startHour}:00 ${period}`,
      end: `${endHour}:00 ${nextPeriod}`,
    });
  }
  return slots;
};

const OfflineDoctors: React.FC = () => {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchActive, setSearchActive] = useState<boolean>(false);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [departments, setDepartments] = useState<
    {
      _id: string;
      departmentName: string;
      isListed: boolean;
      createdAt: string;
      updatedAt: string;
    }[]
  >([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(8);
  const [totalDoctors, setTotalDoctors] = useState<number>(0);
  const [filtersUsed, setFiltersUsed] = useState<boolean>(false);

  const timeSlots = generateTimeSlots();

  useEffect(() => {
    const fetchDoctorDepartments = async () => {
      try {
        const response = await axiosJWT.get(`${USER_API}/departments`);
        if (response.data.success) {
          const listedDepartments = response.data.allDepartment.filter(
            (department: any) => department.isListed
          );
          setDepartments(listedDepartments);
        } else {
          throw new Error("Failed to fetch department details");
        }
      } catch (error) {
        console.error("Error fetching department details:", error);
      }
    };

    fetchDoctorDepartments();
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const departmentNames = departments.map(
          (department) => department.departmentName
        );

        const response = await axiosJWT.get(`${USER_API}/doctors`, {
          params: {
            searchQuery,
            department: selectedDepartment,
            selectedDate: selectedDate ? selectedDate.toISOString() : null,
            selectedTimeSlot,
            page: currentPage,
            limit: itemsPerPage,
          },
        });

        const filteredDoctors = response.data.doctors.filter(
          (doctor: any) =>
            (doctor.consultationType === "offline" ||
              doctor.consultationType === "both") &&
            departmentNames.includes(doctor.department)
        );

        setDoctors(filteredDoctors);
        setTotalDoctors(filteredDoctors.length);
        setFiltersUsed(
          // Update the state to indicate filters are being used
          searchQuery !== "" ||
            selectedDepartment !== "" ||
            selectedDate !== null ||
            selectedTimeSlot !== ""
        );
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    if (departments.length > 0) {
      fetchDoctors();
    }
  }, [
    searchQuery,
    selectedDepartment,
    selectedDate,
    selectedTimeSlot,
    currentPage,
    itemsPerPage,
    departments,
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

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedDepartment("");
    setSelectedDate(null);
    setSelectedTimeSlot("");
    setCurrentPage(1); // reset to first page
    setFiltersUsed(false);
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Find a Doctor</h1>
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-between mb-4">
        {/* Search Input */}
        <div className="relative mb-4 md:mb-0 w-full md:w-1/3">
          {/* Input Field */}
          <div
            className={`border border-${
              searchActive ? "gray-300" : "gray-500"
            } shadow-lg flex items-center relative rounded-md w-full`}
          >
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
              className="rounded-md px-4 py-2 w-full"
            />
            {/* Search Icon */}
            <div
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-700 cursor-pointer"
              onClick={handleSearchIconClick}
            >
              <FaSearch />
            </div>
          </div>
        </div>
        {/* Department Dropdown */}
        <div className="border border-gray-500 shadow-lg rounded-md w-full md:w-1/3 mx-0 md:mx-4 mb-4 md:mb-0">
          <select
            className="rounded-md px-4 py-2 w-full"
            value={selectedDepartment}
            onChange={handleDepartmentChange}
          >
            <option value="">All Departments</option>
            {departments.map((department) => (
              <option
                key={department._id}
                className="text-gray-700"
                value={department.departmentName}
              >
                {department.departmentName}
              </option>
            ))}
          </select>
        </div>
        {/* Time Slot Dropdown */}
        <div className="border border-gray-500 shadow-lg rounded-md w-full md:w-1/3 mx-0 md:mx-4 mb-4 md:mb-0">
          <select
            className="rounded-md px-4 py-2 w-full"
            value={selectedTimeSlot}
            onChange={handleTimeSlotChange}
          >
            <option value="">Select Time Slot</option>
            {timeSlots.map((slot, index) => (
              <option key={index} value={`${slot.start} - ${slot.end}`}>
                {slot.start} - {slot.end}
              </option>
            ))}
          </select>
        </div>
        {/* Date Picker */}
        <div className="border border-gray-500 shadow-lg rounded-md w-full md:w-1/3 mx-0 md:mx-4 relative">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            className="rounded-md px-4 py-2 w-full pl-10"
            minDate={new Date()}
            placeholderText="Select Date"
          />
          <div className="absolute top-3 left-2 text-gray-700">
            <FaCalendarAlt />
          </div>
        </div>
        {/* Clear Filters Button */}
        {filtersUsed && (
          <button
            className="ml-4 mt-2 bg-blue-900 hover:bg-blue-800 text-white rounded-md px-4 py-2"
            onClick={handleClearFilters}
          >
            Clear Filters
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {doctors.map((doctor) => (
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
            { length: Math.ceil(totalDoctors / itemsPerPage) },
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
        {currentPage > 1 && (
          <button
            className="bg-blue-900 text-white py-2 px-4 rounded"
            onClick={() => paginate(currentPage - 1)}
          >
            Previous Page
          </button>
        )}
        {doctors.length === itemsPerPage && totalDoctors > itemsPerPage && (
          <button
            className="bg-blue-900 text-white py-2 px-4 rounded ml-4"
            onClick={() => paginate(currentPage + 1)}
          >
            Next Page
          </button>
        )}
      </div>
    </div>
  );
}

export default OfflineDoctors;
