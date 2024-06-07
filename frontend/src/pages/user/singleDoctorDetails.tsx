import React from 'react';
import Navbar from '../../components/user/Navbar/navbar';
import Footer from '../../components/user/Footer/Footer';
import DoctorDetailsPage from '../../components/user/SingleDoctor';



const singleDoctorDetails: React.FC = () => {
  return (
    <>
      <Navbar />
      
      <DoctorDetailsPage/>
    
    </>
  );
};

export default singleDoctorDetails;