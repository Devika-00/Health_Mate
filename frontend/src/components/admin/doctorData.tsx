import React, { useState } from "react";
import { DoctorInterface } from "../../types/DoctorInterface";
import axiosJWT from "../../utils/axiosService";
import { ADMIN_API } from "../../constants";
import { Link } from "react-router-dom";

const DoctorData: React.FC<DoctorInterface> = ({
  _id,
  doctorName,
  email,
  department,
  isVerified,
  isBlocked,
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(!!isBlocked);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    axiosJWT.patch(ADMIN_API + `/block_doctor/${_id}`).catch((err) => console.log(err));
  };

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="px-6 py-4 text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {_id}
      </td>
      <td className="px-6 py-4 text-left">{doctorName}</td>
      <td className="px-6 py-4 text-left">{email}</td>
      <td className="px-6 py-4 text-left">{department}</td>
      <td className="px-6 py-4 text-left">{isVerified ? 'Yes' : 'No'}</td>
      <td className="px-6 py-4 text-left">
        <div className="flex items-center gap-2">
          <div
            className={`w-3 h-3 rounded-full ${
              isChecked ? "bg-red-500" : "bg-green-400"
            }`}
          ></div>
          <p>{isChecked ? "Blocked" : "Active"}</p>
        </div>
      </td>
      <td className="px-6 py-4 text-left">
        <Link to={`/doctor/${_id}`} className="text-blue-500 hover:underline">
          View Details
        </Link>
      </td>
      <td className="px-6 py-4 text-left">
        <label className="flex cursor-pointer select-none items-center">
          <div className="relative">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
              className="sr-only"
            />
            <div
              className={`box block h-6 w-10 rounded-full ${
                isChecked ? "bg-red-500" : "bg-primary"
              }`}
            ></div>
            <div
              className={`absolute left-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white transition ${
                isChecked ? "translate-x-full" : ""
              }`}
            ></div>
          </div>
        </label>
      </td>
    </tr>
  );
};

export default DoctorData;
