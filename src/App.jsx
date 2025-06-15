import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import Enquiry from './components/VisaEnquiry';
import UmrahaEnquiry from './components/UmrahEnquiry'
import EditUmrahPackageModal from './packages/EditUmrahaPackageModal';
import BestHotel from './packages/BestHotel';
import CustomeHoliday from './packages/CustomeHoliday';
import CartTransfer from './packages/CartTransfer';
import SpecilaDay from './packages/SpecilaDay';
import ToursPackaje from './packages/ToursPackaje';
import DefaultTours from './packages/DefaultTours';
import Booking from './packages/Booking'
import Layout from './AdminUI/Layout';





function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<AdminLogin />} />
          <Route path="/AddVisa"  element={<AddGlobalVisasPackageModal/>}/>
          <Route path='/SEOsettings' element={<UmrahaSEO/>}/>
          <Route path='/AddUmraha' element={<AddUmrahPackageModal/>}/>
          <Route path='/EditGlobalVisa/:id' element={<EditVisModal/>} />
          <Route path="/Dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/GlobalVisas" element={<ProtectedRoute><GlobalVisas /></ProtectedRoute>} />
          <Route path="/Addbanner" element={<AddBanner />} />
          <Route path="/EnquirysVisa" element={<Enquiry />} />
          <Route path='/EnquiryUmraha' element={<UmrahaEnquiry/>}/>
          <Route path="/Umrahaall" element={<Umraha />} />
          <Route path="/updateUmrahaall/:id" element={<ProtectedRoute><EditUmrahPackageModal /></ProtectedRoute>} />
          <Route path="/holidays" element={<ProtectedRoute><Holidays /></ProtectedRoute>} />
          <Route path="/add-holidays" element={<ProtectedRoute><AddHolidays /></ProtectedRoute>} />
          <Route path="/update-holidays/:id" element={<ProtectedRoute><UpdateHolidays /></ProtectedRoute>} />   
          <Route path='/Profile' element={<Adminprofile />} />
          <Route path='/forgot' element={<AdminForgotPassword />} />
          <Route path='/Booking' element={<Booking/>}/>
          <Route path="/Hotels" element={<BestHotel />} />\
          <Route path='/CustomeHoliday' element={<CustomeHoliday/>}/>
          <Route path='/CarTransfer' element={<CartTransfer/>}/>
          <Route path='/Speciladay' element={<SpecilaDay/>}/>
          <Route path='/Tourspackaje' element={<ToursPackaje/>}/>
          <Route path='/DefaultTours' element={<DefaultTours/>}/>
          
        </Routes>
        <ToastContainer />
    </Layout>
    </Router>
    
  );
}

export default App;
