import React from "react";
import Navbar from "../../components/user/Navbar/navbar";

import AppointmentOnlineBookingPage from "../../components/user/onlineBookingPage";

const Appoinment: React.FC = () => {
  return (
    <>
      <Navbar />
      <AppointmentOnlineBookingPage />
    </>
  );
};

export default Appoinment;
