import React from "react";
import Navbar from "../../components/user/Navbar/navbar";
import OnlineDoctors from "../../components/user/online-consultation";

const OnlinePage: React.FC = () => {
  return (
    <>
      <Navbar />
      <OnlineDoctors />
    </>
  );
};

export default OnlinePage;
