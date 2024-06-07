import React from "react";
import { MdDateRange } from "react-icons/md";
import CenterImage from "../../assets/images/stethoscope-copy-space.jpg";
import { Link } from "react-router-dom";

const Body: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-300">
      <div className="max-w-3xl bg-white rounded-lg shadow-lg p-8 text-center relative">
        <img
          src={CenterImage}
          alt="Center"
          className="w-full h-auto rounded-lg object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center">
          <div className="text-blue-950 mb-10 mr-64">
            <p className="break-words mr-14">Lorem ipsum dolor sit amet,</p>
            <p className="break-words mr-16">consectetur adipiscing elit.</p>
            <p className="break-words ">
              Quisque placerat convallis felis vitae.
            </p>
            <p className="break-words mr-24">Velit nascetur massa in.</p>
          </div>

          <div className="justify-center">
            <Link
              to="/doctor/slot"
              className="flex items-center justify-center bg-blue-950 text-white font-semibold py-2 px-4 rounded-full mr-72 mb-4 focus:outline-none focus:shadow-outline"
            >
              <MdDateRange className="w-6 h-6 mr-2 " />
              Schedule Appointment
            </Link>
            <Link
              to="/doctor/patientList"
              className="flex items-center justify-center bg-blue-950 text-white font-semibold py-2 px-4 rounded-full mr-72 mb-4 focus:outline-none focus:shadow-outline"
            >
              <MdDateRange className="w-6 h-6 mr-2 " />
              Patient List
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
