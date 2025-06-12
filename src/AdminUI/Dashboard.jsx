// eslint-disable-next-line no-unused-vars
import React from 'react';
// eslint-disable-next-line no-unused-vars
import { FaCalendarAlt, FaUsers, FaMoneyBillWave, FaMosque, FaUmbrellaBeach } from 'react-icons/fa';
// eslint-disable-next-line no-unused-vars
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
        '#d6ae53',
        '#00843D',
        '#E30613',
        '#5b2f12'
      ],
      borderWidth: 0,
    }]
  };

  return (
    <div className="p-3 md:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-4 p-4 rounded-lg bg-gradient-to-r from-[#d6ae53] to-[#00843D] text-white shadow-lg">
        <h1 className="text-xl md:text-2xl font-bold">Al Safar Travel Management</h1>
        <p className="text-white/90 text-sm">Welcome to your dashboard</p>
      </div>

      {/* Welcome Section */}
      <div className="mb-4">
        <WelcomeBox />
      </div>

      {/* Revenue Overview - Fixed Section */}
      <div className="bg-white p-4 rounded-xl shadow-md mb-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800 mb-2 sm:mb-0">Revenue Overview (AED)</h3>
          <select className="bg-gray-100 border border-gray-200 rounded-lg px-3 py-1 text-sm w-full sm:w-auto">
            <option>This Week</option>
            <option>This Month</option>
            <option>This Year</option>
          </select>
        </div>
        <div className="h-64 md:h-80">
          <Line 
            data={revenueData} 
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top',
                  labels: {
                    boxWidth: 12,
                    padding: 20,
                    font: {
                      size: 12
                    }
                  }
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  grid: {
                    color: 'rgba(0,0,0,0.05)'
                  },
                  ticks: {
                    font: {
                      size: 10
                    }
                  }
                },
                x: {
                  grid: {
                    display: false
                  },
                  ticks: {
                    font: {
                      size: 10
                    }
                  }
                }
              }
            }} 
          />
        </div>
      </div>

      {/* Combined Section for Destinations and Recent Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        {/* Recent Bookings - Now takes full width on mobile */}
        <div className="bg-white p-4 rounded-xl shadow-md lg:col-span-2">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Bookings</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
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
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-[#d6ae53]">{booking.id}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 truncate max-w-[100px]">{booking.customer}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 truncate max-w-[100px]">{booking.package}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{booking.date}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{booking.amount}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
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

        {/* Top Destinations - Fixed Section */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Top UAE Destinations</h3>
          <div className="h-48 md:h-64 mb-4">
            <Pie 
              data={destinationData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: window.innerWidth < 1024 ? 'bottom' : 'right',
                    labels: {
                      boxWidth: 10,
                      padding: 10,
                      font: {
                        size: 10
                      }
                    }
                  },
                },
              }} 
            />
          </div>
          <div className="grid grid-cols-1 gap-2">
            {destinationData.labels.map((label, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: destinationData.datasets[0].backgroundColor[index] }}
                  ></div>
                  <span className="text-sm font-medium">{label}</span>
                </div>
                <span className="text-sm text-gray-500">{destinationData.datasets[0].data[index]}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;