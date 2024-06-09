import React, { useEffect, useState } from "react";
import axiosJWT from "../../utils/axiosService";
import { DOCTOR_API } from "../../constants";
import { useParams } from "react-router-dom";
import showToast from "../../utils/toaster";

const DoctorStatusPage = () => {
  const { doctorId } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    doctorName: "",
    department: "",
    profileImage: "",
    status: "",
    rejectedReason: "",
    email: "",
    phoneNumber: "",
    description: "",
    education: "",
    experience: "",
    age: "",
    lisenceCertificate: "",
  });

  const handleReapplyClick = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axiosJWT.put(
        `${DOCTOR_API}/reapply_verification/${doctorId}`,
        {
          status: "pending",
        }
      );

      if (response.status >= 200 && response.status < 300) {
        showToast("Reapply of verification successfull");
        setIsModalOpen(false);
      } else {
        console.error("Failed to update doctor status");
      }
    } catch (error) {
      console.error("Error updating doctor status:", error);
    }
  };

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await axiosJWT.get(
          `${DOCTOR_API}/doctorDetails/${doctorId}`
        );
        if (response.status >= 200 && response.status < 300) {
          setFormData(response.data.doctor);
        } else {
          throw new Error("Failed to fetch doctor details");
        }
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      }
    };

    fetchDoctorDetails();
  }, [doctorId]);

  const getStatusColor = () => {
    switch (formData.status) {
      case "pending":
        return "text-orange-500";
      case "approved":
        return "text-green-500";
      case "rejected":
        return "text-red-500";
      default:
        return "";
    }
  };

  return (
    <div className="flex items-center justify-center mb-16 mt-16">
      <div className="bg-gray-100 shadow-xl rounded-md p-12 md:w-4/12 w-full">
    <div className="flex flex-col md:flex-row items-center justify-center md:items-start md:justify-between mb-8">
      {/* Profile picture */}
      <img
        src={formData.profileImage}
        alt="Doctor"
        className="w-48 h-48 rounded mb-4 md:mr-4"
      />
      <div className="mr-24 mt-16">
        {/* Doctor name */}
        <p className="text-2xl font-semibold">{formData.doctorName}</p>
        {/* Department */}
        <p className="text-gray-500">{formData.department}</p>
      </div>
  </div>
  <hr className="my-4" />
  {/* Status */}
  <p className={`text-lg font-semibold ${getStatusColor()}`}>
    Verification Status: {formData.status}
  </p>
  {formData.status === "rejected" && (
    <p className="text-red-500">Rejected Reason: {formData.rejectedReason}</p>
  )}
  {/* Reapply button for rejected status */}
  {formData.status === "rejected" && (
    <button
      className="bg-blue-500 text-white rounded-md px-4 py-2 mt-4"
      onClick={handleReapplyClick}
    >
      Reapply
    </button>
  )}
</div>
      {/* Modal for reapplying verification */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white shadow-md rounded-md p-6 w-96 my-20">
            {/* Modal content */}
            <h2 className="text-lg font-semibold mb-4">Verification</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.doctorName}
                  readOnly
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  readOnly
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="education"
                  className="block text-sm font-medium text-gray-700"
                >
                  Education
                </label>
                <input
                  type="text"
                  id="education"
                  name="education"
                  value={formData.education}
                  onChange={(e) =>
                    setFormData({ ...formData, education: e.target.value })
                  }
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="medicalLicense"
                  className="block text-sm font-medium text-gray-700"
                >
                  Medical License Image
                </label>
                <img
                  src={formData.lisenceCertificate}
                  alt="Medical License"
                  className="mt-1 w-full"
                />
                <input
                  type="file"
                  id="medicalLicense"
                  name="medicalLicense"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      lisenceCertificate: e.target.value,
                    })
                  }
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white rounded-md px-4 py-2"
                >
                  Apply
                </button>
                <button
                  type="button"
                  className="text-sm text-blue-500 hover:underline mt-2 ml-2"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorStatusPage;
