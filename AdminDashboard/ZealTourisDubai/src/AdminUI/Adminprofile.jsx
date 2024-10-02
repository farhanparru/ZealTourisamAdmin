// eslint-disable-next-line no-unused-vars
import React from 'react';
import { FaCopy } from 'react-icons/fa'; // React Icons for the copy button
import  Admin  from '../assets/Images/Logon bar.png';
const AdminProfile = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/4 p-4 border-r">
        <div className="text-center">
          <img
            className="rounded-full w-20 h-20 mx-auto"
            src={Admin}
            alt="Profile"
          />
          <h2 className="mt-4 font-bold">cameronwilliamson@hotmail.com</h2>
          <p className="text-sm text-gray-500">Last sign in 4 minutes ago</p>

          <div className="flex justify-center items-center mt-2">
            <span className="text-sm text-gray-500">User ID: user_5fueu7n78fg8...</span>
            <button className="ml-2 text-gray-500 hover:text-black">
              <FaCopy />
            </button>
          </div>
        </div>

        {/* Sidebar Buttons */}
        <div className="mt-6">
          <button className="w-full bg-gray-100 p-2 rounded mb-2 hover:bg-gray-200">
            Impersonate User
          </button>
          <button className="w-full bg-gray-100 p-2 rounded mb-2 hover:bg-gray-200">
            Change Password
          </button>
          <button className="w-full bg-red-100 p-2 rounded text-red-500 hover:bg-red-200">
            Uban User
          </button>
          <button className="w-full bg-red-100 p-2 rounded text-red-500 hover:bg-red-200">
            Delete User
          </button>
        </div>
      </div>

      {/* Main Profile Section */}
      <div className="w-3/4 p-6">
        {/* Personal Information */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm">First Name</label>
              <input type="text" value="Cameron" className="w-full p-2 border rounded" readOnly />
            </div>
            <div>
              <label className="block text-sm">Last Name</label>
              <input type="text" value="Williamson" className="w-full p-2 border rounded" readOnly />
            </div>
            <div className="col-span-2">
              <label className="block text-sm">Email Address</label>
              <input
                type="email"
                value="cameronwilliamson@hotmail.com"
                className="w-full p-2 border rounded"
                readOnly
              />
              <span className="text-green-500 text-sm">Verified</span>
            </div>
            <div className="col-span-2">
              <label className="block text-sm">Phone Number</label>
              <input type="text" value="(629) 555-0129" className="w-full p-2 border rounded" readOnly />
              <span className="text-green-500 text-sm">Verified</span>
            </div>
          </div>
        </div>

        {/* Social Media Account */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Social Media Account</h3>
          <div>
            <label className="block text-sm">Facebook</label>
            <input
              type="text"
              value="https://www.facebook.com/comeronw"
              className="w-full p-2 border rounded"
              readOnly
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm">Instagram</label>
            <input
              type="text"
              value="https://www.instagram.com/comeronw"
              className="w-full p-2 border rounded"
              readOnly
            />
          </div>
          <button className="mt-4 bg-purple-500 text-white p-2 rounded hover:bg-purple-700">
            + Add Social Media
          </button>
        </div>

        {/* Other Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Other</h3>
          <div>
            <label className="block text-sm">Web3 Wallets</label>
            <input
              type="text"
              value="https://wpshout.com/"
              className="w-full p-2 border rounded"
              readOnly
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm">Enterprise Account</label>
            <input
              type="text"
              value="https://www.l..."
              className="w-full p-2 border rounded"
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
