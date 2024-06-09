import React from "react";
import { MdDateRange } from "react-icons/md";
import CenterImage from "../../assets/images/stethoscope-copy-space.jpg";
import { Link } from "react-router-dom";

const Body: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-300">
      <div className="relative max-w-3xl bg-white rounded-lg shadow-lg p-8">
        <div className="absolute inset-0 flex flex-col justify-center items-center">
          <div className="text-blue-950 mb-10 lg:mr-20">
            <p className="break-words mb-2 md:mr-6 lg:mr-12">Lorem ipsum dolor sit amet,</p>
            <p className="break-words mb-2 md:mr-6 lg:mr-12">consectetur adipiscing elit.</p>
            <p className="break-words mb-2 md:mr-6 lg:mr-12">Quisque placerat convallis felis vitae.</p>
            <p className="break-words">Velit nascetur massa in.</p>
          </div>
          <div className="flex flex-col md:flex-row md:space-x-4">
            <Link
              to="/doctor/slot"
              className="flex items-center justify-center bg-blue-950 text-white font-semibold py-2 px-4 rounded-full mb-4 md:mb-0 focus:outline-none focus:shadow-outline mt-5"
            >
              <MdDateRange className="w-6 h-6 mr-2" />
              Schedule Appointment
            </Link>
            <Link
              to="/doctor/patientList"
              className="flex items-center justify-center bg-blue-950 text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline mt-5"
            >
              <MdDateRange className="w-6 h-6 mr-2" />
              Patient List
            </Link>
          </div>
        </div>
        <img
          src={CenterImage}
          alt="Center"
          className="w-full h-auto rounded-lg object-cover mt-8"
        />
      </div>
    </div>
  );
};

export default Body;
