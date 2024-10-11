// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { FiEdit, FiTrash, FiEye } from "react-icons/fi";
import axios from "axios"; // Import axios for making API requests
import visas from "../assets/Images/visas.png"; // You can change this path or use different images for packages
import AddGlobalVisasPackageModal from "./AddGlobalVisasPackageModal";
import { Link } from "react-router-dom";
import EditPackageVisasModal from "./EditPackageVisasModal";

const GlobalVisas = () => {
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null); // For editing a selected package

  // Fetching visa packages from the API
  useEffect(() => {
    axios
      .get("http://localhost:3002/api/global-visa")
      .then((response) => {
        if (response.data.success) {
          const fetchedPackages = response.data.results.map((pkg) => ({
            id: pkg._id, // Capture the package ID
            packageName: pkg.title,
            description: pkg.description,
            image: pkg.thumbnail, // Use the thumbnail image from the API
          }));
          setPackages(fetchedPackages);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the visa packages!", error);
      });
  }, []);

  // Delete Visa package by ID
  const handleDeletePackage = (id) => {
    const token = localStorage.getItem('adminToken');
  
    axios
      .delete(`http://localhost:3002/api/global-visa/${id} `,{
        headers: {
          'x-access-token': `${token}`,
          'Content-Type': 'application/json',
        },
      })
      
      .then((response) => {
        if (response.data.success) {
          // Remove the deleted package from the state
          const updatedPackages = packages.filter((pkg) => pkg.id !== id);
          setPackages(updatedPackages);
        }
      })
      .catch((error) => {
        console.error("There was an error deleting the package!", error);
      });
  };

  // Handle opening and closing of Add Modal
  const openAddModal = () => {
    setAddModalIsOpen(true);
  };

  const closeAddModal = () => {
    setAddModalIsOpen(false);
  };

  // Handle opening and closing of Edit Modal
  const openEditModal = (pkg) => {
    setSelectedPackage(pkg); // Set the package to edit
    setEditModalIsOpen(true);
  };

  const closeEditModal = () => {
    setEditModalIsOpen(false);
    setSelectedPackage(null); // Clear the selected package
  };

  // Handle submission of a new package
  const handleAddPackage = (newPackage) => {
    setPackages([...packages, newPackage]);
    closeAddModal();
  };

  // Handle submission of edited package
  const handleEditPackage = (updatedPackage) => {
    const updatedPackages = packages.map((pkg) =>
      pkg.id === updatedPackage.id ? updatedPackage : pkg
    );
    setPackages(updatedPackages);
    closeEditModal();
  };

  return (
    <div className="p-6">
      {/* Special Offer Section */}
      <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white p-6 rounded-lg shadow mb-6 flex items-center justify-between">
        <div className="w-1/2">
          <h2 className="text-2xl font-bold mb-4">
            Special Offer: Global Visas Discount
          </h2>
          <p className="mb-4">
            Get exclusive discounts on our visa packages for a limited time!
          </p>
          <button className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-full font-bold hover:bg-yellow-300 transition">
            Discover Offers
          </button>
        </div>
        <div className="w-1/2 flex justify-end">
          <img
            src={visas}
            alt="Special Offer Global Visas"
            className="w-80 h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Add New Package Button */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-2">Add New Package</h2>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition"
          onClick={openAddModal}
        >
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
                <th className="px-4 py-2 text-left text-gray-600">
                  Package Name
                </th>
                <th className="px-4 py-2 text-left text-gray-600">
                  Description
                </th>
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
                    <img
                      src={pkg.image}
                      alt={pkg.packageName}
                      className="w-20 h-auto rounded"
                    />
                  </td>
                  <td className="px-4 py-2 text-center">
                    <Link to="/View">
                      <button className="text-blue-500 hover:text-blue-600 mx-2">
                        <FiEye />
                      </button>
                    </Link>
                    <button
                      className="text-yellow-500 hover:text-yellow-600 mx-2"
                      onClick={() => openEditModal(pkg)}
                    >
                      <FiEdit />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-600 mx-2"
                      onClick={() => handleDeletePackage(pkg.id)} // Pass the package ID to the delete function
                    >
                      <FiTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Package Modal */}
      <AddGlobalVisasPackageModal
        isOpen={addModalIsOpen}
        onRequestClose={closeAddModal}
        onSubmit={handleAddPackage}
      />

      {/* Edit Package Modal */}
      <EditPackageVisasModal
        isOpen={editModalIsOpen}
        onRequestClose={closeEditModal}
        selectedPackage={selectedPackage}
        onSubmit={handleEditPackage}
      />
    </div>
  );
};

export default GlobalVisas;
