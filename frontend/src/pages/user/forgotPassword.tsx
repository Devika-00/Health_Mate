import React from "react";
import { Link } from "react-router-dom";
import { USER_API, emailRegex } from "../../constants";
import { useFormik } from "formik";
import axios from "axios";
import showToast from "../../utils/toaster";

const ForgotPassword: React.FC = () => {
  const formik = useFormik({
    initialValues: { email: "" },
    validate: ({ email }) => {
      let errors: { email?: string } = {};

      if (!email.trim().length) errors.email = "Required*";
      else if (!emailRegex.test(email)) errors.email = "Invalid email address";
      return errors;
    },
    onSubmit: ({ email }) => {
      axios
        .post(USER_API + "/forgot_password", { email })
        .then(({ data }) => showToast(data.message, "success"))
        .catch(({ response }) => {
          showToast(response.data.message, "error");
        });
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover">
      <div className="w-96 p-8 bg-gray-200 rounded-lg shadow-lg">
        <h2 className="font-extrabold text-blue-900 text-3xl mb-2">
          Forgot Password
        </h2>
        <p className="mt-2 text-xs text-blue-900 mb-6"></p>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email">
              <p className="block text-blue-900 ml-1">Email address</p>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                placeholder="Enter email address"
                {...formik.getFieldProps("email")}
              />
              {!formik.errors.email ||
                (formik.touched.email && (
                  <p className="text-red-500">{formik.errors.email}</p>
                ))}
            </label>
          </div>
          <button
            type="submit"
            className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline mt-5 mb-5"
          >
            Reset Password
          </button>
          <p className="text-center mr-16">
            Remember password ?
            <Link
              to="/user/auth/login"
              className="text-indigo-600 font-medium inline-flex space-x-1 items-center"
            >
              <span>Login now </span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
