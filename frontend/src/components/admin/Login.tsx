import React from 'react';
import AdminImage from '../../assets/images/login.png'; // Import the image
import { useFormik } from "formik";
import { useState } from "react";
import axios from "axios";
import showToast from "../../utils/toaster";
import { useNavigate } from "react-router-dom";
import { validateLogin } from "../../utils/validation";
import { ADMIN_API } from "../../constants";
import { useAppDispatch } from "../../redux/store/Store";
import { setAdmin } from '../../redux/slices/AdminSlice';



const AdminLoginForm: React.FC = () => {
    const [, setIsSubmitting] = useState<Boolean>(false);
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
          .post(ADMIN_API + "/login", { email, password })
          .then(({ data }) => {
            const access_token = data.accessToken
            const { name, role } = data.admin;
            localStorage.setItem('access_token', access_token);
            showToast(data.message, "success");
            dispatch(setAdmin({ isAuthenticated: true, name, role }));
            navigate("/admin");
          })
          .catch(({ response }) => {
            setIsSubmitting(false);
            showToast(response?.data?.message, "error");
          });
      },
    });

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-300 to-blue-500">
      <form className="bg-white shadow-lg rounded-lg  p-8 flex flex-col lg:flex-row items-center justify-center lg:ml-20" onSubmit={formik.handleSubmit}>
        <img src={AdminImage} alt="Admin" className="rounded-full w-96 mb-6 lg:mr-8" /> 
        <div className="flex flex-col w-full">
          <h2 className="text-3xl font-bold mb-6 mr-14 text-center text-blue-900 shadow-md">Admin Login</h2>
          <div className="mb-6">
            <label className="block text-blue-900 text-m  font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none mr-20 focus:shadow-outline"
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
            <label className="block text-gray-700 text-m font-bold mb-2" htmlFor="password">
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
              className="bg-blue-900 hover:bg-blue-900 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminLoginForm;
