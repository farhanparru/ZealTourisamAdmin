// eslint-disable-next-line no-unused-vars
import React from 'react';
import { FaCalendarAlt, FaUsers, FaMoneyBillWave, FaMosque, FaUmbrellaBeach } from 'react-icons/fa';
import { BiSolidPlaneAlt } from 'react-icons/bi';
import { Line } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
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
      label: 'Revenue (AED)',
      data: [1100, 4200, 2800, 5900, 3800, 4100, 6700],
      fill: true,
      backgroundColor: 'rgba(214, 174, 83, 0.2)',
      borderColor: '#d6ae53',
      tension: 0.4,
    }],
  };

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

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header with UAE-inspired design - mobile optimized */}
      <div className="mb-6 p-4 rounded-lg bg-gradient-to-r from-[#d6ae53] to-[#00843D] text-white shadow-lg">
        <h1 className="text-xl md:text-3xl font-bold">Al Safar Travel Management</h1>
        <p className="text-white/90 text-sm md:text-base">Welcome to your dashboard</p>
      </div>

      {/* Welcome Section */}
      <div className="mb-6">
        <WelcomeBox />
      </div>

      {/* Top Statistics Cards - stacked on mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Bookings Card */}
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-md border-t-4 border-[#d6ae53] relative overflow-hidden">
          <div className="absolute -right-3 -top-3 text-[#d6ae53]/10 text-4xl md:text-6xl">
            <BiSolidPlaneAlt />
          </div>
          <div className="flex items-center">
            <div className="p-2 md:p-3 rounded-full bg-[#d6ae53]/10 text-[#d6ae53] mr-3 md:mr-4">
              <FaCalendarAlt className="text-lg md:text-xl" />
            </div>
            <div>
              <h4 className="text-sm md:text-lg font-semibold text-gray-600">Total Bookings</h4>
              <p className="text-xl md:text-2xl font-bold">2,450</p>
            </div>
          </div>
          <div className="mt-2 md:mt-4 text-xs md:text-sm flex items-center">
            <span className="text-green-500 flex items-center">
              <svg className="w-3 h-3 md:w-4 md:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              +12.5%
            </span>
            <span className="text-gray-400 ml-1 md:ml-2">vs last month</span>
          </div>
        </div>

        {/* Customers Card */}
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-md border-t-4 border-[#00843D] relative overflow-hidden">
          <div className="absolute -right-3 -top-3 text-[#00843D]/10 text-4xl md:text-6xl">
            <FaUsers />
          </div>
          <div className="flex items-center">
            <div className="p-2 md:p-3 rounded-full bg-[#00843D]/10 text-[#00843D] mr-3 md:mr-4">
              <FaUsers className="text-lg md:text-xl" />
            </div>
            <div>
              <h4 className="text-sm md:text-lg font-semibold text-gray-600">New Customers</h4>
              <p className="text-xl md:text-2xl font-bold">3,845</p>
            </div>
          </div>
          <div className="mt-2 md:mt-4 text-xs md:text-sm flex items-center">
            <span className="text-green-500 flex items-center">
              <svg className="w-3 h-3 md:w-4 md:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              +8.2%
            </span>
            <span className="text-gray-400 ml-1 md:ml-2">vs last month</span>
          </div>
        </div>

        {/* Earnings Card */}
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-md border-t-4 border-[#E30613] relative overflow-hidden">
          <div className="absolute -right-3 -top-3 text-[#E30613]/10 text-4xl md:text-6xl">
            <FaMoneyBillWave />
          </div>
          <div className="flex items-center">
            <div className="p-2 md:p-3 rounded-full bg-[#E30613]/10 text-[#E30613] mr-3 md:mr-4">
              <FaMoneyBillWave className="text-lg md:text-xl" />
            </div>
            <div>
              <h4 className="text-sm md:text-lg font-semibold text-gray-600">Total Earnings</h4>
              <p className="text-xl md:text-2xl font-bold">AED 89,420</p>
            </div>
          </div>
          <div className="mt-2 md:mt-4 text-xs md:text-sm flex items-center">
            <span className="text-green-500 flex items-center">
              <svg className="w-3 h-3 md:w-4 md:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              +15.3%
            </span>
            <span className="text-gray-400 ml-1 md:ml-2">vs last month</span>
          </div>
        </div>

        {/* Popular Package - full width on small screens */}
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-md border-t-4 border-[#5b2f12] relative overflow-hidden col-span-1 sm:col-span-2 lg:col-span-1">
          <div className="absolute -right-3 -top-3 text-[#5b2f12]/10 text-4xl md:text-6xl">
            <FaUmbrellaBeach />
          </div>
          <div className="flex items-center">
            <div className="p-2 md:p-3 rounded-full bg-[#5b2f12]/10 text-[#5b2f12] mr-3 md:mr-4">
              <FaMosque className="text-lg md:text-xl" />
            </div>
            <div>
              <h4 className="text-sm md:text-lg font-semibold text-gray-600">Top Package</h4>
              <p className="text-lg md:text-xl font-bold">Desert Safari & Burj Khalifa</p>
            </div>
          </div>
          <div className="mt-2 md:mt-4 text-xs md:text-sm flex items-center">
            <span className="text-[#d6ae53] font-medium">1,240 bookings</span>
          </div>
        </div>
      </div>

      {/* Charts Section - stacked on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Revenue Overview */}
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-md lg:col-span-2">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 md:mb-6">
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-0">Revenue Overview (AED)</h3>
            <select className="bg-gray-100 border border-gray-200 rounded-lg px-3 py-1 text-xs md:text-sm w-full md:w-auto">
              <option>This Week</option>
              <option>This Month</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-64 md:h-auto">
            <Line 
              data={revenueData} 
              options={{
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
              }} 
            />
          </div>
        </div>

        {/* Top Destinations */}
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-md">
          <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6">Top UAE Destinations</h3>
          <div className="h-48 md:h-64">
            <Pie 
              data={destinationData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: window.innerWidth < 768 ? 'bottom' : 'right',
                  },
                },
              }} 
            />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 md:gap-3">
            {destinationData.labels.map((label, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-2 h-2 md:w-3 md:h-3 rounded-full mr-2" 
                  style={{ backgroundColor: destinationData.datasets[0].backgroundColor[index] }}
                ></div>
                <span className="text-xs md:text-sm font-medium truncate">{label}</span>
                <span className="text-xs md:text-sm text-gray-500 ml-auto">{destinationData.datasets[0].data[index]}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Bookings Section - horizontal scroll on mobile */}
      <div className="bg-white p-4 md:p-6 rounded-xl shadow-md overflow-hidden">
        <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6">Recent Bookings</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
                <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package</th>
                <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount (AED)</th>
                <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { id: '#BK-1254', customer: 'Ahmed Al Maktoum', package: 'Dubai City Tour', date: '12 Jun 2023', amount: '1,250', status: 'Confirmed' },
                { id: '#BK-1253', customer: 'Fatima Al Qasimi', package: 'Desert Safari', date: '11 Jun 2023', amount: '890', status: 'Completed' },
                { id: '#BK-1252', customer: 'Mohammed Al Farsi', package: 'Abu Dhabi Day Trip', date: '10 Jun 2023', amount: '1,100', status: 'Confirmed' },
                { id: '#BK-1251', customer: 'Layla Al Nahyan', package: 'Burj Khalifa At The Top', date: '09 Jun 2023', amount: '450', status: 'Pending' },
                { id: '#BK-1250', customer: 'Omar Al Sharqi', package: 'Dhow Cruise Dinner', date: '08 Jun 2023', amount: '680', status: 'Completed' },
              ].map((booking, index) => (
                <tr key={index}>
                  <td className="px-3 py-3 md:px-6 md:py-4 whitespace-nowrap text-xs md:text-sm font-medium text-[#d6ae53]">{booking.id}</td>
                  <td className="px-3 py-3 md:px-6 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500 truncate max-w-[100px]">{booking.customer}</td>
                  <td className="px-3 py-3 md:px-6 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500 truncate max-w-[100px]">{booking.package}</td>
                  <td className="px-3 py-3 md:px-6 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500">{booking.date}</td>
                  <td className="px-3 py-3 md:px-6 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500">{booking.amount}</td>
                  <td className="px-3 py-3 md:px-6 md:py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 
                        booking.status === 'Completed' ? 'bg-blue-100 text-blue-800' : 
                        'bg-yellow-100 text-yellow-800'}`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;