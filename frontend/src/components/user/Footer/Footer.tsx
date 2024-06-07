import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-950 text-white py-8 mt-auto w-full">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center md:justify-between">
        <div className="text-center md:text-left">
          <p className="text-2xl font-bold mb-2">Health Mate</p>
          <p className="text-lg mb-4">Leading the Way in Medical Excellence, Trusted Care.</p>
        </div>
        <div className="flex flex-wrap justify-center md:justify-end space-x-4 md:space-x-0 mt-4 md:mt-0">
          <a href="#" className="hover:text-gray-300">Doctors</a>
          <a href="#" className="hover:text-gray-300">Services</a>
          <a href="#" className="hover:text-gray-300">About us</a>
          <a href="#" className="hover:text-gray-300">Appointment</a>
        </div>
        <p className="text-center mt-4 md:mt-0">© 2024 Your Website. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
