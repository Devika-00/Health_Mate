import React from "react";
import Navbar from "../../components/user/Navbar/navbar";
import OfflineDoctors from "../../components/user/offline-consultation";

const OfflinePage: React.FC = () => {
  return (
    <>
      <Navbar />
      <OfflineDoctors />
    </>
  );
};

export default OfflinePage;
