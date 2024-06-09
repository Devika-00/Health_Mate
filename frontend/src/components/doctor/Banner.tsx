import React from 'react';
import { doctorbanner } from '../../assets/images';

const Banner: React.FC = () => {
  return (
    <div className="relative w-full h-[80vh]">
      <img src={doctorbanner} alt="Banner Image" className="w-full h-full object-cover" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center mr-48">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-900 mb-4 ml-10">Caring for Life</h1>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-900 mb-4 ml-14">Leading the Way</h2>
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-900 mb-8 ml-16">in Medical Excellence</h3>
      </div>
    </div>
  );
};

export default Banner;
