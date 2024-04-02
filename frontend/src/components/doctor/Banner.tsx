import React from 'react'
import {doctorbanner} from '../../assets/images'


const Banner:React.FC = () => {
  return (
    <>
      <div className="w-full h-[80vh]">
      <img src={doctorbanner} alt="Banner Image" className="w-full h-full  " />
      <div className="absolute top-1/2 ml-72 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <h1 className="text-3xl font-bold text-blue-900 mb-4 mr-9">Caring for Life</h1>
          <h2 className="text-3xl font-bold text-blue-900 mb-4">Leading the Way</h2>
          <h3 className="text-3xl font-bold text-blue-900 mb-8 ml-14">in Medical Excellence</h3>
        </div>
    </div>
    </>
  )
}

export default Banner