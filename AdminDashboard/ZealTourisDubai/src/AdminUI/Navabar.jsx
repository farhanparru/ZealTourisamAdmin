import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import logo from '../assets/Images/Logon bar.png';  // Make sure the file path is correct

const Navbar = () => {
  // State to control dropdown visibility
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Toggle the dropdown menu
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Close dropdown when clicking outside
  const handleOutsideClick = (e) => {
    if (dropdownOpen && !e.target.closest('.dropdown')) {
      setDropdownOpen(false);
    }
  };

  // Add event listener to close dropdown on outside click
  React.useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [dropdownOpen]);

  return (
    <nav className="bg-blue-500 p-4 shadow-md flex justify-between items-center">
      {/* Logo or Brand Name */}
      <div className="text-2xl font-bold">
        {/* Logo Image */}
        <img src={logo} alt="Company Logo" className="h-11 w-auto" />
      </div>
      
      {/* Navigation Links */}
      <div className="flex space-x-6">
        <Link to="/" className="text-white hover:underline">Dashboard</Link>
        <Link to="/packages" className="text-white hover:underline">Packages</Link>
        <Link to="/bookings" className="text-white hover:underline">Bookings</Link>
        <Link to="/travelers" className="text-white hover:underline">Travelers</Link>
        <Link to="/guides" className="text-white hover:underline">Guides</Link>
        <Link to="/messages" className="text-white hover:underline">Messages</Link>
        <Link to="/gallery" className="text-white hover:underline">Gallery</Link>
      </div>

      {/* User Profile Dropdown */}
      <div className="relative dropdown">
        <button onClick={toggleDropdown} className="text-white flex items-center focus:outline-none">
          <FaUserCircle className="text-3xl mr-2" />
          <span>Admin</span>
        </button>

        {/* Conditional rendering of the dropdown */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
            <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              Profile
            </Link>
            <Link to="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              Settings
            </Link>
            <Link to="/logout" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              <FiLogOut className="inline-block mr-2" />
              Logout
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
