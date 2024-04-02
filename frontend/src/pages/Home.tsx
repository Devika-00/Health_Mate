import React from 'react'
import Navbar from '../components/user/Navbar/navbar'
import Banner from '../components/user/Banner'
import Footer from '../components/user/Footer/Footer'
import Body from '../components/user/body'
const Home:React.FC = () => {
  return (
    <>
    <Navbar/> 
    <Banner/>
    <Body/>
    <Footer/>
    </>
    
  )
}

export default Home