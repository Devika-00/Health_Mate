import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosJWT from "../../utils/axiosService";
import { USER_API } from "../../constants";
import { FaVideo, FaCalendarAlt } from "react-icons/fa"; // Import icons from React Icons

const DoctorDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [doctor, setDoctor] = useState<any>(null);
  const navigate = useNavigate(); // Using useNavigate instead of useHistory

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await axiosJWT.get(`${USER_API}/doctor/${id}`);
        setDoctor(response.data.doctor);
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      }
    };
    fetchDoctorDetails();
  }, [id]);

  const handleBookAppointment = () => {
    navigate(`/user/appoinmentOffline/${id}`); // Using navigate instead of history.push
  };

  const handleOnlineBookAppointment = () => {
    navigate(`/user/appoinmentOnline/${id}`); // Using navigate instead of history.push
  };

  if (!doctor) {
    return <div>Loading...</div>;
  }

  // Function to render appointment button based on consultation type
  const renderAppointmentButton = () => {
    if (doctor.consultationType === "online") {
      return (
        <button
          onClick={handleOnlineBookAppointment}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4"
        >
          <FaVideo className="mr-2" /> Online Appointment
        </button>
      );
    } else if (doctor.consultationType === "offline") {
      return (
        <button
          onClick={handleBookAppointment}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4"
        >
          <FaCalendarAlt className="mr-2" /> Book Appointment
        </button>
      );
    } else if (doctor.consultationType === "both") {
      return (
        <div>
          <button
            onClick={handleOnlineBookAppointment}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 mr-4"
          >
            <FaVideo className="mr-2" /> Online Appointment
          </button>
          <button
            onClick={handleBookAppointment}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4"
          >
            <FaCalendarAlt className="mr-2" /> Book Appointment
          </button>
        </div>
      );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Doctor Details</h1>
      <div className="flex flex-col md:flex-row items-center justify-center">
        {/* Left Section */}
        <div className="md:w-1/3 mb-4 md:mb-0">
          <img
            src={doctor.profileImage}
            alt="Doctor"
            className="h-96 w-96 rounded-lg shadow-md"
          />
        </div>
        {/* Right Section */}
        <div className="md:w-2/3 md:pl-8">
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <h2 className="text-xl font-bold">{doctor.department}</h2>
            <p className="text-lg">{doctor.doctorName}</p>
            <p className="text-lg text-green-500 font-bold">Verified</p>
            {/* Add verified symbol here if necessary */}
            {renderAppointmentButton()}
          </div>
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <h3 className="text-xl font-bold mb-4">About</h3>
            <p className="text-lg">{doctor.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetailsPage;
