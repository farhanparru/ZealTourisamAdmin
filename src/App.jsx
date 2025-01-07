// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './AdminUI/Sidebar';
import Navbar from './AdminUI/Navabar';
import Dashboard from './AdminUI/Dashboard';
import Umraha from './packages/Umraha';
import GlobalVisas from './packages/GlobalVisas';
import AdminLogin from './AdminUI/AdminLogin';
import ProtectedRoute from './AdminUI/ProtectedRoute';
import Adminprofile from './AdminUI/Adminprofile';
import AdminForgotPassword from './AdminUI/AdminforgotPassword';
import AddHolidays from './pages/AddHolidays/AddHolidays';
import UpdateHolidays from './pages/UpdateHolidays/UpdateHolidays';
import Holidays from './pages/Holidays/Holidays';
import AddGlobalVisasPackageModal from '../src/packages/AddGlobalVisasPackageModal';
import EditVisModal from '../src/packages/EditVisModal'
import { ToastContainer } from 'react-toastify';

import AddUmrahPackageModal from './packages/AddUmrahaPackageModal';
import UmrahaSEO from './SEOsettings/UmrahaSEO';
import AddBanner from './packages/AddBanner';
import Enquiry from './components/Enquiry';
import EditUmrahPackageModal from './packages/EditUmrahaPackageModal';

// Dummy components for the routes
const Packages = () => <h2>Packages</h2>;
const Bookings = () => <h2>Bookings</h2>;
const Travelers = () => <h2>Travelers</h2>;


const Deals = () => <h2>Deals</h2>;
const Feedback = () => <h2>Feedback</h2>;

// Helper component to determine if current route is login
// eslint-disable-next-line react/prop-types
const AppLayout = ({ children }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/'; // Check if current route is /Adminlogin
  const isForgotPasswordPage = location.pathname === '/forgot'; // Check if current route is /forgot

  return (
    <div className="flex flex-col min-h-screen">
      {/* Conditionally show Navbar and Sidebar */}
      {!isLoginPage && !isForgotPasswordPage && <Navbar />}
      <div className="flex flex-grow">
        {/* Conditionally show Sidebar */}
        {!isLoginPage && !isForgotPasswordPage && <Sidebar />}
        <div className="flex-grow p-7">
          {children}
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<AdminLogin />} />
          <Route path="/AddVisa"  element={<AddGlobalVisasPackageModal/>}/>
          <Route path='/SEOsettings' element={<UmrahaSEO/>}/>
          <Route path='/AddUmraha' element={<AddUmrahPackageModal/>}/>
          <Route path='/EditGlobalVisa/:id' element={<EditVisModal/>} />

          <Route path="/Dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/packages" element={<ProtectedRoute><Packages /></ProtectedRoute>} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/GlobalVisas" element={<ProtectedRoute><GlobalVisas /></ProtectedRoute>} />
          <Route path="/travelers" element={<Travelers />} />
          <Route path="/Addbanner" element={<AddBanner />} />
          <Route path="/EnquirysVisa" element={<Enquiry />} />
          <Route path="/deals" element={<Deals />} />
          
          <Route path="/Umrahaall" element={<ProtectedRoute><Umraha /></ProtectedRoute>} />
          <Route path="/updateUmrahaall/:id" element={<ProtectedRoute><EditUmrahPackageModal /></ProtectedRoute>} />
          
          <Route path="/holidays" element={<ProtectedRoute><Holidays /></ProtectedRoute>} />
          <Route path="/add-holidays" element={<ProtectedRoute><AddHolidays /></ProtectedRoute>} />
          <Route path="/update-holidays/:id" element={<ProtectedRoute><UpdateHolidays /></ProtectedRoute>} />

      
          <Route path="/feedback" element={<Feedback />} />
          <Route path='/Profile' element={<Adminprofile />} />
          <Route path='/forgot' element={<AdminForgotPassword />} />
        
          
        </Routes>
        <ToastContainer />
      </AppLayout>
    </Router>
    
  );
}

export default App;
