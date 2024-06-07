import React from 'react'
import Navbar from '../../components/doctor/Navbar/navbar'
import PatientDetailPage from '../../components/doctor/singlePatientDetailsPage'


const SinglePagePatient :React.FC = () => {
  return (
    <>
    <Navbar/> 
    <PatientDetailPage/>
    </>
    
  )
}

export default SinglePagePatient;