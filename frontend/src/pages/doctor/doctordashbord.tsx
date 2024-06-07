import React from 'react'
import Navbar from '../../components/doctor/Navbar/navbar'
import Banner from '../../components/doctor/Banner'
import Body from '../../components/doctor/Body'

const doctorDashboard:React.FC = () => {
  return (
    <>
    <Navbar/> 
    <Banner/>
    <Body/>
    </>
    
  )
}

export default doctorDashboard