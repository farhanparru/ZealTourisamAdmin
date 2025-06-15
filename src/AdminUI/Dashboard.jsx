// eslint-disable-next-line no-unused-vars
import React from 'react';
import { FaCalendarAlt, FaUsers, FaMoneyBillWave, FaMosque, FaUmbrellaBeach } from 'react-icons/fa';
import { BiSolidPlaneAlt } from 'react-icons/bi';
import { Line, Pie } from 'react-chartjs-2';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
  // Revenue data for line chart
  const revenueData = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [{
      label: 'Revenue (AED)',
      data: [1100, 4200, 2800, 5900, 3800, 4100, 6700],
      fill: true,
      backgroundColor: 'rgba(214, 174, 83, 0.2)',
      borderColor: '#d6ae53',
      tension: 0.4,
    }],
  };

  // Destination data for pie chart
  const destinationData = {
    labels: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ras Al Khaimah'],
    datasets: [{
      data: [45, 28, 17, 10],
      backgroundColor: [
        '#d6ae53', // Gold
        '#00843D', // UAE green
        '#E30613', // UAE red
        '#5b2f12'  // Desert brown
      ],
      borderWidth: 0,
    }]
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0,0,0,0.05)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  return (
    <div className="p-2 sm:p-4 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-3 sm:mb-5 p-3 rounded-lg bg-gradient-to-r from-[#d6ae53] to-[#00843D] text-white shadow-lg">
        <h1 className="text-lg sm:text-2xl md:text-3xl font-bold">Al Safar Travel Management</h1>
        <p className="text-white/90 text-xs sm:text-base">Welcome to your dashboard</p>
      </div>

      {/* Welcome Section */}
      <div className="mb-3 sm:mb-5">
        <WelcomeBox />
      </div>

      {/* Statistics Cards - Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-3 sm:mb-5">
        {/* Bookings Card */}
        <div className="bg-white p-2 sm:p-4 rounded-lg shadow-md border-t-4 border-[#d6ae53] relative overflow-hidden">
          <div className="absolute -right-2 -top-2 text-[#d6ae53]/10 text-2xl sm:text-4xl">
            <BiSolidPlaneAlt />
          </div>
          <div className="flex items-center">
            <div className="p-1 sm:p-3 rounded-full bg-[#d6ae53]/10 text-[#d6ae53] mr-2">
              <FaCalendarAlt className="text-sm sm:text-lg" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-gray-600">Total Bookings</h4>
              <p className="text-base sm:text-xl font-bold">2,450</p>
            </div>
          </div>
          <div className="mt-1 sm:mt-2 text-xs flex items-center">
            <span className="text-green-500 flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              +12.5%
            </span>
            <span className="text-gray-400 ml-1">vs last month</span>
          </div>
        </div>

        {/* Customers Card */}
        <div className="bg-white p-2 sm:p-4 rounded-lg shadow-md border-t-4 border-[#00843D] relative overflow-hidden">
          <div className="absolute -right-2 -top-2 text-[#00843D]/10 text-2xl sm:text-4xl">
            <FaUsers />
          </div>
          <div className="flex items-center">
            <div className="p-1 sm:p-3 rounded-full bg-[#00843D]/10 text-[#00843D] mr-2">
              <FaUsers className="text-sm sm:text-lg" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-gray-600">New Customers</h4>
              <p className="text-base sm:text-xl font-bold">3,845</p>
            </div>
          </div>
          <div className="mt-1 sm:mt-2 text-xs flex items-center">
            <span className="text-green-500 flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              +8.2%
            </span>
            <span className="text-gray-400 ml-1">vs last month</span>
          </div>
        </div>

        {/* Earnings Card */}
        <div className="bg-white p-2 sm:p-4 rounded-lg shadow-md border-t-4 border-[#E30613] relative overflow-hidden">
          <div className="absolute -right-2 -top-2 text-[#E30613]/10 text-2xl sm:text-4xl">
            <FaMoneyBillWave />
          </div>
          <div className="flex items-center">
            <div className="p-1 sm:p-3 rounded-full bg-[#E30613]/10 text-[#E30613] mr-2">
              <FaMoneyBillWave className="text-sm sm:text-lg" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-gray-600">Total Earnings</h4>
              <p className="text-base sm:text-xl font-bold">AED 89,420</p>
            </div>
          </div>
          <div className="mt-1 sm:mt-2 text-xs flex items-center">
            <span className="text-green-500 flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              +15.3%
            </span>
            <span className="text-gray-400 ml-1">vs last month</span>
          </div>
        </div>

        {/* Popular Package Card */}
        <div className="bg-white p-2 sm:p-4 rounded-lg shadow-md border-t-4 border-[#5b2f12] relative overflow-hidden">
          <div className="absolute -right-2 -top-2 text-[#5b2f12]/10 text-2xl sm:text-4xl">
            <FaUmbrellaBeach />
          </div>
          <div className="flex items-center">
            <div className="p-1 sm:p-3 rounded-full bg-[#5b2f12]/10 text-[#5b2f12] mr-2">
              <FaMosque className="text-sm sm:text-lg" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-gray-600">Top Package</h4>
              <p className="text-sm sm:text-base font-bold truncate">Desert Safari & Burj Khalifa</p>
            </div>
          </div>
          <div className="mt-1 sm:mt-2 text-xs sm:text-sm flex items-center">
            <span className="text-[#d6ae53] font-medium">1,240 bookings</span>
          </div>
        </div>
      </div>

      {/* Charts Section - Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 sm:gap-4">
        {/* Revenue Overview - Now taking 2/3 of the width */}
        <div className="bg-white p-2 sm:p-4 rounded-lg shadow-md lg:col-span-2">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 sm:mb-4">
            <h3 className="text-sm sm:text-lg font-bold text-gray-800 mb-1 sm:mb-0">Revenue Overview (AED)</h3>
            <select className="bg-gray-100 border border-gray-200 rounded-lg px-2 py-1 text-xs sm:text-sm w-full sm:w-auto">
              <option>This Week</option>
              <option>This Month</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-48 sm:h-72 md:h-80">
            <Line data={revenueData} options={chartOptions} />
          </div>
        </div>

        {/* Top Destinations - Now taking 1/3 of the width */}
        <div className="bg-white p-2 sm:p-4 rounded-lg shadow-md">
          <h3 className="text-sm sm:text-lg font-bold text-gray-800 mb-2 sm:mb-4">Top UAE Destinations</h3>
          <div className="h-40 sm:h-56 md:h-64">
            <Pie data={destinationData} options={pieOptions} />
          </div>
          <div className="mt-2 sm:mt-4 grid grid-cols-2 gap-2">
            {destinationData.labels.map((label, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-2 h-2 sm:w-3 sm:h-3 rounded-full mr-2" 
                  style={{ backgroundColor: destinationData.datasets[0].backgroundColor[index] }}
                ></div>
                <span className="text-xs sm:text-sm font-medium truncate">{label}</span>
                <span className="text-xs sm:text-sm text-gray-500 ml-auto">{destinationData.datasets[0].data[index]}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;