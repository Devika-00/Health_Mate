import React, { useEffect, useState } from "react";
import { FaEdit, FaPlus } from "react-icons/fa"; // Import FaPlus for the "Add More" button
import { DepartmentInterface } from "../../interfaces/departmentInterface";
import axiosJWT from "../../utils/axiosService";
import { ADMIN_API } from "../../constants";
import showToast from "../../utils/toaster";

const DepartmentManagement: React.FC = () => {
  const [departments, setDepartments] = useState<DepartmentInterface[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [departmentName, setDepartmentName] = useState<string>("");
  const [currentDepartmentId, setCurrentDepartmentId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axiosJWT.get(`${ADMIN_API}/departments`); 
        setDepartments(response.data.allDepartment); 
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchDepartments();
  }, []);

  const handleToggle = async (id: string) => {
    setDepartments((prevDepartments) =>
      prevDepartments.map((dept) =>
        dept._id === id ? { ...dept, isListed: !dept.isListed } : dept
      )
    );

    try {   
      const response = await axiosJWT.patch(`${ADMIN_API}/unlist_department/${id}`);
      if(response.data.success){
        showToast(response.data.message, "success");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDepartmentName(e.target.value);
  };

  const isDepartmentExist = (name: string) => {
    return departments.some(dept => dept.departmentName.toLowerCase() === name.toLowerCase());
  };

  const handleAddDepartment = async () => {
    if (isDepartmentExist(departmentName)) {
      showToast("Department already exists", "error");
      return;
    }

    const newDepartment: DepartmentInterface = {
      _id: (departments.length + 1).toString(),
      departmentName,
      isListed: true,
    };

    try {
      const response = await axiosJWT.post(`${ADMIN_API}/addDepartment`, newDepartment);

      if (response.data.success) {
        showToast(response.data.message, "success");
        setDepartments(prev => [...prev, newDepartment]);
        setDepartmentName("");
        toggleModal();
      }

    } catch (error) {
      console.error('Error adding department:', error);
      showToast('There was an error adding the department.', "error");
    }
  };

  const handleEditDepartment = async () => {
    if (!currentDepartmentId) return;

    if (isDepartmentExist(departmentName)) {
      showToast("Department already exists", "error");
      return;
    }

    const updatedDepartment = {
      departmentName
    };

    try {
      const response = await axiosJWT.put(`${ADMIN_API}/departments/${currentDepartmentId}`, updatedDepartment);

      if (response.data.success) {
        showToast(response.data.message, "success");
        setDepartments((prevDepartments) =>
          prevDepartments.map((dept) =>
            dept._id === currentDepartmentId ? { ...dept, departmentName } : dept
          )
        );
        setDepartmentName("");
        setCurrentDepartmentId(null);
        toggleModal();
      }
    } catch (error) {
      console.error('Error editing department:', error);
      showToast('There was an error editing the department.', "error");
    }
  };

  const handleEditClick = (department: DepartmentInterface) => {
    setDepartmentName(department.departmentName);
    setCurrentDepartmentId(department._id);
    setIsEditing(true);
    toggleModal();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* "Add More" Button */}
      <div className="flex justify-end ">
        <button
          onClick={() => {
            setDepartmentName("");
            setCurrentDepartmentId(null);
            setIsEditing(false);
            toggleModal();
          }}
          className="flex items-center px-4 py-2 bg-blue-950 text-white rounded-md hover:bg-blue-800 focus:outline-none focus:bg-blue-800"
        >
          <FaPlus className="mr-2" />
          Add More
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center">Department Management</h1>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          {/* Table Headers */}
          <thead className="bg-gradient-to-r from-blue-950 to-indigo-500 text-white">
            {/* Table Rows */}
            <tr>
              {/* Table Data */}
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Serial No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Department Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                list & unlisted
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Edit
              </th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody className="bg-white">
            {/* Map over departments array and render table rows */}
            {departments.map((department, index) => (
              <tr
                key={department._id}
                className="border-b last:border-none hover:bg-gray-100 transition"
              >
                <td className="px-6 py-4 text-left font-medium text-gray-900 whitespace-nowrap">
                  {index + 1}
                </td>
                <td className="px-6 py-4 text-left text-gray-700">{department.departmentName}</td>
                <td className="px-6 py-4 text-left">
                  <label className="flex cursor-pointer select-none items-center">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={department.isListed}
                        onChange={() => handleToggle(department._id)}
                        className="sr-only"
                      />
                      <div
                        className={`box block h-6 w-10 rounded-full ${
                          department.isListed ? "bg-green-500" : "bg-red-500"
                        }`}
                      ></div>
                      <div
                        className={`absolute left-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white transition ${
                          department.isListed ? "translate-x-full" : ""
                        }`}
                      ></div>
                    </div>
                  </label>
                </td>
                <td className="px-6 py-4 text-left">
                  <FaEdit className="text-blue-500 cursor-pointer" onClick={() => handleEditClick(department)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-lg font-bold mb-4 text-center">{isEditing ? "Edit Department" : "Add Department"}</h2>
            <input
              type="text"
              value={departmentName}
              onChange={handleInputChange}
              placeholder="Enter Department Name"
              className="w-full border border-gray-300 rounded-md px-4 py-3 mb-4 text-lg"
            />
            <div className="flex justify-end">
              <button
                onClick={isEditing ? handleEditDepartment : handleAddDepartment}
                className="px-4 py-2 mt-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                {isEditing ? "Edit" : "Add"}
              </button>
              <button
                onClick={toggleModal}

                className="px-4 py-2 ml-2 mt-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentManagement;
