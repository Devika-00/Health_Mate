import React, { useState, useEffect } from 'react';
import axiosJWT from '../../utils/axiosService';
import { useParams } from 'react-router-dom';
import { DOCTOR_API, USER_API } from '../../constants';
import { RiFileAddLine } from 'react-icons/ri';
import showToast from '../../utils/toaster';

const PatientDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [prescriptionDate, setPrescriptionDate] = useState(new Date().toISOString().split("T")[0]);
  const [doctorName, setDoctorName] = useState("");
  const [medicines, setMedicines] = useState<{ name: string; dosage: string; instructions: string }[]>([{ name: "", dosage: "", instructions: "" }]);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await axiosJWT.get(`${USER_API}/bookingdetails/${id}`);
        const bookingData = response.data.data.bookingDetails;
        setPatient(bookingData);
      } catch (err) {
        setError('Error fetching patient details.');
        console.error('Error fetching patient details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientDetails();
  }, [id]);

  const handleAddPrescription = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSave = async () => {
    const data = {
      appointmentId: id,
      prescriptionDate: prescriptionDate,
      medicines: medicines,
    };
     const response = await axiosJWT.post(`${DOCTOR_API}/addPrescription`,data);
     if(response){
      showToast("Prescription added succesfully","success");
     }

    setModalOpen(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-xl text-red-500 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center py-10 bg-gray-100">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Patient Details</h1>
        {patient ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="p-4 bg-gray-50 rounded-lg shadow-inner">
              <h2 className="font-bold text-gray-700">Name</h2>
              <p className="text-gray-900">{patient.patientName}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg shadow-inner">
              <h2 className="font-bold text-gray-700">Age</h2>
              <p className="text-gray-900">{patient.patientAge}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg shadow-inner">
              <h2 className="font-bold text-gray-700">Gender</h2>
              <p className="text-gray-900">{patient.patientGender}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg shadow-inner">
              <h2 className="font-bold text-gray-700">Consultation Type</h2>
              <p className="text-gray-900">{patient.consultationType}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg shadow-inner">
              <h2 className="font-bold text-gray-700">Date</h2>
              <p className="text-gray-900">{new Date(patient.date).toLocaleDateString()}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg shadow-inner">
              <h2 className="font-bold text-gray-700">Time</h2>
              <p className="text-gray-900">{patient.timeSlot}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg shadow-inner">
              <h2 className="font-bold text-gray-700">Amount</h2>
              <p className="text-gray-900">{patient.fee}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg shadow-inner">
              <h2 className="font-bold text-gray-700">Payment Status</h2>
              <p className="text-gray-900">{patient.paymentStatus}</p>
            </div>
            <div className="flex justify-center items-center mt-4 md:col-span-2">
              <button
                className="bg-blue-900 text-white py-2 px-4 rounded-md shadow hover:bg-blue-800 flex items-center"
                onClick={handleAddPrescription}
              >
                <RiFileAddLine className="mr-2" /> Add Prescription
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-700">No patient details available.</p>
        )}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Add Prescription</h2>
            <div className="mt-2 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Prescription Date</label>
                <input
                  type="date"
                  className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-800"
                  value={prescriptionDate}
                  onChange={(e) => setPrescriptionDate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Doctor's Name</label>
                <input
                  type="text"
                  className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-800"
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                />
              </div>
              {medicines.map((med, index) => (
                <div key={index} className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                  <input
                    type="text"
                    className="border rounded-lg px-3 py-2 w-full"
                    placeholder="Medicine Name"
                    value={med.name}
                    onChange={(e) => {
                      const newMedicines = [...medicines];
                      newMedicines[index].name = e.target.value;
                      setMedicines(newMedicines);
                    }}
                  />
                  <input
                    type="text"
                    className="border rounded-lg px-3 py-2 w-full"
                    placeholder="Dosage"
                    value={med.dosage}
                    onChange={(e) => {
                      const newMedicines = [...medicines];
                      newMedicines[index].dosage = e.target.value;
                      setMedicines(newMedicines);
                    }}
                  />
                  <input
                    type="text"
                    className="border rounded-lg px-3 py-2 w-full"
                    placeholder="Instructions"
                    value={med.instructions}
                    onChange={(e) => {
                      const newMedicines = [...medicines];
                      newMedicines[index].instructions = e.target.value;
                      setMedicines(newMedicines);
                    }}
                  />
                  {index > 0 && (
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => {
                        const newMedicines = medicines.filter((_, i) => i !== index);
                        setMedicines(newMedicines);
                      }}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                className="text-blue-800 hover:text-blue-600 font-semibold"
                onClick={() => setMedicines([...medicines, { name: "", dosage: "", instructions: "" }])}
              >
                Add More Medicines
              </button>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientDetailPage
