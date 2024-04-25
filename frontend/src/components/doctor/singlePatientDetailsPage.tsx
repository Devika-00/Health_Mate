import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { DOCTOR_API } from '../../constants';

// Define the interface for the patient data
interface Patient {
  _id: string;
  patientName: string;
  patientAge: number;
  patientProblem: string;
  selectedPackage: string;
  selectedDate: string;
  selectedTime: string;
  selectedPackageAmount: number;
  payment: boolean;
}

const PatientDetailPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null); // Explicitly specify the type

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await axios.get(`${DOCTOR_API}/patients/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        setPatient(response.data.patient);
      } catch (error) {
        console.error('Error fetching patient details:', error);
      }
    };

    fetchPatientDetails();
  }, [id]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-lg mx-auto px-24 py-10 bg-blue-200 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-8">Patient Details</h1>
        {patient ? (
          <div>
            <div className="mb-4">
              <p className="font-bold">Name:</p>
              <p>{patient.patientName}</p>
            </div>
            <div className="mb-4">
              <p className="font-bold">Age:</p>
              <p>{patient.patientAge}</p>
            </div>
            <div className="mb-4">
              <p className="font-bold">Problem:</p>
              <p>{patient.patientProblem}</p>
            </div>
            <div className="mb-4">
              <p className="font-bold">Package:</p>
              <p>{patient.selectedPackage}</p>
            </div>
            <div className="mb-4">
              <p className="font-bold">Date:</p>
              <p>{patient.selectedDate}</p>
            </div>
            <div className="mb-4">
              <p className="font-bold">Time:</p>
              <p>{patient.selectedTime}</p>
            </div>
            <div className="mb-4">
              <p className="font-bold">Amount:</p>
              <p>{patient.selectedPackageAmount}</p>
            </div>
            <div className="mb-4">
              <p className="font-bold">Payment:</p>
              <p>{patient.payment ? 'Success' : 'Pending'}</p>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default PatientDetailPage;
