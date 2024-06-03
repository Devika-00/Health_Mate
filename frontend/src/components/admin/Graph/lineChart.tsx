// LineGraph.tsx
import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface LineGraphProps {
  doctors: any[];
  users: any[];
  appoinments: any[];
}

const LineGraph: React.FC<LineGraphProps> = ({ doctors, users, appoinments }) => {
  const [labels, setLabels] = useState<string[]>([]);
  const [appointmentsData, setAppointmentsData] = useState<number[]>([]);
  const [usersData, setUsersData] = useState<number[]>([]);
  const [doctorsData, setDoctorsData] = useState<number[]>([]);

  useEffect(() => {
    const generateMonthlyCounts = (data: any[], key: string) => {
      const counts = Array(12).fill(0);
      data.forEach(item => {
        const date = new Date(item[key]);
        const month = date.getMonth();
        counts[month]++;
      });
      return counts;
    };

    const monthlyLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    const doctorsMonthlyCounts = generateMonthlyCounts(doctors, 'createdAt');
    const usersMonthlyCounts = generateMonthlyCounts(users, 'createdAt');
    const appointmentsMonthlyCounts = generateMonthlyCounts(appoinments, 'createdAt');

    setLabels(monthlyLabels);
    setDoctorsData(doctorsMonthlyCounts);
    setUsersData(usersMonthlyCounts);
    setAppointmentsData(appointmentsMonthlyCounts);
  }, [doctors, users, appoinments]);

  const data = {
    labels,
    datasets: [
      {
        label: 'Appointments',
        data: appointmentsData,
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.4,
      },
      {
        label: 'Users',
        data: usersData,
        fill: false,
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgb(153, 102, 255)',
        tension: 0.4,
      },
      {
        label: 'Doctors',
        data: doctorsData,
        fill: false,
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgb(255, 159, 64)',
        tension: 0.4,
      },
    ],
  };

  const maxCount = Math.max(...appointmentsData, ...usersData, ...doctorsData) + 2;

  const options: any = {
    responsive: true,
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'Months',
          color: '#333',
          font: {
            size: 14
          }
        },
        ticks: {
          color: '#333',
          font: {
            size: 12
          }
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Counts',
          color: '#333',
          font: {
            size: 14
          }
        },
        ticks: {
          color: '#333',
          font: {
            size: 12
          }
        },
        max: maxCount
      },
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#333',
          font: {
            size: 14,
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleFont: { size: 16 },
        bodyFont: { size: 14 },
        footerFont: { size: 12 }
      }
    },
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl mt-6">
      <h2 className="text-lg font-bold mb-4">Graph Overview</h2>
      <div className="h-112">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default LineGraph;
