import React from "react";
import Navbar from "../../components/user/Navbar/navbar";
import Footer from "../../components/user/Footer/Footer";
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
