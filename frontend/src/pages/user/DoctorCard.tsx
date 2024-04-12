import React from 'react';
import { DoctorInterface } from '../../types/DoctorInterface';
import DoctorCard from '../../components/user/DoctorList';
import Navbar from '../../components/user/Navbar/navbar';
import Footer from '../../components/user/Footer/Footer';

interface DoctorListProps {
  doctors: DoctorInterface[];
}

const DoctorList: React.FC<DoctorListProps> = ({ doctors }) => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto my-8">
        <h1 className="text-2xl font-bold mb-4">Meet Our Doctors</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map(doctor => (
            <DoctorCard
              key={doctor._id} // Use _id as key
              doctor={doctor}
              onViewMore={() => {}}
              onAppointment={() => {}}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DoctorList;
