// eslint-disable-next-line no-unused-vars
import React from 'react';
import { FaCalendar, FaUsers, FaDollarSign } from 'react-icons/fa'; 
import { Line } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import 'react-calendar/dist/Calendar.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import WelcomeBox from './WelcomeBox';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const revenueData = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [{
      label: 'Revenue',
      data: [300, 500, 200, 800, 450, 300, 600],
      fill: false,
      backgroundColor: 'blue',
      borderColor: 'lightblue',
    }],
  };

  const destinationData = {
    labels: ['Tokyo', 'Sydney', 'Paris', 'Venice'],
    datasets: [{
      data: [35, 28, 22, 15],
      backgroundColor: ['#3498db', '#2ecc71', '#e74c3c', '#f1c40f'],
    }]
  };

  return (
    <div className="p-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {/* Welcome Section */}
      <div className="col-span-full">
        <WelcomeBox />
      </div>

      {/* Top Statistics */}
      <div className="bg-white p-4 rounded shadow-md flex items-center justify-between">
        <div className="flex items-center">
          <FaCalendar className="text-3xl text-blue-500 mr-4" />
          <div>
            <h4 className="text-lg font-bold">Total Bookings</h4>
            <p className="text-2xl">1,200</p>
          </div>
        </div>
        <p className="text-green-500">+2.98%</p>
      </div>

      <div className="bg-white p-4 rounded shadow-md flex items-center justify-between">
        <div className="flex items-center">
          <FaUsers className="text-3xl text-blue-500 mr-4" />
          <div>
            <h4 className="text-lg font-bold">New Customers</h4>
            <p className="text-2xl">2,845</p>
          </div>
        </div>
        <p className="text-red-500">-1.45%</p>
      </div>

      <div className="bg-white p-4 rounded shadow-md flex items-center justify-between">
        <div className="flex items-center">
          <FaDollarSign className="text-3xl text-blue-500 mr-4" />
          <div>
            <h4 className="text-lg font-bold">Total Earnings</h4>
            <p className="text-2xl">$12,890</p>
          </div>
        </div>
        <p className="text-green-500">+3.75%</p>
      </div>

      {/* Revenue Overview */}
      <div className="bg-white p-6 rounded shadow-md col-span-full lg:col-span-2">
        <h3 className="text-xl font-bold mb-4">Revenue Overview</h3>
        <Line data={revenueData} />
      </div>

      {/* Top Destinations */}
      <div className="bg-white p-6 rounded shadow-md col-span-full lg:col-span-1">
        <h3 className="text-xl font-bold mb-4">Top Destinations</h3>
        <Pie data={destinationData} />
        <ul className="mt-4 text-sm">
          <li>Tokyo, Japan - 35%</li>
          <li>Sydney, Australia - 28%</li>
          <li>Paris, France - 22%</li>
          <li>Venice, Italy - 15%</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
