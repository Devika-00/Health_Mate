import { useNavigate, useParams } from "react-router-dom";
import { validateResetPassword } from "../../utils/validation";
import axios from "axios";
import { USER_API } from "../../constants";
import showToast from "../../utils/toaster";
import { useFormik } from "formik";

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: validateResetPassword,
    onSubmit: ({ password }) => {
      axios
        .post(USER_API + `/reset_password/${id}`, { password })
        .then(({ data }) => {
          showToast(data.message, "success");
          navigate("/user/login");
        })
        .catch(({ response }) => showToast(response.data.message, "error"));
    },
  });

  return (
    <div className="bg-white-900 h-screen flex justify-center items-center">
      <div className="max-w-md w-full bg-blue-100 p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4 text-center text-blue-900">
          Reset Password
        </h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-lg font-medium text-blue-900"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-lg sm:text-lg border-gray-300 rounded-md py-2"
              {...formik.getFieldProps("password")}
            />
            {!formik.errors.password ||
              (formik.touched.password && (
                <p className="text-red-500">{formik.errors.password}</p>
              ))}
          </div>
          <div className="mb-6">
            <label
              htmlFor="confirm-password"
              className="block text-lg font-medium text-blue-900"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-lg sm:text-lg border-gray-300 rounded-md py-2"
              {...formik.getFieldProps("confirmPassword")}
            />
            {!formik.errors.confirmPassword ||
              (formik.touched.confirmPassword && (
                <p className="text-red-500">{formik.errors.confirmPassword}</p>
              ))}
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-blue-900 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
