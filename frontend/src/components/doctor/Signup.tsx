import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import showToast from "../../utils/toaster";
import axios from "axios";
import { validateSignUp } from "../../utils/validation";
import { DOCTOR_API } from "../../constants";
import { uploadCertificateToCloudinary } from "../../Api/uploadImages";
import DoctorImage from "../../assets/images/doctor1.jpg";

const Signup: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [medicalLicensePreview, setMedicalLicensePreview] = useState<string | null>(null);
  const [departments, setDepartments] = useState<{
    _id: string;
    departmentName: string;
    isListed: boolean;
    createdAt: string;
    updatedAt: string;
  }[]>([]);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      department: "",
      consultationType: "",
      education: "",
      description: "",
      experience: "",
      password: "",
      confirmPassword: "",
      lisenceCertificate: null,
    },
    validate: validateSignUp,
    onSubmit: async ({
      name: doctorName,
      email,
      password,
      phoneNumber,
      department,
      education,
      description,
      experience,
      lisenceCertificate,
      consultationType,
    }) => {
      setIsSubmitting(true);
      const certificateUrl = await uploadCertificateToCloudinary(lisenceCertificate);
      axios
        .post(DOCTOR_API + "/signup", {
          doctorName,
          email,
          password,
          phoneNumber,
          department,
          consultationType,
          education,
          description,
          experience,
          lisenceCertificate: certificateUrl,
        })
        .then(({ data }) => {
          showToast(data.message, "success");
          setTimeout(() => {
            navigate("/doctor/login");
          }, 1000);
        })
        .catch(({ response }) => {
          const { message } = response.data;
          setIsSubmitting(false);
          showToast(message, "error");
        });
    },
  });

  useEffect(() => {
    const fetchDoctorDepartment = async () => {
      try {
        const response = await axios.get(`${DOCTOR_API}/departments`);
        if (response.data.success) {
          setDepartments(response.data.allDepartment);
        } else {
          throw new Error("Failed to fetch doctor details");
        }
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      }
    };

    fetchDoctorDepartment();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      formik.setFieldValue("lisenceCertificate", file);
      const reader = new FileReader();
      reader.onload = () => {
        setMedicalLicensePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${DoctorImage})` }}>
      <div className="bg-gray-200 w-full max-w-lg md:w-4/12 shadow-lg rounded-lg p-6 md:p-10 mt-14 mb-10">
        <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              id="name"
              type="text"
              placeholder="Name"
              {...formik.getFieldProps("name")}
            />
            {formik.errors.name && formik.touched.name && (
              <div className="text-red-500">{formik.errors.name}</div>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              id="email"
              type="email"
              placeholder="Email"
              {...formik.getFieldProps("email")}
            />
            {formik.errors.email && formik.touched.email && (
              <div className="text-red-500">{formik.errors.email}</div>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">Phone Number</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              id="phoneNumber"
              type="text"
              placeholder="Phone Number"
              {...formik.getFieldProps("phoneNumber")}
            />
            {formik.errors.phoneNumber && formik.touched.phoneNumber && (
              <div className="text-red-500">{formik.errors.phoneNumber}</div>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="department">Department</label>
            <select
              id="department"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              {...formik.getFieldProps("department")}
            >
              <option className="text-gray-700" value=""></option>
              {departments.map((department) => (
                <option key={department._id} className="text-gray-700" value={department.departmentName}>
                  {department.departmentName}
                </option>
              ))}
            </select>
            {formik.errors.department && formik.touched.department && (
              <div className="text-red-500">{formik.errors.department}</div>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="consultationType">Consultation Type</label>
            <select
              id="consultationType"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              {...formik.getFieldProps("consultationType")}
            >
              <option className="text-gray-700" value=""></option>
              <option className="text-gray-700" value="online">Online Consultation</option>
              <option className="text-gray-700" value="offline">Offline Consultation</option>
              <option className="text-gray-700" value="both">Both</option>
            </select>
            {formik.errors.consultationType && formik.touched.consultationType && (
              <div className="text-red-500">{formik.errors.consultationType}</div>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="education">Education</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              id="education"
              type="text"
              placeholder="Education"
              {...formik.getFieldProps("education")}
            />
            {formik.errors.education && formik.touched.education && (
              <div className="text-red-500">{formik.errors.education}</div>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              id="description"
              placeholder="Description"
              {...formik.getFieldProps("description")}
            />
            {/* Add error handling for description if needed */}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="experience">Experience</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              id="experience"
              placeholder="Experience"
              {...formik.getFieldProps("experience")}
            />
            {/* Add error handling for experience if needed */}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="medicalLicense">Medical License</label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              id="medicalLicense"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            {formik.errors.lisenceCertificate && formik.touched.lisenceCertificate && (
              <div className="text-red-500">{formik.errors.lisenceCertificate}</div>
            )}
          </div>
          <div className="mb-4">
            {medicalLicensePreview && (
              <img
                src={medicalLicensePreview}
                alt="Medical License Preview"
                className="w-full h-auto mb-4"
              />
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              id="password"
              type="password"
              placeholder="Password"
              {...formik.getFieldProps("password")}
            />
            {formik.errors.password && formik.touched.password && (
              <div className="text-red-500">{formik.errors.password}</div>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">Confirm Password</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              {...formik.getFieldProps("confirmPassword")}
            />
            {formik.errors.confirmPassword && formik.touched.confirmPassword && (
              <div className="text-red-500">{formik.errors.confirmPassword}</div>
            )}
          </div>
          <div className="mb-4 flex justify-center">
            <button
              className={`bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Sign Up"}
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-sm">
            Already have an account?{" "}
            <Link to="/doctor/login" className="text-blue-500">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
