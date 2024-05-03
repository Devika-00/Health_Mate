import React from 'react'
import Navbar from '../../components/doctor/Navbar/navbar'
import Footer from '../../components/doctor/Footer/Footer'
import Calender from '../../components/doctor/celender/Calender'

const SlotPage:React.FC = () => {
  return (
    <>
    <Navbar/> 
    <Calender/>
    <Footer style={''}/>
    </>
    
  )
}

export default SlotPage