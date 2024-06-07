import React, { useEffect, useState } from 'react';
import Navbar from '../../components/user/Navbar/navbar';
import Footer from '../../components/user/Footer/Footer';
import { Link } from 'react-router-dom';
import { BsChatSquareDots, BsWallet } from 'react-icons/bs'; 
import useProfile from "../../hooks/userProfile";
import { MdOutlineModeEdit } from "react-icons/md";

const Profile: React.FC = () => {
  const {
    profile,
    formData,
    error,
    imagePreview,
    isSubmitting,
    handleInputChange,
    handleSubmit,
  } = useProfile();



  return (
    <>
      <Navbar/>
      <h2 className="text-4xl font-bold mt-6 text-center text-blue-900">Profile</h2>
      <div className="flex flex-col items-center justify-center h-screen bg-white">
        <div className="flex flex-col items-center w-2/5 justify-center mb-10 mt-12 bg-blue-900 rounded-lg p-6 shadow-lg text-white relative">
           {/* Wallet button */}
           <Link to="/user/wallet" className="absolute top-4 right-4 bg-gray-100 hover:bg-blue-100 rounded-md p-2 flex items-center">
            <BsWallet className="h-7 w-7 text-blue-900" />
            <span className="ml-2 text-blue-900">Wallet</span>
          </Link>
          
          <div className="relative mb-4">
            <img src={
                  imagePreview
                    ? imagePreview
                    : profile?.profilePicture ?? "https://picsum.photos/200/"
                }  alt="Profile" className="w-32 h-32 rounded-full" />
            <label htmlFor="profile-image" className="absolute bottom-0 right-0 bg-white text-blue-900 rounded-full cursor-pointer border-4 border-white px-2 py-1 ">
              <input type="file" id="profile-image" name='imageFile' className="hidden" onChange={handleInputChange} />
              <MdOutlineModeEdit />
            </label>
          </div>
          {/* Profile Fields */}
          <div className="bg-white w-3/4 p-6 mb-3 rounded-lg shadow-lg">
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-semibold">Name:</label>
              <input type="text" id="name"   value={formData.name} name="name" onChange={handleInputChange} className="border text-gray-700 border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"  />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-semibold">Email:</label>
              <input type="email" id="email" name='email' value={ profile?.email ?? ""} onChange={handleInputChange} className="border text-gray-700 border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"  />
            </div>
            <div className="mb-4">
              <label htmlFor="age" className="block text-gray-700 font-semibold">Age:</label>
              <input type="number" id="age" name='age' value={ formData?.age ?? ""} onChange={handleInputChange} className="border text-gray-700 border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"  />
            </div>
            <div className="mb-4">
              <label htmlFor="phoneNumber" className="block text-gray-700 font-semibold">Phone Number:</label>
              <input type="tel" id="phoneNumber" name='phoneNumber' value={ formData?.phoneNumber ?? ""} onChange={handleInputChange} className="border text-gray-700 border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"  />
            </div>
            <div className="mb-4">
              <label htmlFor="gender" className="block text-gray-700 font-semibold">Gender:</label>
              <select id="gender" name='gender' value={ formData?.gender ?? ""}  onChange={handleInputChange}  className="border text-gray-700 border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-500" >
                <option className='text-gray-700' value="male">Male</option>
                <option className='text-gray-700' value="female">Female</option>
                <option className='text-gray-700' value="others">Others</option>
              </select>
            </div>
            {/* Update Profile Button */}
            <button className="bg-blue-900 text-white py-2 px-4 mt-3 rounded-md hover:bg-blue-800 focus:outline-none focus:ring focus:border-blue-500" onClick={handleSubmit} >Update Profile</button>
          </div>
        </div>
      </div>
     
    </>
  );
};

export default Profile;
