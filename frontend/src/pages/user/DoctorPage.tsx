import React from 'react';
import Navbar from '../../components/user/Navbar/navbar';
import Footer from '../../components/user/Footer/Footer';
import DoctorListingPage from '../../components/user/doctorListPage';



const DoctorList: React.FC = () => {
  return (
    <>
      <Navbar />
      <DoctorListingPage/>
      <Footer />
    </>
  );
};

export default DoctorList;
