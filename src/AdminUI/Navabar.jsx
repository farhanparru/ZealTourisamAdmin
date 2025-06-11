// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { FiMenu, FiX, FiLogOut } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../assets/Images/TourisamLogo.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Handle Logout
  const handleLogout = async () => {
    try {
      const response = await axios.post('https://zeal-api-backend.vercel.app/api/admin/adminLogout');
      if (response.data.success) {
        navigate('/');
        toast.success('Admin Logout successfully');
        localStorage.removeItem('adminToken');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Toggle Dropdown Menu
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-[#111827] shadow-md relative">
      {/* Main Navbar */}
      <div className="flex items-center justify-between p-4 max-w-screen-xl mx-auto">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="h-12 w-12" />
          <div className="text-xl font-bold text-white hidden sm:block">
            <span>ZealTourism</span>
           
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8">
          <Link to="/" className="text-white hover:underline">Dashboard</Link>
          <Link to="/packages" className="text-white hover:underline">Packages</Link>
          <Link to="/holidays" className="text-white hover:underline">Holidays</Link>
          <Link to="/bookings" className="text-white hover:underline">Bookings</Link>
          <Link to="/travelers" className="text-white hover:underline">Travelers</Link>
          <Link to="/guides" className="text-white hover:underline">CRM</Link>
          <Link to="/messages" className="text-white hover:underline">Blocked User</Link>
          <Link to="/gallery" className="text-white hover:underline">Accounts</Link>
        </div>

        {/* User Dropdown */}
        <div className="relative hidden md:block">
          <button onClick={toggleDropdown} className="text-white flex items-center">
            <User className="text-3xl mr-2" />
            <span>Admin</span>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
              <Link to="/Profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Profile</Link>
              <Link to="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Settings</Link>
              <button className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={handleLogout}>
                <FiLogOut className="inline-block mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white focus:outline-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-blue-700 bg-opacity-95 z-50 flex flex-col items-start p-6 space-y-6 text-white text-lg font-bold">
          <button className="self-end text-3xl" onClick={() => setIsMenuOpen(false)}>
            <FiX />
          </button>
          <Link to="/" className="w-full hover:bg-blue-800 px-4 py-2 rounded">Dashboard</Link>
          <Link to="/packages" className="w-full hover:bg-blue-800 px-4 py-2 rounded">Packages</Link>
          <Link to="/holidays" className="w-full hover:bg-blue-800 px-4 py-2 rounded">Holidays</Link>
          <Link to="/bookings" className="w-full hover:bg-blue-800 px-4 py-2 rounded">Bookings</Link>
          <Link to="/travelers" className="w-full hover:bg-blue-800 px-4 py-2 rounded">Travelers</Link>
          <Link to="/guides" className="w-full hover:bg-blue-800 px-4 py-2 rounded">CRM</Link>
          <Link to="/messages" className="w-full hover:bg-blue-800 px-4 py-2 rounded">Blocked User</Link>
          <Link to="/gallery" className="w-full hover:bg-blue-800 px-4 py-2 rounded">Accounts</Link>

          {/* User Profile in Mobile */}
          <div className="border-t border-gray-300 pt-4 w-full">
            <button onClick={toggleDropdown} className="flex items-center">
              <User className="text-3xl mr-2" />
              <span>Admin</span>
            </button>
            {dropdownOpen && (
              <div className="mt-2 space-y-2">
                <Link to="/Profile" className="block hover:underline">Profile</Link>
                <Link to="/settings" className="block hover:underline">Settings</Link>
                <button onClick={handleLogout} className="flex items-center hover:underline">
                  <FiLogOut className="mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
