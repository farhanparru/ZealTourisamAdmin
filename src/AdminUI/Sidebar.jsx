import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import {
  FaHome, FaCalendar, FaUsers, FaSuitcase, FaUser, FaCommentDots, 
  FaImage, FaQuestionCircle, FaHotel, FaCar, FaUmbrellaBeach, FaGlobe
} from 'react-icons/fa';
import { BiSolidOffer } from 'react-icons/bi';
import { GiArabianGate } from 'react-icons/gi';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isPackagesOpen, setIsPackagesOpen] = useState(false);
  const [isEnquiriesOpen, setIsEnquiriesOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const togglePackagesDropdown = () => {
    setIsPackagesOpen(!isPackagesOpen);
  };

  const toggleEnquiriesDropdown = () => {
    setIsEnquiriesOpen(!isEnquiriesOpen);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className={`bg-gradient-to-b from-[#0D1526] to-[#1E2A4A] shadow-xl p-5 pt-8 duration-300 ${isOpen ? 'w-72' : 'w-24'} relative h-screen border-r-2 border-amber-500 border-opacity-30`}>
      {/* Sidebar Toggle */}
      <div className="flex justify-between items-center mb-8">
        <button 
          onClick={toggleSidebar} 
          className="text-amber-300 text-2xl bg-amber-600 bg-opacity-20 p-1 rounded-lg border border-amber-500 border-opacity-30 hover:bg-opacity-30 transition-all"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
        {isOpen && (
          <h1 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            <span className="font-arabic">زايل للسياحة</span>
            <span className="block text-sm text-amber-300 font-normal">ZealTourism Dubai</span>
          </h1>
        )}
      </div>

      <ul className="pt-2 space-y-2">
        {/* Dashboard */}
        <li>
          <Link 
            to="/Dashboard" 
            className={`flex items-center p-3 my-1 rounded-lg transition-all duration-200 ${isActive('/Dashboard') ? 
              'bg-amber-600 bg-opacity-30 text-amber-100 border-l-4 border-amber-500' : 
              'text-amber-100 hover:bg-[#2a3a5f] hover:text-amber-300'}`}
          >
            <FaHome className="text-xl min-w-[24px]" />
            {isOpen && <span className="ml-4 font-medium">Dashboard</span>}
          </Link>
        </li>

        {/* Packages Section */}
        <li>
          <div 
            onClick={togglePackagesDropdown}
            className={`flex items-center p-3 my-1 rounded-lg cursor-pointer transition-all duration-200 ${isPackagesOpen ? 
              'bg-amber-600 bg-opacity-30 text-amber-100 border-l-4 border-amber-500' : 
              'text-amber-100 hover:bg-[#2a3a5f] hover:text-amber-300'}`}
          >
            <FaSuitcase className="text-xl min-w-[24px]" />
            {isOpen && <span className="ml-4 font-medium">Packages</span>}
            {isOpen && (isPackagesOpen ? 
              <FiChevronUp className="ml-auto" /> : 
              <FiChevronDown className="ml-auto" />)}
          </div>

          {/* Packages Submenu */}
          {isPackagesOpen && isOpen && (
            <ul className="ml-8 mt-1 space-y-1">
              <li>
                <Link 
                  to="/holidays" 
                  className={`flex items-center p-2 rounded-md transition-all ${isActive('/holidays') ? 
                    'text-amber-300 bg-[#2a3a5f]' : 
                    'text-amber-100 hover:bg-[#2a3a5f] hover:text-amber-300'}`}
                >
                  <FaUmbrellaBeach className="mr-2" />
                  Exciting Holidays
                </Link>
              </li>
              <li>
                <Link 
                  to="/GlobalVisas" 
                  className={`flex items-center p-2 rounded-md transition-all ${isActive('/GlobalVisas') ? 
                    'text-amber-300 bg-[#2a3a5f]' : 
                    'text-amber-100 hover:bg-[#2a3a5f] hover:text-amber-300'}`}
                >
                  <FaGlobe className="mr-2" />
                  Global Visas
                </Link>
              </li>
              <li>
                <Link 
                  to="/Umrahaall" 
                  className={`flex items-center p-2 rounded-md transition-all ${isActive('/Umrahaall') ? 
                    'text-amber-300 bg-[#2a3a5f]' : 
                    'text-amber-100 hover:bg-[#2a3a5f] hover:text-amber-300'}`}
                >
                  <GiArabianGate className="mr-2" />
                  Umrah For All
                </Link>
              </li>
              <li>
                <Link 
                  to="/Hotels" 
                  className={`flex items-center p-2 rounded-md transition-all ${isActive('/Hotels') ? 
                    'text-amber-300 bg-[#2a3a5f]' : 
                    'text-amber-100 hover:bg-[#2a3a5f] hover:text-amber-300'}`}
                >
                  <FaHotel className="mr-2" />
                  Best Hotels
                </Link>
              </li>
              <li>
                <Link 
                  to="/CustomeHoliday" 
                  className={`flex items-center p-2 rounded-md transition-all ${isActive('/CustomeHoliday') ? 
                    'text-amber-300 bg-[#2a3a5f]' : 
                    'text-amber-100 hover:bg-[#2a3a5f] hover:text-amber-300'}`}
                >
                  <BiSolidOffer className="mr-2" />
                  Custom Holidays
                </Link>
              </li>
              <li>
                <Link 
                  to="/CarTransfer" 
                  className={`flex items-center p-2 rounded-md transition-all ${isActive('/CarTransfer') ? 
                    'text-amber-300 bg-[#2a3a5f]' : 
                    'text-amber-100 hover:bg-[#2a3a5f] hover:text-amber-300'}`}
                >
                  <FaCar className="mr-2" />
                  Car Transfer
                </Link>
              </li>
              <li>
                <Link 
                  to="/Speciladay" 
                  className={`flex items-center p-2 rounded-md transition-all ${isActive('/Speciladay') ? 
                    'text-amber-300 bg-[#2a3a5f]' : 
                    'text-amber-100 hover:bg-[#2a3a5f] hover:text-amber-300'}`}
                >
                  <FaCalendar className="mr-2" />
                  Special Day
                </Link>
              </li>
              <li>
                <Link 
                  to="/Tourspackaje" 
                  className={`flex items-center p-2 rounded-md transition-all ${isActive('/Tourspackaje') ? 
                    'text-amber-300 bg-[#2a3a5f]' : 
                    'text-amber-100 hover:bg-[#2a3a5f] hover:text-amber-300'}`}
                >
                  <FaUmbrellaBeach className="mr-2" />
                  Tours Package
                </Link>
              </li>
              <li>
                <Link 
                  to="/DefaultTours" 
                  className={`flex items-center p-2 rounded-md transition-all ${isActive('/DefaultTours') ? 
                    'text-amber-300 bg-[#2a3a5f]' : 
                    'text-amber-100 hover:bg-[#2a3a5f] hover:text-amber-300'}`}
                >
                  <FaGlobe className="mr-2" />
                  Default Four Tours
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Bookings */}
        <li>
          <Link 
            to="/Booking" 
            className={`flex items-center p-3 my-1 rounded-lg transition-all duration-200 ${isActive('/Booking') ? 
              'bg-amber-600 bg-opacity-30 text-amber-100 border-l-4 border-amber-500' : 
              'text-amber-100 hover:bg-[#2a3a5f] hover:text-amber-300'}`}
          >
            <FaCalendar className="text-xl min-w-[24px]" />
            {isOpen && <span className="ml-4 font-medium">Bookings</span>}
          </Link>
        </li>

        {/* Travelers */}
        <li>
          <Link 
            to="/travelers" 
            className={`flex items-center p-3 my-1 rounded-lg transition-all duration-200 ${isActive('/travelers') ? 
              'bg-amber-600 bg-opacity-30 text-amber-100 border-l-4 border-amber-500' : 
              'text-amber-100 hover:bg-[#2a3a5f] hover:text-amber-300'}`}
          >
            <FaUsers className="text-xl min-w-[24px]" />
            {isOpen && <span className="ml-4 font-medium">Travelers</span>}
          </Link>
        </li>

        {/* Add Banner */}
        <li>
          <Link 
            to="/Addbanner" 
            className={`flex items-center p-3 my-1 rounded-lg transition-all duration-200 ${isActive('/Addbanner') ? 
              'bg-amber-600 bg-opacity-30 text-amber-100 border-l-4 border-amber-500' : 
              'text-amber-100 hover:bg-[#2a3a5f] hover:text-amber-300'}`}
          >
            <FaImage className="text-xl min-w-[24px]" />
            {isOpen && <span className="ml-4 font-medium">Add Banner</span>}
          </Link>
        </li>

        {/* Enquiries Section */}
        <li>
          <div 
            onClick={toggleEnquiriesDropdown}
            className={`flex items-center p-3 my-1 rounded-lg cursor-pointer transition-all duration-200 ${isEnquiriesOpen ? 
              'bg-amber-600 bg-opacity-30 text-amber-100 border-l-4 border-amber-500' : 
              'text-amber-100 hover:bg-[#2a3a5f] hover:text-amber-300'}`}
          >
            <FaQuestionCircle className="text-xl min-w-[24px]" />
            {isOpen && <span className="ml-4 font-medium">Enquiries</span>}
            {isOpen && (isEnquiriesOpen ? 
              <FiChevronUp className="ml-auto" /> : 
              <FiChevronDown className="ml-auto" />)}
          </div>

          {isEnquiriesOpen && isOpen && (
            <ul className="ml-8 mt-1 space-y-1">
              <li>
                <Link 
                  to="/EnquirysVisa" 
                  className={`flex items-center p-2 rounded-md transition-all ${isActive('/EnquirysVisa') ? 
                    'text-amber-300 bg-[#2a3a5f]' : 
                    'text-amber-100 hover:bg-[#2a3a5f] hover:text-amber-300'}`}
                >
                  <FaGlobe className="mr-2" />
                  Visa Enquiry
                </Link>
              </li>
              <li>
                <Link 
                  to="/holidays-enquiry" 
                  className={`flex items-center p-2 rounded-md transition-all ${isActive('/holidays-enquiry') ? 
                    'text-amber-300 bg-[#2a3a5f]' : 
                    'text-amber-100 hover:bg-[#2a3a5f] hover:text-amber-300'}`}
                >
                  <FaUmbrellaBeach className="mr-2" />
                  Holidays Enquiry
                </Link>
              </li>
              <li>
                <Link 
                  to="/tours-enquiry" 
                  className={`flex items-center p-2 rounded-md transition-all ${isActive('/tours-enquiry') ? 
                    'text-amber-300 bg-[#2a3a5f]' : 
                    'text-amber-100 hover:bg-[#2a3a5f] hover:text-amber-300'}`}
                >
                  <FaSuitcase className="mr-2" />
                  Tours Enquiry
                </Link>
              </li>
              <li>
                <Link 
                  to="/EnquiryUmraha" 
                  className={`flex items-center p-2 rounded-md transition-all ${isActive('/EnquiryUmraha') ? 
                    'text-amber-300 bg-[#2a3a5f]' : 
                    'text-amber-100 hover:bg-[#2a3a5f] hover:text-amber-300'}`}
                >
                  <GiArabianGate className="mr-2" />
                  Umrah Enquiry
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Accounts */}
        <li>
          <Link 
            to="/accounts" 
            className={`flex items-center p-3 my-1 rounded-lg transition-all duration-200 ${isActive('/accounts') ? 
              'bg-amber-600 bg-opacity-30 text-amber-100 border-l-4 border-amber-500' : 
              'text-amber-100 hover:bg-[#2a3a5f] hover:text-amber-300'}`}
          >
            <FaUser className="text-xl min-w-[24px]" />
            {isOpen && <span className="ml-4 font-medium">Accounts</span>}
          </Link>
        </li>

        {/* Feedback */}
        <li>
          <Link 
            to="/feedback" 
            className={`flex items-center p-3 my-1 rounded-lg transition-all duration-200 ${isActive('/feedback') ? 
              'bg-amber-600 bg-opacity-30 text-amber-100 border-l-4 border-amber-500' : 
              'text-amber-100 hover:bg-[#2a3a5f] hover:text-amber-300'}`}
          >
            <FaCommentDots className="text-xl min-w-[24px]" />
            {isOpen && <span className="ml-4 font-medium">Feedback</span>}
          </Link>
        </li>
      </ul>

      {/* UAE-inspired decorative element */}
      {isOpen && (
        <div className="absolute bottom-4 left-0 right-0 text-center text-amber-300 text-opacity-50">
          <svg className="w-24 h-24 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
              strokeWidth="1" fill="none" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default Sidebar;