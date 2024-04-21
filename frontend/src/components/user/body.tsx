import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosJWT from '../../utils/axiosService';
import { USER_API } from '../../constants';

const Body: React.FC = () => {
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
      <h1 className="text-2xl font-bold mb-5">Our Doctors</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {doctors.map((doctor) => (
          <Link key={doctor._id} to={`/user/doctor/${doctor._id}`}>
            <div className="bg-gray-100 rounded-lg shadow-lg flex flex-col justify-center items-center cursor-pointer">
              <img src={doctor.profileImage} alt="Doctor" className="h-72 w-64 object-cover rounded-t-lg mt-7" />
              <div className="p-4 text-center">
                <h2 className="text-lg font-semibold mb-2">{doctor.doctorName}</h2>
                <p className="text-gray-600 mb-2">{doctor.department}</p>
                <p className="text-gray-600 mb-4">{doctor.description}</p>
                <button className="bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-blue-800">Book Appointment</button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
