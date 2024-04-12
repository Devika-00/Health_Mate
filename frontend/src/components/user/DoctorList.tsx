import React from 'react';
import { DoctorInterface } from '../../types/DoctorInterface';

interface DoctorCardProps {
  doctor: DoctorInterface;
  onViewMore: () => void;
  onAppointment: () => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onViewMore, onAppointment }) => {
  const { doctorName, department, profileImage } = doctor;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4">
        {profileImage && <img src={profileImage} alt={doctorName} className="w-full h-32 object-cover mb-4" />}
        <h2 className="text-xl font-semibold mb-2">{doctorName}</h2>
        <p className="text-gray-600 mb-4">{department}</p>
        <button
          onClick={onViewMore}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600 transition duration-300"
        >
          View More
        </button>
        <button
          onClick={onAppointment}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
        >
          Make Appointment
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;

