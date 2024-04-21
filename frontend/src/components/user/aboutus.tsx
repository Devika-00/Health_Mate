import React from 'react';

const AboutUsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">About Us</h1>
      <div className="flex flex-col md:flex-row items-center justify-center">
        <div className="md:w-1/2 mb-4 md:mb-0">
          <img src="https://www.optum.com/health-articles/sites/default/files/images/WhatTypeWellnessVisitRightForMe-Web-1200x800-72_12.jpg" alt="Hospital" className="w-full rounded-lg shadow-md" />
        </div>
        <div className="md:w-1/2 md:pl-8">
          <h2 className="text-2xl font-bold mb-4">Welcome to Health Mate</h2>
          <ul className="list-disc text-lg mb-4 ml-6">
            <li>Best Care for Your Good Health</li>
            <li>A Passion for Healing</li>
            <li>5-Star Care</li>
            <li>All Our Best</li>
            <li>Believe in Us</li>
            <li>Always Caring</li>
            <li>A Legacy of Excellence</li>
          </ul>
          <p className="text-lg mb-4">At Health Mate, we are dedicated to providing exceptional healthcare services. Our team is committed to delivering the highest standard of care with compassion and expertise. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Quisque placerat scelerisque tortor ornare ornare. Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim et.</p>
          <p className="text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque. Convallis felis vitae tortor augue. Velit nascetur proin massa in.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
