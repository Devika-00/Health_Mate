import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { USER_API } from "../../constants";
import { useFormik } from "formik";
import {
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
} from "../../utils/Set&Get";
import showToast from "../../utils/toaster";
import { useNavigate } from "react-router-dom";

const OTPForm: React.FC = () => {
  const [seconds, setSeconds] = useState(60);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validate: ({ otp }) => {
      const errors: any = {};
      if (!/^\d{6}$/.test(otp)) {
        errors.otp = "OTP must be exactly 6 digits";
      }
      if (!otp.trim().length) errors.otp = "Required";
      return errors;
    },
    onSubmit: ({ otp }) => {
      const userId = getItemFromLocalStorage("userId");
      if (userId) {
        axios
          .post(USER_API + "/verify_otp", { otp, userId })
          .then(({ data }) => {
            showToast(data.message, "success");
            removeItemFromLocalStorage("userId");
            setTimeout(() => navigate("/user/login"), 1000);
          })
          .catch(({ response }) => {
            showToast(response.data.message, "error");
          });
      } else {
        showToast("something went wrong", "error");
        return navigate("/user/login", { replace: true });
      }
    },
  });

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);


  const resendCode=()=>{
    setSeconds(60);
    const userId = getItemFromLocalStorage("userId");
    if(userId){
      axios.post(USER_API+"/resend_otp",{userId})
      .then(({data})=>{
        showToast(data.message,"success")
      })
      .catch(({response})=>{
        showToast(response.data.message,"error");
      });
    }else{
      showToast("something went wrong","error");
      return navigate("/user/login");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center h-screen">
        <div className="w-96 p-8 bg-gray-300 rounded-lg shadow-lg">
          <h2 className="font-extrabold text-blue-900 text-3xl ml-20 mb-2">
            Verify OTP
          </h2>
          <p className="mt-2 text-xs text-blue-900 ml-12 mb-6">
            Please enter the OTP that we send to the mail{" "}
          </p>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              {/* <label htmlFor="otp" className="block text-gray-700 mr-44">Enter the OTP:</label> */}
              <input
                type="text"
                id="otp"
                className=" mb-4 mt-3 w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                placeholder="Enter verification code"
                {...formik.getFieldProps("otp")}
              />
              {formik.errors.otp && formik.touched.otp && (
                <p className="text-red-500 mt-1">{formik.errors.otp}</p>
              )}
            </div>
            <button
              type="submit"
              className="bg-blue-900 ml-28 mt-3 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline"
            >
              Verify
            </button>
            <p className="mt-3 ml-20 text-xs text-gray-700">
              Didn't receive OTP?{" "}
              <button className="text-blue-500 underline focus:outline-none hover:text-blue-700"
              onClick={resendCode}
              disabled={seconds !== 0} 
              >
                Resend OTP
                <span className="font-medium">
                {seconds !== 0 && ` (${seconds}s)`}
              </span>
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OTPForm;
