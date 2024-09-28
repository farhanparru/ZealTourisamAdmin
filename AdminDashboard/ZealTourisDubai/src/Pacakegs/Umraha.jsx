// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import AddUmrahaPackageModal from "./AddUmrahaPackageModal"; // Import the modal component
import packge from '../assets/Images/umraga.png'

const Umraha = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [packages, setPackages] = useState([
    {
      id: 1,
      host: "Ryan Richards",
      location: "Khulna",
      packageName: "Sundarbans",
      type: "Group",
      duration: "3D 2N",
      phone: "(164)224-5824",
      email: "ronnie.nelson@mail.com",
    },
    // Add other package details
  ]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleEdit = (id) => {
    console.log(`Edit package with id: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete package with id: ${id}`);
  };

  const handleView = (id) => {
    console.log(`View package with id: ${id}`);
  };

  const handleAddPackage = (newPackage) => {
    // Add the new package to the list of packages
    setPackages([...packages, { id: packages.length + 1, ...newPackage }]);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Header Section */}
      <div className="bg-blue-100 p-6 rounded-lg shadow-lg mb-6">
        <h1 className="text-3xl font-bold mb-4">Umraha Packages</h1>
        <p className="text-gray-700">
          Browse our collection of Umraha and special occasions from around the world.
        </p>
      </div>

      {/* Umraha Package Advertisement Section */}
      <div className="bg-blue-100 p-6 rounded-lg shadow-lg mb-6 flex items-center space-x-6">
        <img
          src={packge} // Assuming the first package is highlighted
          alt="Umraha Package"
          className="w-48 h-48 object-cover rounded-lg shadow-md"
        />
        <div>
          <h2 className="text-2xl font-bold mb-2">Special Umraha Package</h2>
          <p className="text-gray-700 mb-4">Description of the special package.</p>
          <div className="text-lg font-semibold mb-2">Location: Special Location</div>
          <div className="text-lg font-semibold mb-2">Price: $XXX</div>
          <button className="bg-green-500 text-white px-4 py-2 rounded-md">
            View More
          </button>
        </div>
      </div>

      {/* Add New Package Section */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Add New Package</h2>
          <button
            className="bg-green-500 text-white p-2 rounded-full"
            onClick={openModal} // Open modal
          >
            +
          </button>
        </div>
        <p className="text-gray-600">
          Add a new Umraha package to our collection.
        </p>
      </div>

      {/* Packages List Section */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">All Packages</h2>
        {/* Table Header */}
        <div className="grid grid-cols-5 font-bold text-gray-700 mb-2">
          <div>Name</div>
          <div>Description</div>
          <div>Image</div>
          <div>Actions</div>
        </div>

        {/* Package Rows */}
        {packages.map((pkg) => (
          <div key={pkg.id} className="grid grid-cols-5 py-2 border-b">
            <div>{pkg.name}</div>
            <div>{pkg.description}</div>
            <div>
              <img
                src={pkg.imageUrl}
                alt={pkg.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
            </div>
            <div className="flex space-x-2">
              <FaEye
                className="text-blue-500 cursor-pointer"
                onClick={() => handleView(pkg.id)}
              />
              <FaEdit
                className="text-green-500 cursor-pointer"
                onClick={() => handleEdit(pkg.id)}
              />
              <FaTrashAlt
                className="text-red-500 cursor-pointer"
                onClick={() => handleDelete(pkg.id)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* AddUmrahaPackageModal Component */}
      <AddUmrahaPackageModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        onSubmit={handleAddPackage}
      />
    </div>
  );
};

export default Umraha;
