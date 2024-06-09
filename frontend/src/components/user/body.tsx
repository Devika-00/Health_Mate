import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosJWT from "../../utils/axiosService";
import { USER_API } from "../../constants";

const Body: React.FC = () => {
  const [doctors, setDoctors] = useState<any[]>([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axiosJWT.get(`${USER_API}/doctors`);
        // Filter doctors with status approved
        const approvedDoctors = response.data.doctors.filter(
          (doctor: { status: string }) => doctor.status === "approved"
        );
        setDoctors(approvedDoctors);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-5 text-center">Our Services</h1>

      {/* Online and Offline Consultation Cards */}
      <div className="flex flex-col md:flex-row justify-center gap-8 mb-8">
        {/* Online Consultation Card */}
        <Link to="/user/online-consultation" className="w-full md:w-96">
          <div className="bg-gray-100 rounded-lg shadow-2xl border border-gray-300 flex flex-col justify-center items-center cursor-pointer">
            <img
              src="https://asianetbroadband.in/wp-content/uploads/2022/03/online-consultation.jpg"
              alt="Online Consultation"
              className="h-72 w-full object-cover rounded-t-lg mt-7"
            />
            <div className="p-4 text-center">
              <h2 className="text-lg font-semibold mb-2">
                Online Consultation
              </h2>
              <p className="text-gray-600 mb-4">
                Book an appointment for online consultation.
              </p>
            </div>
          </div>
        </Link>

        {/* Offline Consultation Card */}
        <Link to="/user/offline-consultation" className="w-full md:w-96">
          <div className="bg-gray-100 rounded-lg shadow-2xl border border-gray-300 flex flex-col justify-center items-center cursor-pointer">
            <img
              src="https://media.istockphoto.com/id/1473559425/photo/female-medical-practitioner-reassuring-a-patient.jpg?s=612x612&w=0&k=20&c=kGbm-TE5qdppyyiteyip7_CzKLktyPrRuWD4Zz2EcqE="
              alt="Offline Consultation"
              className="h-72 w-full object-cover rounded-t-lg mt-7"
            />
            <div className="p-4 text-center">
              <h2 className="text-lg font-semibold mb-2">
                Offline Consultation
              </h2>
              <p className="text-gray-600 mb-4">
                Book an appointment for offline consultation.
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* Doctors Section */}
      <h1 className="text-3xl font-bold mb-8 text-center">Meet Our Doctors</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {doctors.map((doctor) => (
            <Link key={doctor._id} to={`/user/doctor/${doctor._id}`} className="w-full">
              <div className="bg-white rounded-lg shadow-md shadow-blue-100 border border-blue-100 transition-transform duration-300 transform hover:shadow-lg hover:scale-105">
                <img
                  src={doctor.profileImage}
                  alt="Doctor"
                  className="h-80 w-full object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h2 className="text-xl text-blue-900 font-bold mb-2">{doctor.doctorName}</h2>
                  <p className="text-gray-900 font-semibold mb-2">{doctor.department}</p>
                  <p className="text-gray-600 mb-4">{doctor.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
    </div>
  );
};

export default Body;
