import React from 'react'
import Navbar from '../../components/doctor/Navbar/navbar'
import Banner from '../../components/doctor/Banner'
import Footer from '../../components/doctor/Footer/Footer'
import Body from '../../components/doctor/Body'

const doctorDashboard:React.FC = () => {
  return (
    <>
    <Navbar/> 
    <Banner/>
    <Body/>
    <Footer/>
    </>
    
  )
}

export default doctorDashboard