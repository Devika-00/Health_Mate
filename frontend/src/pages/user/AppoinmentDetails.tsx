import React, { useEffect, useState } from "react";
import Navbar from "../../components/user/Navbar/navbar";
import Footer from "../../components/user/Footer/Footer";
import axiosJWT from "../../utils/axiosService";
import { CHAT_API, USER_API } from "../../constants";
import { useNavigate, useParams } from "react-router-dom";
import showToast from "../../utils/toaster";
import { Modal } from "react-bootstrap";
import { FaFilePdf, FaPlus, FaTimes, FaTrash } from "react-icons/fa";
import { FaFileUpload } from "react-icons/fa";
import { uploadDocumentToCloudinary } from "../../Api/uploadImages";
import { AiOutlineFileText } from 'react-icons/ai';
import { FiMessageSquare } from "react-icons/fi";
import axios from "axios";
import { useAppSelector } from "../../redux/store/Store";


const AppointmentDetails: React.FC = () => {
  const user = useAppSelector((state) => state.UserSlice);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [doctorDetails, setDoctorDetails] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [prescription, setPrescription] = useState<any | null>(null);
  const [cancelReason, setCancelReason] = useState("");
  const [documents, setDocuments] = useState<{
    name: string;
    documentFile: File | null;
  }[]>([
    {
      name: "",
      documentFile: null,
    },
  ]);


  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await axiosJWT.get(`${USER_API}/bookingdetails/${id}`);
        const bookingData = response.data.data.bookingDetails;
        setBookingDetails(bookingData);

        const doctorResponse = await axiosJWT.get(
          `${USER_API}/doctor/${bookingData.doctorId}`
        );
        setDoctorDetails(doctorResponse.data.doctor);
      } catch (error) {
        console.error("Error fetching booking details:", error);
      }
    };
    fetchBookingDetails();
  }, [id]);

  const handleCancelAppointment = async () => {
    try {
      await axiosJWT.put(`${USER_API}/bookingdetails/${id}`, {
        appoinmentStatus: "Cancelled",
        cancelReason,
      });
      setBookingDetails((prevState: any) => ({
        ...prevState,
        appoinmentStatus: "Cancelled",
      }));
      showToast("Appoinment Cancelled", "success");
      setShowModal(false);
    } catch (error) {
      console.error("Error cancelling appointment:", error);
    }
  };

  const handleReschedule = () => {
    if (bookingDetails.consultationType === "Online") {
      navigate(`/user/appoinmentOnline/${bookingDetails.doctorId}`);
    } else if (bookingDetails.consultationType === "Offline") {
      navigate(`/user/appoinmentOffline/${bookingDetails.doctorId}`);
    }
  };

  const renderStatus = () => {
    if (bookingDetails.appoinmentStatus === "Booked") {
      return (
        <button
          onClick={() => setShowModal(true)}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-5"
        >
          Cancel Appointment
        </button>
      );
    } else if (bookingDetails.appoinmentStatus === "Cancelled") {
      return (
        <div className="flex justify-between items-center">
          <p className="text-red-500">Appointment Cancelled</p>
          <button
            onClick={handleReschedule}
            className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Reschedule Appointment
          </button>
        </div>
      );
    } else if (bookingDetails.appoinmentStatus === "Consulted") {
      return <p className="text-green-500">Consultation Completed</p>;
    }
  };

  const showPrescription = async (appoinmentId: any) => {
    const data = {
      appoinmentId,
    };

    const response = await axiosJWT.post(`${USER_API}/fetchPrescription`, data);

    if (response.data && response.data.response) {
      setPrescription(response.data.response);
      setShowPrescriptionModal(true);
    } else if (response.data.status === false) {
      showToast("No prescription found");
    }
  };

  const showDocument = async (id: string | undefined) =>{
    setShowDocumentModal(true);
  }
  const showDocumentPage = async (id: string | undefined) =>{
    navigate(`/user/documents/${id}`);
  }




  function closeModal(): void {
    setShowPrescriptionModal(false);
    setPrescription(null);
  }

  function closeDocumentModal(): void {
    setShowDocumentModal(false);
  }






  const handleNameChange = (index: number, value: string) => {
    const updatedDocuments = [...documents];
    updatedDocuments[index].name = value;
    setDocuments(updatedDocuments);
};

const handleFileChange = (index: number, file: any) => {
    const updatedDocuments = [...documents];
    updatedDocuments[index].documentFile = file;
    setDocuments(updatedDocuments);
};




const handleSubmit = async (event: any) => {
  event.preventDefault();
  
  try {
    const documentsData = [];
    
    // Iterate over each document
    for (const document of documents) {
      const url = await uploadDocumentToCloudinary(document.documentFile);
      documentsData.push({ name: document.name, url: url });
    }
    
    // Send the array of document data to the backend
    const response = await axiosJWT.post(`${USER_API}/uploadDocuments`, {   id: id, documents: documentsData, });
    console.log(response,"jkjdkjkjfksjf")
    if (response.data.sucess) {
      showToast('Documents uploaded successfully', 'success');
      setShowDocumentModal(false);
      setDocuments([]);
    } else {
      showToast('Failed to upload documents', 'error');
    }
  } catch (error) {
    console.error('Error uploading documents:', error);
    showToast('Error uploading documents', 'error');
  }
};


const addDocument = () => {
    setDocuments([...documents, { name: '', documentFile: null }]);
};

const removeDocument = (index:number) => {
    const updatedDocuments = [...documents];
    updatedDocuments.splice(index, 1);
    setDocuments(updatedDocuments);
};

