import React from 'react'
import Navbar from '../../components/doctor/Navbar/navbar'
import Footer from '../../components/doctor/Footer/Footer'
import ScheduleSlotPage from '../../components/doctor/Scheduleslot'


const SlotPage:React.FC = () => {
  return (
    <>
    <Navbar/> 
    <ScheduleSlotPage/>
    <Footer style={''}/>
    </>
    
  )
}

export default SlotPage