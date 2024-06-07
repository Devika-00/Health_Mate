import React from 'react'
import Navbar from '../../components/doctor/Navbar/navbar'
import PatientListPage from '../../components/doctor/patientList'


const ListPage:React.FC = () => {
  return (
    <>
    <Navbar/> 
    <PatientListPage/>
    </>
    
  )
}

export default ListPage