import React from 'react';
import { FcGoogle } from "react-icons/fc";
import { Link,useNavigate } from "react-router-dom";
import DoctorImage from '../../assets/images/doctor1.jpg';
import { useState } from "react";
import { useFormik } from "formik";
import { validateLogin } from "../../utils/validation";
import { DOCTOR_API } from "../../constants";
import showToast from "../../utils/toaster";
import axios from "axios";
import { useAppDispatch } from "../../redux/store/Store";
import { setUser } from "../../redux/slices/UserSlice";

const Login: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: validateLogin,
    onSubmit: ({ email, password }) => {
      setIsSubmitting(true);
      axios
        .post(DOCTOR_API + "/login", { email, password })
        .then(({ data }) => {
          const { doctorName:name, role } = data.doctor;
          showToast(data.message, "success");
          dispatch(setUser({ isAuthenticated: true, name, role }));
          setTimeout(() => {
            navigate("/doctor");
          }, 1000);
        })
        .catch(({ response }) => {
          const { message } = response.data;
          setIsSubmitting(false);
          showToast(message, "error");
        });
    },
  });

  return (
    <div className="flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: `url(${DoctorImage})`, opacity: 100 }}>
      <div className="bg-gray-200 shadow-lg rounded-lg p-8 mx-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
        <form  onSubmit={formik.handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              {...formik.getFieldProps("password")}
              />
              {formik.errors.password && formik.touched.password && (
                <div className="text-red-500">{formik.errors.password}</div>
              )}
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 mt-2 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
        <p className="mt-2 ml-8 text-xs text-gray-700">
          Don't have an account?
          <Link to="/doctor/register" className="text-blue-500 underline ml-1">
            Sign Up
          </Link>
        </p>
        {/* <button
          type="button"
          className="bg-white hover:bg-gray-100 text-black font-bold py-2 px-4 rounded-full mt-6 focus:outline-none focus:shadow-outline flex items-center ml-12"
        >
          <FcGoogle className="mr-2" />
          Google
        </button> */}
      </div>
    </div>
  );
};

export default Login;
