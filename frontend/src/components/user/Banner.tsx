import React from 'react';
import { useNavigate } from 'react-router-dom';
import { banner } from '../../assets/images';

const Banner: React.FC = () => {
  const navigate = useNavigate();

  const handleAboutUsClick = () => {
    navigate('/user/aboutus');
  };

  return (
    <div className="relative w-full h-[80vh]">
      <img src={banner} alt="Banner Image" className="w-full h-full" />
      <div className="absolute top-1/2 left-32 transform -translate-y-1/2 text-left p-4 md:p-0">
        <h1 className="text-xl md:text-3xl font-bold text-white mb-2 md:mb-4">Caring for Life</h1>
        <h2 className="text-xl md:text-3xl font-bold text-white mb-2 md:mb-4">Leading the Way</h2>
        <h3 className="text-xl md:text-3xl font-bold text-white mb-4 md:mb-8">in Medical Excellence</h3>
        <button
          className="bg-white text-blue-500 py-2 px-4 rounded-lg text-sm md:text-lg font-semibold hover:bg-blue-100"
          onClick={handleAboutUsClick}
        >
          About Us
        </button>
      </div>
    </div>
  );
};

export default Banner;
