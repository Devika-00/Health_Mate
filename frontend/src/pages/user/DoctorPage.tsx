import React from 'react';
import Navbar from '../../components/user/Navbar/navbar';
import DoctorListingPage from '../../components/user/doctorListPage';



const DoctorList: React.FC = () => {
  return (
    <>
      <Navbar />
      <DoctorListingPage/>
      
    </>
  );
};

export default DoctorList;
