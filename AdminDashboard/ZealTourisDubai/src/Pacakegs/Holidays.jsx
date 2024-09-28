// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
import holiday from '../assets/Images/holiadys.png';
import AddHolidaysPackageModal from './AddHolidaysPackageModal';

// Mock data for holidays
const initialHolidays = [
  {
    id: 1,
    name: 'New Year',
    description: 'Celebrate the beginning of a new year.',
    imageUrl: 'https://example.com/new-year.jpg',
  },
  {
    id: 2,
    name: 'Christmas',
    description: 'A time for family, joy, and giving.',
    imageUrl: 'https://example.com/christmas.jpg',
  },
];

// Special Holiday
const specialHoliday = {
  id: 6,
  name: 'Special Summer Holiday',
  description: 'Enjoy a relaxing summer vacation with family and friends.',
  imageUrl: 'https://example.com/summer-holiday.jpg',
};

const Holidays = () => {
  const [holidays, setHolidays] = useState(initialHolidays);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [packages, setPackages] = useState([
    {
      id: 1,
      host: 'Ryan Richards',
      location: 'Khulna',
      packageName: 'Sundarbans',
      type: 'Group',
      duration: '3D 2N',
      phone: '(164)224-5824',
      email: 'ronnie.nelson@mail.com',
    },
    // Add other package details
  ]);

  // Function to handle the delete action
  const handleDelete = (id) => {
    setHolidays(holidays.filter((holiday) => holiday.id !== id));
  };

  // Function to handle the edit action (mock implementation)
  const handleEdit = (id) => {
    const holiday = holidays.find((holiday) => holiday.id === id);
    alert(`Edit holiday: ${holiday.name}`);
    // Implement the modal for editing here
  };

  // Function to handle the view action (mock implementation)
  const handleView = (id) => {
    const holiday = holidays.find((holiday) => holiday.id === id);
    alert(`View details for holiday: ${holiday.name}`);
    // Implement a detailed view modal here
  };

  // Function to open the add holiday modal
  const openModal = () => {
    setModalIsOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalIsOpen(false);
  };

  // Function to handle adding a new holiday package (mock implementation)
  const handleAddPackage = (newPackage) => {
    // Logic to add new holiday package
    setPackages([...packages, newPackage]);
    closeModal();
  };

  return (
    <div className="container mx-auto p-4">
      {/* Header Section */}
      <div className="bg-blue-100 p-6 rounded-lg shadow-lg mb-6">
        <h1 className="text-3xl font-bold mb-4">Holidays</h1>
        <p className="text-gray-700">
          Browse our collection of holidays and special occasions from around the world.
        </p>
      </div>

      {/* Special Holiday Advertisement Section */}
      <div className="bg-yellow-100 p-6 rounded-lg shadow-lg mb-6 flex items-center space-x-6">
        <img
          src={holiday}
          alt={specialHoliday.name}
          className="w-48 h-48 object-cover rounded-lg shadow-md"
        />
        <div>
          <h2 className="text-2xl font-bold mb-2">{specialHoliday.name}</h2>
          <p className="text-gray-700 mb-4">{specialHoliday.description}</p>
          <button className="bg-green-500 text-white px-4 py-2 rounded-md">
            View More
          </button>
        </div>
      </div>

      {/* Add New Holiday Button */}
      <button
        className="bg-green-500 text-white px-4 py-2 rounded-md mb-6"
        onClick={openModal}
      >
        Add New Holiday
      </button>

      {/* Holidays List Section */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">All Holidays</h2>
        {/* Table Header */}
        <div className="grid grid-cols-5 font-bold text-gray-700 mb-2">
          <div>Holiday</div>
          <div>Description</div>
          <div>Image</div>
          <div>Actions</div>
        </div>

        {/* Holiday Rows */}
        {holidays.map((holiday) => (
          <div key={holiday.id} className="grid grid-cols-5 py-2 border-b">
            <div>{holiday.name}</div>
            <div>{holiday.description}</div>
            <div>
              <img
                src={holiday.imageUrl}
                alt={holiday.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
            </div>
            <div className="flex space-x-2">
              <FaEye
                className="text-blue-500 cursor-pointer"
                onClick={() => handleView(holiday.id)}
              />
              <FaEdit
                className="text-green-500 cursor-pointer"
                onClick={() => handleEdit(holiday.id)}
              />
              <FaTrashAlt
                className="text-red-500 cursor-pointer"
                onClick={() => handleDelete(holiday.id)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* AddHolidaysPackageModal Component */}
      <AddHolidaysPackageModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        onSubmit={handleAddPackage}
      />
    </div>
  );
};

export default Holidays;
