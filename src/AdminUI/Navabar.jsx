/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { FiLogOut, FiMenu } from 'react-icons/fi';
import { User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../assets/Images/TourisamLogo.png';

const Navbar = ({ toggleMobileSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

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

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-[#1E2A4A] to-[#0D1526] shadow-lg relative border-b-2 border-amber-500 z-30" >
      <div className="flex items-center justify-between p-4 max-w-screen-xl mx-auto">
        {/* Mobile menu button and logo */}
        <div className="flex items-center space-x-3">
          <button 
            onClick={toggleMobileSidebar}
            className="md:hidden text-amber-300 text-2xl bg-amber-600 bg-opacity-20 p-1 rounded-lg border border-amber-500 border-opacity-30 hover:bg-opacity-30 transition-all"
          >
            <FiMenu />
          </button>
          <img src={logo} alt="Logo" className="h-14 w-14" />
          <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
            <span className="font-arabic tracking-wider">زايل للسياحة</span>
            <span className="block text-sm text-amber-200 font-normal">Zeal Tourism</span>
          </div>
        </div>

        {/* User Dropdown */}
        <div className="relative">
          <button 
            onClick={toggleDropdown} 
            className="text-white flex items-center space-x-2 bg-amber-600 bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg border border-amber-500 border-opacity-30 transition-all duration-300"
          >
            <User className="text-xl" />
            <span className="font-medium hidden sm:inline">Admin</span>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-[#1E2A4A] border border-amber-500 rounded-md shadow-lg py-1 z-20">
              <div className="px-4 py-2 text-amber-300 border-b border-amber-500 border-opacity-30">
                <p className="font-medium">Admin Panel</p>
                <p className="text-xs text-amber-200">Super Admin</p>
              </div>
              <Link 
                to="/Profile" 
                className="block px-4 py-2 text-amber-100 hover:bg-[#2a3a5f] flex items-center"
                onClick={() => setDropdownOpen(false)}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Profile
              </Link>
              <Link 
                to="/settings" 
                className="block px-4 py-2 text-amber-100 hover:bg-[#2a3a5f] flex items-center"
                onClick={() => setDropdownOpen(false)}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c-.94 1.543.826 3.31 2.37 2.37a1.724 1.724 0 002.572-1.065c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31 2.37 2.37a1.724 1.724 0 002.572 1.065c.426 1.756 2.924 1.756 3.35 0a1.724 1.724 0 002.573-1.066c1.543.94 3.31-.826 2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
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
      </div>
    </nav>
  );
};

export default Navbar;