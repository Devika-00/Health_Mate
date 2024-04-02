import React from 'react';

const Body: React.FC = () => {
  return (
    <>
      <div className="container mx-auto px-4 py-8 ">
        <h1 className="text-2xl font-bold mb-4">Our Doctors</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ml-8">
          {/* Doctor Card 1 */}
          <div className="bg-white rounded-lg shadow-lg">
            <img src="https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg" alt="Doctor" className=" h-64 object-cover rounded-t-lg" />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">Dr. John Doe</h2>
              <p className="text-gray-600 mb-2">Cardiology</p>
              <p className="text-gray-600 mb-4">Profile:Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">Book Appointment</button>
            </div>
          </div>

          {/* Doctor Card 2 */}
          <div className="bg-white rounded-lg shadow-lg">
            <img src="https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg" alt="Doctor" className="h-64 object-cover rounded-t-lg" />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">Dr. Jane Smith</h2>
              <p className="text-gray-600 mb-2">Orthopedics</p>
              <p className="text-gray-600 mb-4">Profile: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">Book Appointment</button>
            </div>
          </div>

          {/* Doctor Card 3 */}
          <div className="bg-white rounded-lg shadow-lg">
            <img src="https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg" alt="Doctor" className=" h-64 object-cover rounded-t-lg" />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">Dr. David Johnson</h2>
              <p className="text-gray-600 mb-2">Pediatrics</p>
              <p className="text-gray-600 mb-4">Profile: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">Book Appointment</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Body;