const handleChat = () => {
  axios
    .post(CHAT_API + `/conversations`, {
      senderId: user.id,
      recieverId: doctorDetails._id,
    })
    .then(({ data }) => {
      const chatID: string = data.chats._id;
      navigate("/user/chat");
    })
    .catch(() => {
      console.log("error in sending chat");
    });
};
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Booking Details</h1>

        {bookingDetails && doctorDetails && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-50 p-6 rounded-lg shadow-md border border-blue-200">
              <div className="flex items-center mb-4">
                <img
                  src={doctorDetails.profileImage}
                  alt={doctorDetails.doctorName}
                  className="w-40 h-40 rounded mr-4"
                />
                <div>
                  <h2 className="text-2xl font-bold">
                    {doctorDetails.doctorName}
                  </h2>
                  <p>{doctorDetails.department}</p>
                  <p className="text-green-600 font-semibold">Verified</p>
                  <button
                  onClick={() => handleChat()}
                  className="bg-blue-800 flex hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3"
                >
                  <FiMessageSquare className="mr-2 mt-1" />
                  Chat 
                </button>


                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg shadow-md border border-blue-200">
              <h2 className="text-2xl font-bold mb-4">Scheduled Appointment</h2>
              <div>
                <p className="font-medium">
                  Date: {new Date(bookingDetails.date).toLocaleDateString()}
                </p>
                <p className="font-medium">Time: {bookingDetails.timeSlot}</p>
                <p className="font-medium">
                  Patient Name: {bookingDetails.patientName}
                </p>
                <p className="font-medium">
                  Patient Age: {bookingDetails.patientAge}
                </p>
                <p className="font-medium">
                  Patient Gender: {bookingDetails.patientGender}
                </p>
                {renderStatus()}
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg shadow-md border border-blue-200">
              <h2 className="text-2xl font-bold mb-4">Consultation Details</h2>
              <div>
                <p className="font-medium">
                  Consultation Type: {bookingDetails.consultationType}
                </p>
                <p className="font-medium">
                  Payment Status: {bookingDetails.paymentStatus}
                </p>
                <h1
                className="text-2xl font-bold mb-1 mt-4">Prescription
                </h1>
                <p className="mb-3 text-blue-900">Click the button to see the prescription</p>
                <button
                  onClick={() => showPrescription(id)}
                  className="bg-green-800 flex hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  <FaFilePdf className="mr-2 mt-1" />
                  Check Prescription
                </button>
              </div>
              
            </div>

            <div className="bg-blue-50 p-6 rounded-lg shadow-md border border-blue-200">
              <h2 className="text-2xl font-bold mb-4">Documents</h2>
              <div>
                <p className="text-blue-900">Click the button to add the lab record documents </p>
                <button
                  onClick={() => showDocument(id)}
                  className="bg-yellow-800 flex hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mt-3"
                >
                  <FaFileUpload className="mr-2 mt-1" />
                  Add Documents
                </button>
                <p className="mt-3 text-blue-900">Click the view documents button to see all the lab docuemnts uploaded </p>
                <button
                  onClick={() => showDocumentPage(id)}
                  className="bg-blue-800 flex hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3"
                >
                  <AiOutlineFileText className="mr-2 mt-1" />
                  view Documents
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal for cancellation reason */}
        {showModal && (
          <div className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-full">
              <div className="bg-gray-50 px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Reason for Cancellation
                </h3>
                <div className="mt-2">
                  <textarea
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                    className="block w-full p-2 sm:text-sm border-gray-300 rounded-md"
                    rows={4}
                    placeholder="Enter reason for cancellation"
                  ></textarea>
                </div>
              </div>
              <div className="bg-gray-100 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleCancelAppointment}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {showPrescriptionModal && (
          <div className="bg-white p-6 rounded-lg shadow-xl">
            {prescription ? (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Prescription Details
                </h2>
                <p className="text-gray-700">
                  <span className="font-semibold">Doctor:</span>{" "}
                  {doctorDetails.doctorName}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Appointment ID:</span>
                  {id}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Prescription Date:</span>{" "}
                  {new Date(prescription.prescriptionDate).toDateString()}
                </p>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Medicines:
                  </h3>
                  {prescription.medicines?.map((medicine: any, index: any) => (
                    <li key={index} className="text-gray-500">
                      <span className="font-semibold">
                        Name:
                        <span className="text-red-700">{medicine.name}</span> -
                        Dosage:{" "}
                        <span className="text-red-700">{medicine.dosage} </span>
                        -Instructions :{" "}
                        <span className="text-red-700">
                          {medicine.instructions}
                        </span>{" "}
                      </span>
                    </li>
                  ))}
                </div>
                <button
                  onClick={closeModal}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition ease-in-out duration-300"
                >
                  Close
                </button>
              </div>
            ) : (
              <p className="text-gray-700">No Prescription added ...</p>
            )}
          </div>
        )}


        {showDocumentModal && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-lg w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">Add Documents</h2>
                <button
                  onClick={closeDocumentModal}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <FaTimes />
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                {documents.map((document, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex items-center mb-2">
                      <input
                        type="text"
                        value={document.name}
                        onChange={(e) => handleNameChange(index, e.target.value)}
                        className="block w-full p-2 sm:text-sm border-gray-300 rounded-md"
                        placeholder="Document Name"
                      />
                      <button
                        type="button"
                        onClick={() => removeDocument(index)}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </div>
                    <input
                      type="file"
                      onChange={(e) => handleFileChange(index, e.target.files?.[0])}
                      className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addDocument}
                  className="flex items-center mb-4 text-blue-600 hover:text-blue-800"
                >
                  <FaPlus className="mr-2" />
                  Add Another Document
                </button>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition ease-in-out duration-300"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}






      </div>
      <Footer />
    </>
  );
};

export default AppointmentDetails;
