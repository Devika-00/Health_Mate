import React from "react";
import Navbar from "../../components/user/Navbar/navbar";
import AppointmentsListPage from "../../components/user/appoinmentList";

const AppoinmentListPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <AppointmentsListPage />
    </>
  );
};

export default AppoinmentListPage;
