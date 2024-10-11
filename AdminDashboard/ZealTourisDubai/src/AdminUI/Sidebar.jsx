import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { FaHome, FaCalendar, FaUsers, FaSuitcase, FaEnvelope, FaPhotoVideo, FaPercentage, FaCommentDots } from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isPackagesOpen, setIsPackagesOpen] = useState(false); // State to control the Packages dropdown

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const togglePackagesDropdown = () => {
    setIsPackagesOpen(!isPackagesOpen);
  };

  return (
    <div className={`bg-blue-100 shadow-md p-5 pt-8 duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>
      <div className="flex justify-between items-center">
        <span className="text-blue-500 text-2xl cursor-pointer" onClick={toggleSidebar}>
          {isOpen ? <FiX /> : <FiMenu />}
        </span>
        {isOpen && <h1 className="text-lg font-semibold text-blue-500">ZealTourisamDubai</h1>}
      </div>

      <ul className="pt-8">
        <li className="flex items-center p-2 my-4 text-gray-700 rounded-md cursor-pointer hover:bg-blue-200">
          <FaHome className="text-xl" />
          {isOpen && <Link to="/Dashboard" className="ml-4 text-md">Dashboard</Link>}
        </li>

        {/* Packages Section */}
        <li className="flex items-center p-2 my-4 text-gray-700 rounded-md cursor-pointer hover:bg-blue-200" onClick={togglePackagesDropdown}>
          <FaSuitcase className="text-xl" />
          {isOpen && <span className="ml-4 text-md">Packages</span>}
          {isOpen && (isPackagesOpen ? <FiChevronUp className="ml-auto" /> : <FiChevronDown className="ml-auto" />)}
        </li>

        {/* Packages Submenu */}
        {isPackagesOpen && isOpen && (
          <ul className="ml-8">
            <li className="p-2 text-gray-600 hover:bg-blue-200 rounded-md">
              <Link to="/holidays">Exciting Holidays</Link>
            </li>
            <li className="p-2 text-gray-600 hover:bg-blue-200 rounded-md">
              <Link to="/add-holidays">Add Holidays</Link>
            </li>
            <li className="p-2 text-gray-600 hover:bg-blue-200 rounded-md">
              <Link to="/GlobalVisas">Global Visas</Link>
            </li>
            <li className="p-2 text-gray-600 hover:bg-blue-200 rounded-md">
              <Link to="/Umrahaall">Umraha for All</Link>
            </li>
            <li className="p-2 text-gray-600 hover:bg-blue-200 rounded-md">
              <Link to="/best-hotels">Best Hotels</Link>
            </li>
            <li className="p-2 text-gray-600 hover:bg-blue-200 rounded-md">
              <Link to="/custom-holidays">Custom Holidays</Link>
            </li>
            <li className="p-2 text-gray-600 hover:bg-blue-200 rounded-md">
              <Link to="/car-transfer">Car Transfer</Link>
            </li>
            <li className="p-2 text-gray-600 hover:bg-blue-200 rounded-md">
              <Link to="/special-day">Special Day</Link>
            </li>
            <li className="p-2 text-gray-600 hover:bg-blue-200 rounded-md">
              <Link to="/tours-package">Tours Package</Link>
            </li>
            <li className="p-2 text-gray-600 hover:bg-blue-200 rounded-md">
              <Link to="/default-four-tours">Default Four Tours</Link>
            </li>
          </ul>
        )}

        <li className="flex items-center p-2 my-4 text-gray-700 rounded-md cursor-pointer hover:bg-blue-200">
          <FaCalendar className="text-xl" />
          {isOpen && <Link to="/bookings" className="ml-4 text-md">Bookings</Link>}
        </li>
        <li className="flex items-center p-2 my-4 text-gray-700 rounded-md cursor-pointer hover:bg-blue-200">
          <FaUsers className="text-xl" />
          {isOpen && <Link to="/travelers" className="ml-4 text-md">Travelers</Link>}
        </li>
        <li className="flex items-center p-2 my-4 text-gray-700 rounded-md cursor-pointer hover:bg-blue-200">
          <FaEnvelope className="text-xl" />
          {isOpen && <Link to="/messages" className="ml-4 text-md">Messages</Link>}
          <span className="ml-auto text-sm bg-blue-500 text-white px-2 py-1 rounded-full">{isOpen && '7'}</span>
        </li>
        <li className="flex items-center p-2 my-4 text-gray-700 rounded-md cursor-pointer hover:bg-blue-200">
          <FaPhotoVideo className="text-xl" />
          {isOpen && <Link to="/gallery" className="ml-4 text-md">Gallery</Link>}
        </li>
        <li className="flex items-center p-2 my-4 text-gray-700 rounded-md cursor-pointer hover:bg-blue-200">
          <FaPercentage className="text-xl" />
          {isOpen && <Link to="/deals" className="ml-4 text-md">Deals</Link>}
        </li>
        <li className="flex items-center p-2 my-4 text-gray-700 rounded-md cursor-pointer hover:bg-blue-200">
          <FaCommentDots className="text-xl" />
          {isOpen && <Link to="/feedback" className="ml-4 text-md">Feedback</Link>}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
