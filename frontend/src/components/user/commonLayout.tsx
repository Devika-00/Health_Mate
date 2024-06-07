// src/components/CommonLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer/Footer'; // Assuming Footer is in the same folder

const CommonLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default CommonLayout;
