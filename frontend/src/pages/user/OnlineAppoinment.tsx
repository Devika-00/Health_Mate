import React from 'react';
import Navbar from '../../components/user/Navbar/navbar';
import Footer from '../../components/user/Footer/Footer';
import AppointmentOnlineBookingPage from '../../components/user/onlineBookingPage';




const Appoinment: React.FC = () => {
  return (
    <>
      <Navbar />
     <AppointmentOnlineBookingPage/>
      <Footer />
    </>
  );
};

export default Appoinment;