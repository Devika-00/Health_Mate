// DonutChart.tsx
import  { FC, useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axiosJWT from '../../../utils/axiosService';
import { ADMIN_API } from '../../../constants';

const DonutChart: FC = () => {
    const [doctors, setDoctors] = useState<[]>([]);
    const [users, setUsers] = useState<[]>([]);
    const [appoinments, setAppoinments] = useState<[]>([]);
  const [chartData, setChartData] = useState({
    options: {
      labels: ['Doctors', 'Users','Appoinments'],
    },
    series: [0, 0, 0],
  });

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axiosJWT.get(`${ADMIN_API}/doctors`);
        console.log(response,"doctorsss")
        if (Array.isArray(response.data.doctors)) {
          setDoctors(response.data.doctors);
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axiosJWT.get(`${ADMIN_API}/users`);
        console.log(response,"userssssssssss")
        if (Array.isArray(response.data.users)) {
          setUsers(response.data.users);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const fetchAppoinments = async () => {
      try {
        const response = await axiosJWT.get(`${ADMIN_API}/appoinments`);
        console.log(response,"appoinments")
        if (Array.isArray(response.data.appoinments)) {
          setAppoinments(response.data.appoinments);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchDoctors();
    fetchUsers();
    fetchAppoinments();
  }, []);


  useEffect(() => {

    setChartData({
      options: {
        labels: ['Doctors', 'Users', 'Appoinments'],
      },
      series:  [doctors.length, users.length,appoinments.length],
    });
  },[doctors, users]);

  return (
    <div className="flex justify-center items-center ml-6 shadow-lg rounded-lg p-4 bg-white mt-1">
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="donut"
        width="380"
      />
    </div>
  );
};

export default DonutChart;
