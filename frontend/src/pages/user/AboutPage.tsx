import React from 'react';
import Navbar from '../../components/user/Navbar/navbar';
import Footer from '../../components/user/Footer/Footer';
import AboutUsPage from '../../components/user/aboutus';



const AboutPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <AboutUsPage/>
     
    </>
  );
};

export default AboutPage;