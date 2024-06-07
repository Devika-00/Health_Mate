// src/components/CommonLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from "../../components/doctor/Footer/Footer" // Assuming Footer is in the same folder

const CommonLayoutDoctor: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main>
        <Outlet />
      </main>
      <Footer style={''} />
    </div>
  );
};

export default CommonLayoutDoctor;
