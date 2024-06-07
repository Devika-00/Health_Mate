import React from "react";
import Navbar from "../../components/user/Navbar/navbar";
import DoctorDetailsPage from "../../components/user/SingleDoctor";

const singleDoctorDetails: React.FC = () => {
  return (
    <>
      <Navbar />

      <DoctorDetailsPage />
    </>
  );
};

export default singleDoctorDetails;
