import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import showToast from "../../utils/toaster";
import axios from "axios";
import { validateSignUp } from "../../utils/validation";
import { DOCTOR_API } from '../../constants';
import { uploadCertificateToCloudinary } from "../../Api/uploadImages";

const Signup: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [medicalLicensePreview, setMedicalLicensePreview] = useState<string | null>(null);
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
    onSubmit: async ({ name: doctorName, email, password, phoneNumber, department, education, description, experience, lisenceCertificate, consultationType }) => {
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

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      formik.setFieldValue('lisenceCertificate', file);
      const reader = new FileReader();
      reader.onload = () => {
        setMedicalLicensePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex items-center justify-center bg-cover bg-center bg-gradient-to-b from-violet-500 to-blue-500">
      <div className="bg-gray-200 w-4/12 shadow-lg rounded-lg p-10 mt-14 mb-10">
        <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-900 leading-tight focus:outline-none"
              id="name"
              type="text"
              placeholder="Name"
              {...formik.getFieldProps("name")}
            />
            {formik.errors.name && formik.touched.name && (
              <div className="text-red-500">{formik.errors.name}</div>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
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
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
              Phone Number
            </label>
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
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="department">
              Department
            </label>
            <select
              id="department"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              {...formik.getFieldProps("department")}
            >
              <option className="text-gray-700" value=""></option>
              <option className="text-gray-700" value="Cardiologist">Cardiologist</option>
              <option className="text-gray-700" value="Neurologist">Neurologist</option>
              <option className="text-gray-700" value="Dermatologist">Dermatologist</option>
              <option className="text-gray-700" value="Gynecologist">Gynecologist</option>
              <option className="text-gray-700" value="Physician">Phyisican</option>
              <option className="text-gray-700" value="Radiologist">Radiologist</option>
              <option className="text-gray-700" value="Dentist">Dentist</option>
              <option className="text-gray-700" value="Psychiatrist">Psychiatrist</option>
              <option className="text-gray-700" value="Allergist">Allergist</option>
            </select>
            {formik.errors.department && formik.touched.department && (
              <div className="text-red-500">{formik.errors.department}</div>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="consultationType">
              Consultation Type
            </label>
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
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="education">
              Education
            </label>
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
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              id="description"
              placeholder="Description"
              {...formik.getFieldProps("description")}
            />
            {/* Add error handling for description if needed */}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="experience">
              Experience
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              id="experience"
              placeholder="Experience"
              {...formik.getFieldProps("experience")}
            />
            {/* Add error handling for experience if needed */}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="medicalLicense">
              Medical License
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              id="medicalLicense"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            {formik.errors.lisenceCertificate && formik.touched.lisenceCertificate&& (
              <div className="text-red-500">{formik.errors.lisenceCertificate}</div>
            )}
            {medicalLicensePreview && (
              <img src={medicalLicensePreview} alt="Medical License Preview" className="mt-2 w-44 h-24" />
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
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
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">
              Confirm Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              id="confirm-password"
              type="password"
              placeholder="Confirm Password"
              {...formik.getFieldProps("confirmPassword")}
            />
            {formik.errors.confirmPassword && formik.touched.confirmPassword && (
              <div className="text-red-500">
                {formik.errors.confirmPassword}
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="mt-2 text-center text-gray-700">
          Already have an account? <Link to="/doctor/login" className="text-blue-500 underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
