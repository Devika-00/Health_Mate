import React from 'react'
import Navbar from '../../components/doctor/Navbar/navbar'
import Footer from '../../components/doctor/Footer/Footer'
import PatientListPage from '../../components/doctor/patientList'


const ListPage:React.FC = () => {
  return (
    <>
    <Navbar/> 
    <PatientListPage/>
    <Footer style={''}/>
    </>
    
  )
}

export default ListPage