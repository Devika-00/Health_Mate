import React from 'react';
import Navbar from '../../components/user/Navbar/navbar';
import Footer from '../../components/user/Footer/Footer';
import OfflineDoctors from '../../components/user/offline-consultation';



const OfflinePage: React.FC = () => {
  return (
    <>
      <Navbar />
      <OfflineDoctors/>
      <Footer />
    </>
  );
};

export default OfflinePage;
