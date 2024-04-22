import React from 'react';
import Navbar from '../../components/user/Navbar/navbar';
import Footer from '../../components/user/Footer/Footer';
import AppointmentBookingPage from '../../components/user/booikngPage';




const Appoinment: React.FC = () => {
  return (
    <>
      <Navbar />
     <AppointmentBookingPage/>
      <Footer />
    </>
  );
};

export default Appoinment;