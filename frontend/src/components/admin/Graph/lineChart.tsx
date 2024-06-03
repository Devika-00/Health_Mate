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
  appointments: any[];
}

const LineGraph: React.FC<LineGraphProps> = ({ doctors, users, appointments }) => {
  const [labels, setLabels] = useState<string[]>([]);
  const [appointmentsData, setAppointmentsData] = useState<number[]>([]);
  const [usersData, setUsersData] = useState<number[]>([]);
  const [doctorsData, setDoctorsData] = useState<number[]>([]);
  const [view, setView] = useState<'monthly' | 'yearly'>('monthly');

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

    const generateYearlyCounts = (data: any[], key: string) => {
      const counts: Record<string, number> = {};
      data.forEach(item => {
        const date = new Date(item[key]);
        const year = date.getFullYear();
        counts[year] = (counts[year] || 0) + 1;
      });
      return counts;
    };

    const monthlyLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    if (view === 'monthly') {
      const doctorsMonthlyCounts = generateMonthlyCounts(doctors, 'createdAt');
      const usersMonthlyCounts = generateMonthlyCounts(users, 'createdAt');
      const appointmentsMonthlyCounts = generateMonthlyCounts(appointments, 'createdAt');

      setLabels(monthlyLabels);
      setDoctorsData(doctorsMonthlyCounts);
      setUsersData(usersMonthlyCounts);
      setAppointmentsData(appointmentsMonthlyCounts);
    } else {
      const doctorsYearlyCounts = generateYearlyCounts(doctors, 'createdAt');
      const usersYearlyCounts = generateYearlyCounts(users, 'createdAt');
      const appointmentsYearlyCounts = generateYearlyCounts(appointments, 'createdAt');

      const years = Array.from(new Set([
        ...Object.keys(doctorsYearlyCounts),
        ...Object.keys(usersYearlyCounts),
        ...Object.keys(appointmentsYearlyCounts),
      ])).map(year => parseInt(year, 10));

      const minYear = Math.min(...years);
      const maxYear = Math.max(...years);

      const yearlyLabels:any = [];
      for (let year = minYear - 2; year <= maxYear + 2; year++) {
        yearlyLabels.push(year.toString());
      }

      const completeYearlyCounts = (counts: Record<string, number>) => {
        const completeCounts = yearlyLabels.map((year: any) => counts[year] || 0);
        return completeCounts;
      };

      setLabels(yearlyLabels);
      setDoctorsData(completeYearlyCounts(doctorsYearlyCounts));
      setUsersData(completeYearlyCounts(usersYearlyCounts));
      setAppointmentsData(completeYearlyCounts(appointmentsYearlyCounts));
    }
  }, [doctors, users, appointments, view]);

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

  const maxCount = Math.max(...appointmentsData, ...usersData, ...doctorsData) + 3;

  const options: any = {
    responsive: true,
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: view === 'monthly' ? 'Months' : 'Years',
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
      <div className="flex mb-4">
        <button 
          className={`mr-2 p-2 rounded ${view === 'monthly' ? 'bg-blue-900 text-white' : 'bg-gray-200'}`} 
          onClick={() => setView('monthly')}
        >
          Monthly
        </button>
        <button 
          className={`p-2 rounded ${view === 'yearly' ? 'bg-blue-900 text-white' : 'bg-gray-200'}`} 
          onClick={() => setView('yearly')}
        >
          Yearly
        </button>
      </div>
      <div className="h-112">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default LineGraph;
