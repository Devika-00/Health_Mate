import React from 'react';
import {  doctorbanner } from '../../assets/images';

const Banner: React.FC = () => {
  return (
    <main className="flex-1 relative">
      <img src={doctorbanner} alt="Center" className="w-full h-full object-cover"/>
      <div className="absolute inset-0 flex justify-center items-center md:justify-start md:ml-10">
        <div className="bg-white bg-opacity-75 p-6 rounded-lg shadow-lg text-center md:ml-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">Caring for Life</h1>
          <h2 className="text-2xl font-semibold text-blue-700">Leading the Way in Medical Excellence</h2>
        </div>
      </div>
    </main>
  );
  
};

export default Banner;
