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
      const response = await axios.post('https://zeal-tourisam-api.vercel.app/api/admin/adminLogout');
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
    <nav className="bg-gradient-to-r from-[#1E2A4A] to-[#0D1526] shadow-lg relative border-b-2 border-gold-500">
      {/* Main Navbar */}
      <div className="flex items-center justify-between p-4 max-w-screen-xl mx-auto">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Logo" className="h-14 w-14" />
          <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 hidden sm:block">
            <span className="font-arabic tracking-wider">زايل للسياحة</span>
            <span className="block text-sm text-amber-200 font-normal">Zeal Tourism</span>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="text-amber-100 hover:text-amber-300 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-[#2a3a5f] hover:shadow-md">
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link to="/packages" className="text-amber-100 hover:text-amber-300 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-[#2a3a5f] hover:shadow-md">
            <span className="font-medium">Packages</span>
          </Link>
          <Link to="/holidays" className="text-amber-100 hover:text-amber-300 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-[#2a3a5f] hover:shadow-md">
            <span className="font-medium">Holidays</span>
          </Link>
          <Link to="/booking" className="text-amber-100 hover:text-amber-300 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-[#2a3a5f] hover:shadow-md">
            <span className="font-medium">Bookings</span>
          </Link>
          <Link to="/travelers" className="text-amber-100 hover:text-amber-300 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-[#2a3a5f] hover:shadow-md">
            <span className="font-medium">Travelers</span>
          </Link>
          <div className="relative group">
            <button className="text-amber-100 hover:text-amber-300 px-3 py-2 rounded-lg transition-all duration-300 flex items-center">
              <span className="font-medium">Management</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute left-0 mt-2 w-48 bg-[#1E2A4A] border border-amber-500 rounded-md shadow-lg py-1 z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <Link to="/guides" className="block px-4 py-2 text-amber-100 hover:bg-[#2a3a5f]">CRM</Link>
              <Link to="/messages" className="block px-4 py-2 text-amber-100 hover:bg-[#2a3a5f]">Blocked Users</Link>
              <Link to="/gallery" className="block px-4 py-2 text-amber-100 hover:bg-[#2a3a5f]">Accounts</Link>
            </div>
          </div>
        </div>

        {/* User Dropdown */}
        <div className="relative hidden md:block">
          <button 
            onClick={toggleDropdown} 
            className="text-white flex items-center space-x-2 bg-amber-600 bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg border border-amber-500 border-opacity-30 transition-all duration-300"
          >
            <User className="text-xl" />
            <span className="font-medium">Admin</span>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-[#1E2A4A] border border-amber-500 rounded-md shadow-lg py-1 z-20">
              <div className="px-4 py-2 text-amber-300 border-b border-amber-500 border-opacity-30">
                <p className="font-medium">Admin Panel</p>
                <p className="text-xs text-amber-200">Super Admin</p>
              </div>
              <Link to="/Profile" className="block px-4 py-2 text-amber-100 hover:bg-[#2a3a5f] flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Profile
              </Link>
              <Link to="/settings" className="block px-4 py-2 text-amber-100 hover:bg-[#2a3a5f] flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Settings
              </Link>
              <button 
                className="block w-full text-left px-4 py-2 text-amber-100 hover:bg-[#2a3a5f] flex items-center border-t border-amber-500 border-opacity-30" 
                onClick={handleLogout}
              >
                <FiLogOut className="mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-amber-300 focus:outline-none bg-amber-600 bg-opacity-20 p-2 rounded-lg border border-amber-500 border-opacity-30" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-gradient-to-b from-[#0D1526] to-[#1E2A4A] z-50 flex flex-col items-start p-6 space-y-4 text-white overflow-y-auto">
          <div className="w-full flex justify-between items-center mb-6 border-b border-amber-500 pb-4">
            <div className="flex items-center space-x-3">
              <img src={logo} alt="Logo" className="h-12 w-12" />
              <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                <span className="font-arabic">زايل للسياحة</span>
              </div>
            </div>
            <button 
              className="text-amber-300 text-2xl focus:outline-none" 
              onClick={() => setIsMenuOpen(false)}
            >
              <FiX />
            </button>
          </div>

          <Link 
            to="/" 
            className="w-full hover:bg-[#2a3a5f] px-4 py-3 rounded-lg text-amber-100 border-l-4 border-amber-500 flex items-center"
            onClick={() => setIsMenuOpen(false)}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Dashboard
          </Link>

          <Link 
            to="/packages" 
            className="w-full hover:bg-[#2a3a5f] px-4 py-3 rounded-lg text-amber-100 border-l-4 border-amber-500 flex items-center"
            onClick={() => setIsMenuOpen(false)}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            Packages
          </Link>

          <Link 
            to="/holidays" 
            className="w-full hover:bg-[#2a3a5f] px-4 py-3 rounded-lg text-amber-100 border-l-4 border-amber-500 flex items-center"
            onClick={() => setIsMenuOpen(false)}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Holidays
          </Link>

          <Link 
            to="/booking" 
            className="w-full hover:bg-[#2a3a5f] px-4 py-3 rounded-lg text-amber-100 border-l-4 border-amber-500 flex items-center"
            onClick={() => setIsMenuOpen(false)}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Bookings
          </Link>

          <Link 
            to="/travelers" 
            className="w-full hover:bg-[#2a3a5f] px-4 py-3 rounded-lg text-amber-100 border-l-4 border-amber-500 flex items-center"
            onClick={() => setIsMenuOpen(false)}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Travelers
          </Link>

          <div className="w-full">
            <button 
              className="w-full hover:bg-[#2a3a5f] px-4 py-3 rounded-lg text-amber-100 border-l-4 border-amber-500 flex items-center justify-between"
              onClick={toggleDropdown}
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Management
              </div>
              <svg className={`w-4 h-4 transform transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {dropdownOpen && (
              <div className="ml-8 mt-2 space-y-2 bg-[#2a3a5f] bg-opacity-50 rounded-lg p-2">
                <Link 
                  to="/guides" 
                  className="block px-4 py-2 text-amber-100 hover:bg-[#2a3a5f] rounded-lg flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  CRM
                </Link>
                <Link 
                  to="/messages" 
                  className="block px-4 py-2 text-amber-100 hover:bg-[#2a3a5f] rounded-lg flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  Blocked Users
                </Link>
                <Link 
                  to="/gallery" 
                  className="block px-4 py-2 text-amber-100 hover:bg-[#2a3a5f] rounded-lg flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Accounts
                </Link>
              </div>
            )}
          </div>

          {/* User Profile in Mobile */}
          <div className="w-full mt-8 pt-6 border-t border-amber-500 border-opacity-30">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-amber-500 bg-opacity-20 p-2 rounded-full border border-amber-500 border-opacity-30">
                <User className="text-xl text-amber-300" />
              </div>
              <div>
                <p className="font-medium text-amber-200">Admin</p>
                <p className="text-xs text-amber-300 opacity-80">Super Admin</p>
              </div>
            </div>
            
            <Link 
              to="/Profile" 
              className="block px-4 py-2 text-amber-100 hover:bg-[#2a3a5f] rounded-lg mb-1 flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Profile
            </Link>
            
            <Link 
              to="/settings" 
              className="block px-4 py-2 text-amber-100 hover:bg-[#2a3a5f] rounded-lg mb-1 flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Settings
            </Link>
            
            <button 
              className="block w-full text-left px-4 py-2 text-amber-100 hover:bg-[#2a3a5f] rounded-lg flex items-center mt-4 border-t border-amber-500 border-opacity-30 pt-4"
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
            >
              <FiLogOut className="mr-3" />
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;