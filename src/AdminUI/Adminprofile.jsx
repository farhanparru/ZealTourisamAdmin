// eslint-disable-next-line no-unused-vars
import React from 'react';
import { 
  FaCopy, FaUserShield, FaKey, FaBan, FaTrash, FaPlus, 
  FaFacebook, FaInstagram, FaWallet, FaBuilding, 
  FaCheckCircle, FaPhoneAlt, FaEnvelope 
} from 'react-icons/fa';
import admin from '../assets/Images/user.png'

const AdminProfile = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {/* Sidebar - Mobile First */}
      <div className="w-full lg:w-72 xl:w-80 bg-white shadow-sm lg:shadow-md lg:min-h-screen">
        <div className="p-5 border-b border-gray-100">
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                className="w-20 h-20 rounded-full border-2 border-white shadow-md object-cover"
                src={admin}
                alt="Profile"
              />
              <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-1 border-2 border-white">
                <div className="w-3 h-3"></div>
              </div>
            </div>
            <h2 className="mt-3 font-semibold text-gray-800 text-center text-sm sm:text-base">
              cameronwilliamson@hotmail.com
            </h2>
            <p className="text-xs text-gray-500 mt-1">Last sign in 4 minutes ago</p>
            
            <div className="flex items-center mt-3 bg-gray-50 rounded-full px-3 py-1.5">
              <span className="text-xs text-gray-600 truncate max-w-xs">
                ID: user_5fueu7n78fg8...
              </span>
              <button className="ml-2 text-gray-400 hover:text-blue-500">
                <FaCopy size={12} />
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <div className="p-4 space-y-2">
          <button className="w-full flex items-center justify-start gap-3 bg-blue-50 text-blue-600 p-3 rounded-lg hover:bg-blue-100 transition-colors text-sm sm:text-base">
            <FaUserShield className="flex-shrink-0" /> 
            <span>Impersonate User</span>
          </button>
          <button className="w-full flex items-center justify-start gap-3 bg-gray-50 text-gray-700 p-3 rounded-lg hover:bg-gray-100 transition-colors text-sm sm:text-base">
            <FaKey className="flex-shrink-0" /> 
            <span>Change Password</span>
          </button>
          <button className="w-full flex items-center justify-start gap-3 bg-red-50 text-red-600 p-3 rounded-lg hover:bg-red-100 transition-colors text-sm sm:text-base">
            <FaBan className="flex-shrink-0" /> 
            <span>Ban User</span>
          </button>
          <button className="w-full flex items-center justify-start gap-3 bg-red-100 text-red-700 p-3 rounded-lg hover:bg-red-200 transition-colors text-sm sm:text-base">
            <FaTrash className="flex-shrink-0" /> 
            <span>Delete User</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 sm:p-6 lg:p-8">
        {/* Personal Information Card */}
        <div className="bg-white rounded-xl shadow-sm p-5 sm:p-6 mb-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
            <button className="text-sm text-blue-600 hover:text-blue-800">
              Edit Profile
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* First Name */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</label>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                <p className="text-gray-800">Cameron</p>
              </div>
            </div>
            
            {/* Last Name */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</label>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                <p className="text-gray-800">Williamson</p>
              </div>
            </div>
            
            {/* Email - Full width */}
            <div className="sm:col-span-2 space-y-1">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center gap-2">
                <FaEnvelope className="text-gray-400" /> Email Address
              </label>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 flex justify-between items-center">
                <p className="text-gray-800">cameronwilliamson@hotmail.com</p>
                <span className="flex items-center text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  <FaCheckCircle className="mr-1" /> Verified
                </span>
              </div>
            </div>
            
            {/* Phone - Full width */}
            <div className="sm:col-span-2 space-y-1">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center gap-2">
                <FaPhoneAlt className="text-gray-400" /> Phone Number
              </label>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 flex justify-between items-center">
                <p className="text-gray-800">(629) 555-0129</p>
                <span className="flex items-center text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  <FaCheckCircle className="mr-1" /> Verified
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Card */}
        <div className="bg-white rounded-xl shadow-sm p-5 sm:p-6 mb-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-semibold text-gray-800">Social Media Accounts</h3>
            <button className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800">
              <FaPlus /> Add Account
            </button>
          </div>
          
          <div className="space-y-4">
            {/* Facebook */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center gap-2">
                <FaFacebook className="text-blue-500" /> Facebook
              </label>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                <p className="text-gray-800 break-all">https://www.facebook.com/comeronw</p>
              </div>
            </div>
            
            {/* Instagram */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center gap-2">
                <FaInstagram className="text-pink-500" /> Instagram
              </label>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                <p className="text-gray-800 break-all">https://www.instagram.com/comeronw</p>
              </div>
            </div>
          </div>
        </div>

        {/* Other Information Card */}
        <div className="bg-white rounded-xl shadow-sm p-5 sm:p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-5">Other Information</h3>
          
          <div className="space-y-4">
            {/* Web3 Wallets */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center gap-2">
                <FaWallet className="text-purple-500" /> Web3 Wallets
              </label>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                <p className="text-gray-800 break-all">https://wpshout.com/</p>
              </div>
            </div>
            
            {/* Enterprise Account */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center gap-2">
                <FaBuilding className="text-blue-400" /> Enterprise Account
              </label>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                <p className="text-gray-800 break-all">https://www.l...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;