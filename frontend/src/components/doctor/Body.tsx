import React from "react";
import { MdDateRange, MdList } from "react-icons/md";
import CenterImage from "../../assets/images/stethoscope-copy-space.jpg";
import { Link } from "react-router-dom";

const Body: React.FC = () => {


  return (
    <main className="flex flex-1 w-full container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img src={CenterImage} alt="Center" className="w-full h-48 object-cover"/>
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Welcome to Your Portal</h2>
            <p className="text-gray-600 mb-4">Find the patients and Schedule slots easily.</p>
            
              <div className="flex space-x-4">
                <Link
                  to="/doctor/slot"
                  className="flex items-center justify-center bg-blue-900 text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                >
                  <MdDateRange className="w-6 h-6 mr-2" />
                  Schedule Appointment
                </Link>
                <Link
                  to="/doctor/patientList"
                  className="flex items-center justify-center bg-blue-900 text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                >
                  <MdList className="w-6 h-6 mr-2" />
                  Patient List
                </Link>
              </div>
         
          </div>
        </div>
          <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 transform hover:scale-105">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Latest Updates</h2>
            <ul className="list-disc list-inside text-gray-700">
              <li className="mb-2">New doctors have joined our team.</li>
              <li className="mb-2">Improved patient care services.</li>
              <li className="mb-2">Updated appointment scheduling system.</li>
              <li className="mb-2">Exciting offers on health checkups.</li>
              <li className="mb-2">Expanded coverage for telemedicine services.</li>
              <li className="mb-2">Enhanced patient feedback system.</li>
              <li className="mb-2">Make the world Healthy.</li>
              <li className="mb-2">Give Free Consultation.</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Body;
