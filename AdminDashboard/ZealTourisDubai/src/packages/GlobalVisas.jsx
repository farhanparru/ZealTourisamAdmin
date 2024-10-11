// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { FiEdit, FiTrash, FiEye } from "react-icons/fi";
import visas from "../assets/Images/visas.png"; // You can change this path or use different images for packages
import AddGlobalVisasPackageModal from "./AddGlobalVisasPackageModal";
import { Link } from 'react-router-dom';

const GlobalVisas = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [packages, setPackages] = useState([
    {
      host: "Ryan Richards",
      location: "Khulna",
      packageName: "Sundarbans",
      description: "Explore the mangrove forests and wildlife of the Sundarbans.",
      image: visas, // Add your image URL here
    },
    {
      host: "Richard Holland",
      location: "Chittagong",
      packageName: "Cox's Bazar",
      description: "Enjoy the longest unbroken sea beach in the world.",
      image: visas, // Add your image URL here
    },
  ]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleAddPackage = (newPackage) => {
    setPackages([...packages, newPackage]);
    closeModal();
  };

  return (
    <div className="p-6">
      {/* Special Offer Section */}
      <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white p-6 rounded-lg shadow mb-6 flex items-center justify-between">
        <div className="w-1/2">
          <h2 className="text-2xl font-bold mb-4">Special Offer: Global Visas Discount</h2>
          <p className="mb-4">Get exclusive discounts on our visa packages for a limited time!</p>
          <button className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-full font-bold hover:bg-yellow-300 transition">
            Discover Offers
          </button>
        </div>
        <div className="w-1/2 flex justify-end">
          <img src={visas} alt="Special Offer Global Visas" className="w-80 h-auto rounded-lg shadow-lg" />
        </div>
      </div>

      {/* Add New Package Button */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-2">Add New Package</h2>
        <button className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition" onClick={openModal}>
          <span className="text-lg">+</span>
        </button>
      </div>

      {/* Packages Table */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-2">All Packages</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-gray-600">Package Name</th>
                <th className="px-4 py-2 text-left text-gray-600">Description</th>
                <th className="px-4 py-2 text-left text-gray-600">Image</th>
                <th className="px-4 py-2 text-center text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {packages.map((pkg, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{pkg.packageName}</td>
                  <td className="px-4 py-2">{pkg.description}</td>
                  <td className="px-4 py-2">
                    <img src={pkg.image} alt={pkg.packageName} className="w-20 h-auto rounded" />
                  </td>
                  <td className="px-4 py-2 text-center">
                   <Link to="/View"><button className="text-blue-500 hover:text-blue-600 mx-2"><FiEye /></button></Link> 
                    <button className="text-yellow-500 hover:text-yellow-600 mx-2"><FiEdit /></button>
                    <button className="text-red-500 hover:text-red-600 mx-2"><FiTrash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <AddGlobalVisasPackageModal isOpen={modalIsOpen} onRequestClose={closeModal} onSubmit={handleAddPackage} />
    </div>
  );
};

export default GlobalVisas;
