import React from 'react'
import Navbar from '../../components/doctor/Navbar/navbar'
import Footer from '../../components/doctor/Footer/Footer'
import PatientDetailPage from '../../components/doctor/singlePatientDetailsPage'


const SinglePagePatient :React.FC = () => {
  return (
    <>
    <Navbar/> 
    <PatientDetailPage/>
    <Footer style={''}/>
    </>
    
  )
}

export default SinglePagePatient;