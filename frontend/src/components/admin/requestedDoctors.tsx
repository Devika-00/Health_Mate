
import { Link } from 'react-router-dom';
import { DoctorInterface } from '../../types/DoctorInterface';
import { useEffect, useState } from 'react';
import { ADMIN_API } from '../../constants';

const RequestedDoctorData: React.FC = () => {
  
  const [doctors, setDoctors] = useState<DoctorInterface[]>([]);
  const [serialNumber] = useState<number>(1);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(`${ADMIN_API}/doctors`);
        if (!response.ok) {
          throw new Error('Failed to fetch doctors');
        }
        const data = await response.json();
        setDoctors(data.doctors);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <>
      {doctors
        .filter(doctor => !doctor.isApproved) 
        .map((doctor: DoctorInterface,index) => (
          <tr key={doctor._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="px-6 py-4 text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {serialNumber + index}
            </td>
            <td className="px-6 py-4 text-left">{doctor.doctorName}</td>
            <td className="px-6 py-4 text-left">{doctor.email}</td>
            <td className="px-6 py-4 text-left">{doctor.department}</td>
            <td className="px-6 py-4 text-left">
              <Link to={`/admin/doctors/${doctor._id}`} className="text-blue-500 hover:underline">
                View Details
              </Link>
            </td>
            <td className="px-6 py-4 text-left">
              <Link
                to={`/admin/doctors/${doctor._id}/verification`}
                className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded ml-10"
              >
                Verify
              </Link>
            </td>
          </tr>
        ))}
    </>
  );
};

export default RequestedDoctorData;
