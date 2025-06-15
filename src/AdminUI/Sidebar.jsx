import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import {
  FaHome, FaCalendar, FaUsers, FaSuitcase, FaUser,
  FaImage,  FaHotel, FaCar, FaUmbrellaBeach, 
  FaPlane, FaPassport, FaMapMarkedAlt, FaMoneyBillWave, FaCog
} from 'react-icons/fa';
import { BiSolidOffer } from 'react-icons/bi';
import { GiCastle, GiJourney } from 'react-icons/gi';

// eslint-disable-next-line react/prop-types
const Sidebar = ({ isMobileSidebarOpen, toggleMobileSidebar }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [openMenus, setOpenMenus] = useState({
    packages: false,
    enquiries: false,
    accounts: false,
    features: false
  });
  const location = useLocation();

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  }, [location]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleMenu = (menu) => {
    setOpenMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  const isActive = (path) => location.pathname === path;

  // Close sidebar on mobile when clicking a link
  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      toggleMobileSidebar();
    }
  };

  return (
    <div className={`
      bg-gradient-to-b from-[#0D1526] to-[#1E2A4A] shadow-xl p-5 pt-8 duration-300 
      ${isOpen ? 'w-72' : 'w-24'} 
      ${isMobileSidebarOpen ? 
        'fixed inset-y-0 z-40 transform translate-x-0' : 
        'fixed md:relative -translate-x-full md:translate-x-0'}
      h-screen border-r-2 border-amber-500 border-opacity-30
      transition-transform ease-in-out duration-300
    `}>
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

      <ul className="pt-2 space-y-2 overflow-y-auto h-[calc(100vh-180px)]">
        {/* Dashboard */}
        <li>
          <Link 
            to="/dashboard" 
            className={`flex items-center p-3 my-1 rounded-lg transition-all duration-200 ${isActive('/dashboard') ? 
              'bg-amber-600 bg-opacity-30 text-amber-100 border-l-4 border-amber-500' : 
              'text-amber-100 hover:bg-[#2a3a5f] hover:text-amber-300'}`}
            onClick={handleLinkClick}
          >
            <FaHome className="text-xl min-w-[24px]" />
            {isOpen && <span className="ml-4 font-medium">Dashboard</span>}
          </Link>
        </li>

        {/* Packages Menu */}
        <li>
          <div 
            onClick={() => toggleMenu('packages')}
            className={`flex items-center p-3 my-1 rounded-lg cursor-pointer transition-all duration-200 ${openMenus.packages ? 
              'bg-amber-600 bg-opacity-30 text-amber-100 border-l-4 border-amber-500' : 
              'text-amber-100 hover:bg-[#2a3a5f] hover:text-amber-300'}`}
          >
            <FaSuitcase className="text-xl min-w-[24px]" />
            {isOpen && <span className="ml-4 font-medium">Packages</span>}
            {isOpen && (openMenus.packages ? 
              <FiChevronUp className="ml-auto" /> : 
              <FiChevronDown className="ml-auto" />)}
          </div>

          {/* Packages Submenu */}
          {openMenus.packages && isOpen && (
            <ul className="ml-8 mt-1 space-y-1">
              <li>
                <Link 
                  to="/holidays" 
                  className={`flex items-center p-2 rounded-md transition-all ${isActive('/holidays') ? 
                    'text-amber-300 bg-[#2a3a5f]' : 
                    'text-amber-100 hover:bg-[#2a3a5f] hover:text-amber-300'}`}
                  onClick={handleLinkClick}
                >
                  <FaUmbrellaBeach className="mr-2" />
                  Exciting Holidays
                </Link>
              </li>
              <li>
                <Link 
                  to="/GlobalVisas" 
                  className={`flex items-center p-2 rounded-md transition-all ${isActive('/global-visas') ? 
                    'text-amber-300 bg-[#2a3a5f]' : 
                    'text-amber-100 hover:bg-[#2a3a5f] hover:text-amber-300'}`}
                  onClick={handleLinkClick}
                >
                  <FaPassport className="mr-2" />
                  Global Visas
                </Link>
              </li>
              <li>
                <Link 
                  to="/Umrahaall" 
                  className={`flex items-center p-2 rounded-md transition-all ${isActive('/umrah-for-all') ? 
                    'text-amber-300 bg-[#2a3a5f]' : 
                    'text-amber-100 hover:bg-[#2a3a5f] hover:text-amber-300'}`}
                  onClick={handleLinkClick}
                >
                  <GiCastle className="mr-2" />
                  Umrah For All
                </Link>
              </li>
              <li>
                <Link 
                  to="/best-hotels" 
                  className={`flex items-center p-2 rounded-md transition-all ${isActive('/best-hotels') ? 
                    'text-amber-300 bg-[#2a3a5f]' : 
                    'text-amber-100 hover:bg-[#2a3a5f] hover:text-amber-300'}`}
                  onClick={handleLinkClick}
                >
                  <FaHotel className="mr-2" />
                  Best Hotels
                </Link>
              </li>
              <li>
                <Link 
                  to="/custom-holidays" 
                  className={`flex items-center p-2 rounded-md transition-all ${isActive('/custom-holidays') ? 
                    'text-amber-300 bg-[#2a3a5f]' : 
                    'text-amber-100 hover:bg-[#2a3a5f] hover:text-amber-300'}`}
                  onClick={handleLinkClick}
                >
                  <BiSolidOffer className="mr-2" />
                  Custom Holidays
                </Link>
              </li>
              <li>
                <Link 
                  to="/car-transfer" 
                  className={`flex items-center p-2 rounded-md transition-all ${isActive('/car-transfer') ? 
                    'text-amber-300 bg-[#2a3a5f]' : 
                    'text-amber-100 hover:bg-[#2a3a5f] hover:text-amber-300'}`}
                  onClick={handleLinkClick}
                >
                  <FaCar className="mr-2" />
                  Car Transfer
                </Link>
              </li>
              <li>
                <Link 
                  to="/special-day" 
                  className={`flex items-center p-2 rounded-md transition-all ${isActive('/special-day') ? 
                    'text-amber-300 bg-[#2a3a5f]' : 
                    'text-amber-100 hover:bg-[#2a3a5f] hover:text-amber-300'}`}
                  onClick={handleLinkClick}
                >
                  <FaCalendar className="mr-2" />
                  Special Day
                </Link>
              </li>
              <li>
                <Link 
                  to="/tours-packages" 
                  className={`flex items-center p-2 rounded-md transition-all ${isActive('/tours-packages') ? 
                    'text-amber-300 bg-[#2a3a5f]' : 
                    'text-amber-100 hover:bg-[#2a3a5f] hover:text-amber-300'}`}
                  onClick={handleLinkClick}
                >
                  <GiJourney className="mr-2" />
                  Tours Packages
                </Link>
              </li>
             
            </ul>
          )}
        </li>

        {/* Bookings */}
        <li>
          <Link 
            to="/Booking" 
            className={`flex items-center p-3 my-1 rounded-lg transition-all duration-200 ${isActive('/bookings') ? 
              'bg-amber-600 bg-opacity-30 text-amber-100 border-l-4 border-amber-500' : 
              'text-amber-100 hover:bg-[#2a3a5f] hover:text-amber-300'}`}
            onClick={handleLinkClick}
          >
            <FaCalendar className="text-xl min-w-[24px]" />
            {isOpen && <span className="ml-4 font-medium">Bookings</span>}
          </Link>
        </li>

        {/* Add Banner */}
        <li>
          <Link 
            to="/add-banner" 
            className={`flex items-center p-3 my-1 rounded-lg transition-all duration-200 ${isActive('/add-banner') ? 
              'bg-amber-600 bg-opacity-30 text-amber-100 border-l-4 border-amber-500' : 
              'text-amber-100 hover:bg-[#2a3a5f] hover:text-amber-300'}`}
            onClick={handleLinkClick}
          >
            <FaImage className="text-xl min-w-[24px]" />
            {isOpen && <span className="ml-4 font-medium">Add Banner</span>}
          </Link>
        </li>

        {/* Accounts Menu */}
        <li>
          <div 
            onClick={() => toggleMenu('accounts')}
            className={`flex items-center p-3 my-1 rounded-lg cursor-pointer transition-all duration-200 ${openMenus.accounts ? 
              'bg-amber-600 bg-opacity-30 text-amber-100 border-l-4 border-amber-500' : 
              'text-amber-100 hover:bg-[#2a3a5f] hover:text-amber-300'}`}
          >
            <FaUser className="text-xl min-w-[24px]" />
            {isOpen && <span className="ml-4 font-medium">Accounts</span>}
            {isOpen && (openMenus.accounts ? 
              <FiChevronUp className="ml-auto" /> : 
              <FiChevronDown className="ml-auto" />)}
          </div>

          {/* Accounts Submenu */}
          {openMenus.accounts && isOpen && (
            <ul className="ml-8 mt-1 space-y-1">
              <li>
                <Link 
                  to="/crm" 
                  className={`flex items-center p-2 rounded-md transition-all ${isActive('/crm') ? 
                    'text-amber-300 bg-[#2a3a5f]' : 
                    'text-amber-100 hover:bg-[#2a3a5f] hover:text-amber-300'}`}
                  onClick={handleLinkClick}
                >
                  <FaUsers className="mr-2" />
                  CRM
                </Link>
              </li>
              <li>
                <Link 
                  to="/payments" 
                  className={`flex items-center p-2 rounded-md transition-all ${isActive('/payments') ? 
                    'text-amber-300 bg-[#2a3a5f]' : 
                    'text-amber-100 hover:bg-[#2a3a5f] hover:text-amber-300'}`}
                  onClick={handleLinkClick}
                >
                  <FaMoneyBillWave className="mr-2" />
                  Payments
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Travel Features Menu */}
        <li>
          <div 
            onClick={() => toggleMenu('features')}
            className={`flex items-center p-3 my-1 rounded-lg cursor-pointer transition-all duration-200 ${openMenus.features ? 
              'bg-amber-600 bg-opacity-30 text-amber-100 border-l-4 border-amber-500' : 
              'text-amber-100 hover:bg-[#2a3a5f] hover:text-amber-300'}`}
          >
            <FaPlane className="text-xl min-w-[24px]" />
            {isOpen && <span className="ml-4 font-medium">Travel Features</span>}
            {isOpen && (openMenus.features ? 
              <FiChevronUp className="ml-auto" /> : 
              <FiChevronDown className="ml-auto" />)}
          </div>

          {/* Features Submenu */}
          {openMenus.features && isOpen && (
            <ul className="ml-8 mt-1 space-y-1">
              <li>
                <Link 
                  to="/itinerary-planner" 
                  className={`flex items-center p-2 rounded-md transition-all ${isActive('/itinerary-planner') ? 
                    'text-amber-300 bg-[#2a3a5f]' : 
                    'text-amber-100 hover:bg-[#2a3a5f] hover:text-amber-300'}`}
                  onClick={handleLinkClick}
                >
                  <FaMapMarkedAlt className="mr-2" />
                  Itinerary Planner
                </Link>
              </li>
              <li>
                <Link 
                  to="/travel-insurance" 
                  className={`flex items-center p-2 rounded-md transition-all ${isActive('/travel-insurance') ? 
                    'text-amber-300 bg-[#2a3a5f]' : 
                    'text-amber-100 hover:bg-[#2a3a5f] hover:text-amber-300'}`}
                  onClick={handleLinkClick}
                >
                  <FaUmbrellaBeach className="mr-2" />
                  Travel Insurance
                </Link>
              </li>
              <li>
                <Link 
                  to="/visa-assistance" 
                  className={`flex items-center p-2 rounded-md transition-all ${isActive('/visa-assistance') ? 
                    'text-amber-300 bg-[#2a3a5f]' : 
                    'text-amber-100 hover:bg-[#2a3a5f] hover:text-amber-300'}`}
                  onClick={handleLinkClick}
                >
                  <FaPassport className="mr-2" />
                  Visa Assistance
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Settings */}
        <li>
          <Link 
            to="/settings" 
            className={`flex items-center p-3 my-1 rounded-lg transition-all duration-200 ${isActive('/settings') ? 
              'bg-amber-600 bg-opacity-30 text-amber-100 border-l-4 border-amber-500' : 
              'text-amber-100 hover:bg-[#2a3a5f] hover:text-amber-300'}`}
            onClick={handleLinkClick}
          >
            <FaCog className="text-xl min-w-[24px]" />
            {isOpen && <span className="ml-4 font-medium">Settings</span>}
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