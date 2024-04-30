import React from 'react'
import {banner} from '../../assets/images'


const Banner:React.FC = () => {
  return (
    <>
      <div className="w-full h-[80vh]">
      <img src={banner} alt="Banner Image" className="w-full h-full  " />
      <div className="absolute top-1/2 ml-72 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <h1 className="text-3xl font-bold text-white mb-4 mr-9">Caring for Life</h1>
          <h2 className="text-3xl font-bold text-white mb-4">Leading the Way</h2>
          <h3 className="text-3xl font-bold text-white mb-8 ml-14">in Medical Excellence</h3>
          <button className="bg-white text-blue-500 py-2 px-4 rounded-lg text-lg font-semibold hover:bg-blue-100 mr-20">About Us</button>
        </div>
    </div>
    </>
  )
}

export default Banner