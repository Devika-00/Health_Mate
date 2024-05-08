import React, { useState, useEffect } from 'react';
import axiosJWT from '../../utils/axiosService';
import { useParams } from 'react-router-dom';
import { USER_API } from '../../constants';

const PatientDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<any>(null);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await axiosJWT.get(`${USER_API}/bookingdetails/${id}`);
        const bookingData = response.data.data.bookingDetails;
        setPatient(bookingData);
      } catch (error) {
        console.error('Error fetching patient details:', error);
      }
    };

    fetchPatientDetails();
  }, [id]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-8/12 h-6/12 p-8 bg-gray-300 rounded-lg shadow-lg border border-gray-200">
        <h1 className="text-3xl font-bold mb-8">Patient Details</h1>
        {patient ? (
          <div>
            <div className="mb-4">
              <p className="font-bold">Name:   {patient.patientName}</p>
            </div>
            <div className="mb-4">
              <p className="font-bold">Age:   {patient.patientAge}</p>
            </div>
            <div className="mb-4">
              <p className="font-bold">Gender:   {patient.patientGender}</p>
            </div>
            <div className="mb-4">
              <p className="font-bold">Consultation Type:   {patient.consultationType}</p>
            </div>
            <div className="mb-4">
              <p className="font-bold">Date:   {new Date(patient.date).toLocaleDateString()}</p>
            </div>
            <div className="mb-4">
              <p className="font-bold">Time:   {patient.timeSlot}</p>
            </div>
            <div className="mb-4">
              <p className="font-bold">Amount:   {patient.fee}</p>
            </div>
            <div className="mb-4">
              <p className="font-bold">Payment:   {patient.paymentStatus} </p>
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
