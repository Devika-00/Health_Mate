import React from 'react';
import Navbar from '../../components/user/Navbar/navbar';
import Footer from '../../components/user/Footer/Footer';
import AppointmentsListPage from '../../components/user/appoinmentList'



const AppoinmentListPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <AppointmentsListPage/>
      <Footer />
    </>
  );
};

export default AppoinmentListPage;