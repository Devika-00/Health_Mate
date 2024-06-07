import React from "react";
import { useFormik } from "formik";
import { useState } from "react";
import axios from "axios";
import { useAppDispatch } from "../../redux/store/Store";
import { setUser } from "../../redux/slices/UserSlice";
import showToast from "../../utils/toaster";
import { useNavigate, Link } from "react-router-dom";
import { validateLogin } from "../../utils/validation";
import { USER_API } from "../../constants";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

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
        .post(USER_API + "/login", { email, password })
        .then(({ data }) => {
          const access_token = data.accessToken;
          const { name, role, _id } = data.user;
          localStorage.setItem("access_token", access_token);
          showToast(data.message, "success");
          dispatch(setUser({ isAuthenticated: true, name, role, id: _id }));
          navigate("/");
        })
        .catch(({ response }) => {
          setIsSubmitting(false);
          showToast(response?.data?.message, "error");
        });
    },
  });

  const handleGooglSignIn = (user: {
    name: string;
    email: string;
    picture: string;
    email_verified: boolean;
  }) => {
    axios
      .post(USER_API + "/google_signIn", { user })
      .then(({ data }) => {
        const { message, user, accessToken } = data;
        localStorage.setItem("access_token", accessToken);
        showToast(message, "success");
        dispatch(
          setUser({
            name: user.name,
            isAuthenticated: true,
            role: user.role,
            id: user._id,
          })
        );
        navigate("/");
      })
      .catch(({ response }) => showToast(response.data.message, "error"));
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex">
        <div className="w-96 p-8 bg-gray-300 rounded-lg shadow-lg ml-8">
          <h2 className="font-extrabold text-blue-900 text-3xl mb-5 ml-28">
            Login
          </h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mr-64">
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
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 mr-64">
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
              <Link
                to="/user/forgot-password"
                className="text-gray-500 hover:underline block ml-48"
              >
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-6 mt-4 rounded-lg focus:outline-none focus:shadow-outline ml-28"
              disabled={isSubmitting ? true : false}
            >
              Login
            </button>
          </form>
          <p className="mt-2 text-xs text-gray-700 ml-24">
            Don,t have an account?
          </p>
          <Link
            to="/user/register"
            className="text-blue-500 mt-2 text-xs ml-28 underline"
          >
            Create Account
          </Link>

          <div className="px-4 py-2 w-full  flex justify-center gap-2 ">
            <GoogleLogin
              onSuccess={(credentialResponse: any) => {
                const data: {
                  name: string;
                  email: string;
                  picture: string;
                  email_verified: boolean;
                } = jwtDecode(credentialResponse?.credential);
                handleGooglSignIn(data);
              }}
              onError={() => {
                showToast("Login Failed", "error");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
