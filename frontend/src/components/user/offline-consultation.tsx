import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosJWT from '../../utils/axiosService';
import { USER_API } from '../../constants';
import { FaSearch } from 'react-icons/fa';

const OfflineDoctors: React.FC = () => {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchActive, setSearchActive] = useState<boolean>(false);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [departments, setDepartments] = useState<string[]>([
    "Cardilogist",
    "Neurologist",
    "Dermatologist",
    "Gynecologist",
    "Physician",
    "Radiologist",
    "Dentist",
    "Psychiatrists",
    "Allergist"
  ]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(8);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axiosJWT.get(`${USER_API}/doctors`);
        // Filter doctors with status approved and consultation type offline or both
        let filteredDoctors = response.data.doctors.filter(
          (doctor: { status: string; doctorName: string; consultationType: string }) => 
            doctor.status === 'approved' &&
            (doctor.consultationType === 'offline' || doctor.consultationType === 'both') &&
            doctor.doctorName.toLowerCase().includes(searchQuery.toLowerCase())
        );

        // Apply additional filtering by department if a department is selected
        if (selectedDepartment !== '') {
          filteredDoctors = filteredDoctors.filter((doctor: { department: string }) => doctor.department === selectedDepartment);
        }

        setDoctors(filteredDoctors);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, [searchQuery, selectedDepartment]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchIconClick = () => {
    setSearchActive(!searchActive);
  };

  const handleDepartmentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDepartment(event.target.value);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDoctors = doctors.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Find a Doctor</h1>
      <div className="flex items-center mb-4">
        <div className={`border border-${searchActive ? 'gray-300' : 'gray-500'} shadow-lg flex items-center relative rounded-md w-80`}>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            className="rounded-md px-4 py-2 w-full"
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-700 cursor-pointer" onClick={handleSearchIconClick}>
            <FaSearch />
          </div>
        </div>
        <div className={`border border-gray-500 shadow-lg rounded-md w-80 ml-4`}>
          <select className="rounded-md px-4 py-2 w-full" value={selectedDepartment} onChange={handleDepartmentChange}>
            <option value="">All Departments</option>
            {/* Render options from the departments array */}
            {departments.map((department, index) => (
              <option key={index} value={department}>{department}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {currentDoctors.map((doctor) => (
          <Link key={doctor._id} to={`/user/doctor/${doctor._id}`}>
            <div className="bg-gray-300 shadow-md rounded-lg p-6 cursor-pointer flex flex-col justify-center items-center">
              <img src={doctor.profileImage} alt="Doctor" className="w-64 h-64 mx-auto rounded mb-4" />
              <h2 className="text-xl font-semibold text-center mb-2">{doctor.doctorName}</h2>
              <p className="text-gray-600 text-m font-medium text-center mb-2">{doctor.department}</p>
              <button className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mt-3">
                Book Appointment
              </button>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-10 flex justify-center">
        <ul className="flex pl-0 list-none rounded my-2">
          {Array.from({ length: Math.ceil(doctors.length / itemsPerPage) }, (_, index) => (
            <li key={index}>
              <button
                className={`${
                  currentPage === index + 1
                    ? 'bg-blue-900 text-white'
                    : 'text-blue-900 hover:text-blue-700'
                } cursor-pointer px-3 py-2`}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
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

export default OfflineDoctors;
