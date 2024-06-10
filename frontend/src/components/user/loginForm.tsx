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

  const handleGoogleSignIn = (user: {
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-center text-blue-900">Login</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="text"
              id="email"
              className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              {...formik.getFieldProps("email")}
            />
            {formik.errors.email && formik.touched.email && (
              <div className="text-sm text-red-500">{formik.errors.email}</div>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
            <input
              type="password"
              id="password"
              className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              {...formik.getFieldProps("password")}
            />
            {formik.errors.password && formik.touched.password && (
              <div className="text-sm text-red-500">{formik.errors.password}</div>
            )}
            <Link to="/user/forgot-password" className="text-sm text-gray-500 hover:underline mt-2 block text-right">Forgot Password?</Link>
          </div>
          <div className="flex flex-col items-center">
            <button
              type="submit"
              className="w-full py-2 text-white bg-blue-900 rounded-lg font-bold hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Login"}
            </button>
            <Link
              to="/doctor/login"
              className="mt-4 text-sm font-semibold text-indigo-900 hover:text-indigo-500"
            >
              Login as Doctor
            </Link>
          </div>
        </form>
        <p className="text-center text-sm text-gray-700">
          Don't have an account? <Link to="/user/register" className="text-blue-500 hover:underline">Create Account</Link>
        </p>
        <div className="flex justify-center mt-4">
          <GoogleLogin
            onSuccess={(credentialResponse: any) => {
              const data: {
                name: string;
                email: string;
                picture: string;
                email_verified: boolean;
              } = jwtDecode(credentialResponse?.credential);
              handleGoogleSignIn(data);
            }}
            onError={() => {
              showToast("Login Failed", "error");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
