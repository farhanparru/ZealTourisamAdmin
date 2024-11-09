import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import {
  FaHome, FaCalendar, FaUsers, FaSuitcase, FaPercentage, FaCommentDots, FaImage, FaQuestionCircle
} from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isPackagesOpen, setIsPackagesOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const togglePackagesDropdown = () => {
    setIsPackagesOpen(!isPackagesOpen);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className={`bg-gradient-to-b from-blue-200 to-blue-100 shadow-lg p-5 pt-8 duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>
      <div className="flex justify-between items-center mb-6">
        <span className="text-blue-500 text-2xl cursor-pointer" onClick={toggleSidebar}>
          {isOpen ? <FiX /> : <FiMenu />}
        </span>
        {isOpen && <h1 className="text-xl font-bold text-blue-600">ZealTourisamDubai</h1>}
      </div>

      <ul className="pt-2">
        <li className={`flex items-center p-3 my-4 text-blue-700 rounded-lg transition-all duration-200 ${isActive('/Dashboard') ? 'bg-blue-300' : 'hover:bg-blue-200'}`}>
          <FaHome className="text-xl" />
          {isOpen && <Link to="/Dashboard" className="ml-4 font-semibold text-md">Dashboard</Link>}
        </li>

        {/* Packages Section */}
        <li
          className={`flex items-center p-3 my-4 text-blue-700 rounded-lg cursor-pointer transition-all duration-200 ${isPackagesOpen ? 'bg-blue-300' : 'hover:bg-blue-200'}`}
          onClick={togglePackagesDropdown}
        >
          <FaSuitcase className="text-xl" />
          {isOpen && <span className="ml-4 font-semibold text-md">Packages</span>}
          {isOpen && (isPackagesOpen ? <FiChevronUp className="ml-auto" /> : <FiChevronDown className="ml-auto" />)}
        </li>

        {/* Packages Submenu */}
        {isPackagesOpen && isOpen && (
          <ul className="ml-8 text-black-600">
            <li className="p-2 font-semibold text-black-600 hover:bg-blue-200 rounded-md">
              <Link to="/holidays">EXCITING HOLIDAYS</Link>
            </li>
            <li className="p-2 font-semibold text-black-600 hover:bg-blue-200 rounded-md">
              <Link to="/GlobalVisas">GLOBAL VISAS</Link>
            </li>
            <li className="p-2 font-semibold text-black-600 hover:bg-blue-200 rounded-md">
              <Link to="/Umrahaall">UMRAHA FOR ALL</Link>
            </li>
            <li className="p-2 font-semibold text-black-600 hover:bg-blue-200 rounded-md">
              <Link to="/best-hotels">BEST HOTELS</Link>
            </li>
            <li className="p-2 font-semibold text-black-600 hover:bg-blue-200 rounded-md">
              <Link to="/custom-holidays">CUSTOM HOLIDAYS</Link>
            </li>
            <li className="p-2 font-semibold text-black-600 hover:bg-blue-200 rounded-md">
              <Link to="/car-transfer">CAR TRANSFER</Link>
            </li>
            <li className="p-2 font-semibold text-black-600 hover:bg-blue-200 rounded-md">
              <Link to="/special-day">SPECIAL DAY</Link>
            </li>
            <li className="p-2 font-semibold text-black-600 hover:bg-blue-200 rounded-md">
              <Link to="/tours-package">TOURS PACKAGE</Link>
            </li>
            <li className="p-2 font-semibold text-black-600 hover:bg-blue-200 rounded-md">
              <Link to="/default-four-tours">DEFAULT FOUR TOURS</Link>
            </li>
          </ul>
        )}

        <li className={`flex items-center p-3 my-4 text-blue-700 rounded-lg transition-all duration-200 ${isActive('/bookings') ? 'bg-blue-300' : 'hover:bg-blue-200'}`}>
          <FaCalendar className="text-xl" />
          {isOpen && <Link to="/bookings" className="ml-4 font-semibold text-md">Bookings</Link>}
        </li>
        <li className={`flex items-center p-3 my-4 text-blue-700 rounded-lg transition-all duration-200 ${isActive('/travelers') ? 'bg-blue-300' : 'hover:bg-blue-200'}`}>
          <FaUsers className="text-xl" />
          {isOpen && <Link to="/travelers" className="ml-4 font-semibold text-md">Travelers</Link>}
        </li>

        {/* Add Banner with Icon */}
        <li className={`flex items-center p-3 my-4 text-blue-700 rounded-lg transition-all duration-200 ${isActive('/Addbanner') ? 'bg-blue-300' : 'hover:bg-blue-200'}`}>
          <FaImage className="text-xl" />
          {isOpen && (
            <Link to="/Addbanner" className="ml-4 font-semibold text-md">
              Add Banner
            </Link>
          )}
        </li>

        {/* Enquiries with Icon */}
        <li className={`flex items-center p-3 my-4 text-blue-700 rounded-lg transition-all duration-200 ${isActive('/gallery') ? 'bg-blue-300' : 'hover:bg-blue-200'}`}>
          <FaQuestionCircle className="text-xl" />
          {isOpen && (
            <Link to="/gallery" className="ml-4 font-semibold text-md">
              Enquiries
            </Link>
          )}
        </li>

        <li className={`flex items-center p-3 my-4 text-blue-700 rounded-lg transition-all duration-200 ${isActive('/deals') ? 'bg-blue-300' : 'hover:bg-blue-200'}`}>
          <FaPercentage className="text-xl" />
          {isOpen && <Link to="/deals" className="ml-4 font-semibold text-md">Deals</Link>}
        </li>
        <li className={`flex items-center p-3 my-4 text-blue-700 rounded-lg transition-all duration-200 ${isActive('/feedback') ? 'bg-blue-300' : 'hover:bg-blue-200'}`}>
          <FaCommentDots className="text-xl" />
          {isOpen && <Link to="/feedback" className="ml-4 font-semibold text-md">Feedback</Link>}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
