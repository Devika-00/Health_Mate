import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { validateSignUp } from "../../utils/validation";
import showToast from "../../utils/toaster";
import { setItemToLocalStorage } from "../../utils/Set&Get";
import { USER_API } from "../../constants";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: validateSignUp,
    onSubmit: ({ name, email, password }) => {
      setIsSubmitting(true);
      axios
        .post(USER_API + "/register", { name, email, password })
        .then(({ data }) => {
          console.log(data);
          showToast(data.message, "success");
          setTimeout(() => {
            setItemToLocalStorage("userId", data.newUser._id);
            navigate("/user/verify_otp");
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
    <div className="flex items-center justify-center h-screen ">
      <div className="flex">
        <div className="w-96 p-8 bg-gray-300 rounded-lg shadow-lg ml-8">
          <h2 className="font-extrabold text-blue-900 text-3xl mb-5 ml-28">
            Register
          </h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 mr-72">
                Name:
              </label>
              <input
                type="text"
                id="name"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                {...formik.getFieldProps("name")}
              />
               {formik.errors.name && formik.touched.name && (
                  <div className="text-red-500">{formik.errors.name}</div>
                )}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mr-72">
                Email:
              </label>
              <input
                type="text"
                id="email"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                {...formik.getFieldProps("email")}
              />
              {formik.errors.email && formik.touched.email && (
                  <div className="text-red-500">{formik.errors.email}</div>
                )}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 mr-60">
                Password:
              </label>
              <input
                type="password"
                id="password"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                {...formik.getFieldProps("password")}
              />
              {formik.errors.password && formik.touched.password && (
                  <div className="text-red-500">{formik.errors.password}</div>
                )}
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 mr-44">
                Confirm Password:
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                {...formik.getFieldProps("confirmPassword")}
              />
              {formik.errors.confirmPassword &&
                  formik.touched.confirmPassword && (
                    <div className="text-red-500">
                      {formik.errors.confirmPassword}
                    </div>
                  )}
              </div>
            <button
              type="submit"
              className="bg-blue-900 hover:bg-blue-800 text-white ml-28 font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline"
              
            >
              Register
            </button>
          </form>
          <p className="mt-2 text-xs text-gray-700 ml-24">
            Already have an account?
            <Link to="/user/login" className="text-blue-500 underline">
              Login
            </Link>
          </p>
          {/* <button
            type="button"
            className="bg-white hover:bg-gray-100 text-black font-bold py-2 px-4 rounded-full mt-6 focus:outline-none focus:shadow-outline flex items-center ml-28"
          >
            <FcGoogle className="mr-2" />
            Google
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Register;
