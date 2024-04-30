import React from 'react'
import Navbar from '../../components/doctor/Navbar/navbar'
import Footer from '../../components/doctor/Footer/Footer'
import DoctorStatusPage from '../../components/doctor/doctorStatus Page'


const DoctorStatus :React.FC = () => {
  return (
    <>
    <Navbar/> 
    <DoctorStatusPage/>
    <Footer style={''}/>
    </>
    
  )
}

export default DoctorStatus;