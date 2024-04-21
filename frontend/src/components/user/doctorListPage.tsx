import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosJWT from '../../utils/axiosService';
import { USER_API } from '../../constants';

const DoctorListingPage: React.FC = () => {
  const [doctors, setDoctors] = useState<any[]>([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axiosJWT.get(`${USER_API}/doctors`);
        // Filter doctors with status approved
        const approvedDoctors = response.data.doctors.filter((doctor: { status: string; }) => doctor.status === 'approved');
        setDoctors(approvedDoctors);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Find a Doctor</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {doctors.map((doctor) => (
          <Link key={doctor._id} to={`/user/doctor/${doctor._id}`}>
            <div className="bg-gray-100 shadow-md rounded-lg p-6 cursor-pointer flex flex-col justify-center items-center">
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
    </div>
  );
};

export default DoctorListingPage;
