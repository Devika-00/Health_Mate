import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { DOCTOR_API } from '../../constants';

interface Patient {
    _id: string;
    patientName: string;
    patientAge: number;
    selectedPackage: string; // Assuming selectedPackage is a string, adjust the type accordingly
  }

const PatientListPage = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(`${DOCTOR_API}/patients`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        setPatients(response.data.patients);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Patient List</h1>
      <div className="shadow-lg overflow-hidden border-b border-gray-400 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-sm font-bold text-blue-950 uppercase tracking-wider">Patient Name</th>
              <th scope="col" className="px-6 py-3 text-left text-sm font-bold text-blue-950 uppercase tracking-wider">Age</th>
              <th scope="col" className="px-6 py-3 text-left text-sm font-bold text-blue-950 uppercase tracking-wider">Package Name</th>
              <th scope="col" className="px-6 py-3 text-left text-sm font-bold text-blue-950 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {patients.map((patient) => (
              <tr key={patient._id} className="border-b border-gray-400 hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap">{patient.patientName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{patient.patientAge}</td>
                <td className="px-6 py-4 whitespace-nowrap">{patient.selectedPackage}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {/* Use Link component from react-router-dom to navigate to patient details page */}
                  <Link to={`/doctor/patient-details/${patient._id}`} className="text-blue-500 underline">View Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientListPage;
