import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosJWT from '../../utils/axiosService';
import { ADMIN_API } from '../../constants';
import AdminSidebar from '../../components/admin/Header&Sidebar/Sidebar';

const DoctorDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [doctorDetails, setDoctorDetails] = useState<any>(null);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await axiosJWT.get(`${ADMIN_API}/doctors/${id}`);
        setDoctorDetails(response.data.doctor);
      } catch (error) {
        console.error('Error fetching doctor details:', error);
      }
    };
    fetchDoctorDetails();
  }, [id]);

  if (!doctorDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="p-6 w-full flex justify-between">
        <div className="w-full md:w-1/2 bg-gray-200 shadow-md rounded-lg p-8 mt-10 mr-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">ID:</label>
            <p>{doctorDetails._id}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
            <p>{doctorDetails.doctorName}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
            <p>{doctorDetails.email}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Department:</label>
            <p>{doctorDetails.department}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
            <p>{doctorDetails.description}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Education:</label>
            <p>{doctorDetails.education}</p>
          </div>
        </div>
        <div className="w-full md:w-1/2 bg-gray-200 shadow-md rounded-lg p-8 mt-10 ml-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Profile Image:</label>
            <img src={doctorDetails.profileImage} alt="Profile" className="w-32 h-32 rounded-full" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">License Certificate:</label>
            <img src={doctorDetails.lisenceCertificate} alt="License Certificate" className="w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;
