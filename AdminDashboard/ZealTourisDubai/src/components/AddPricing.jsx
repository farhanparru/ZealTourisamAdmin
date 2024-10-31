// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import Modal from 'react-modal';
import { FaMoneyBillWave, FaPercent } from 'react-icons/fa'; // Importing icons


// Set the app element for accessibility
Modal.setAppElement('#root');

// Custom styles for the modal
const customStyles = {
  content: {
    top: '50%',
    left: '50%', // Center horizontally
    transform: 'translate(-50%, -50%)', // Center vertically
    right: 'auto',
    bottom: 'auto',
    width: '90%', // Adjust the width to your preference
    maxWidth: '600px', // Optional max width
    padding: '20px',
    borderRadius: '9px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Add some shadow for depth
  },
};

// eslint-disable-next-line react/prop-types
const AddPricing = ({ isOpen, onClose ,onSubmit}) => {
  const [packageTitle, setPackageTitle] = useState('');
  const [packageAmount, setPackageAmount] = useState('');
  const [packageCurrency, setPackageCurrency] = useState('');
  const [taxTitle, setTaxTitle] = useState('');
  const [taxAmount, setTaxAmount] = useState('');
  const [taxCurrency, setTaxCurrency] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      pricing: {
        packageCost: [{ title: packageTitle, amount: packageAmount, currency: packageCurrency }],
        tax: [{ title: taxTitle, amount: taxAmount, currency: taxCurrency }],
      }
    };
console.log(formData,"formData");

    onSubmit(formData);

    setPackageTitle('');
    setPackageAmount('');
    setPackageCurrency('');
    setTaxTitle('');
    setTaxAmount('');
    setTaxCurrency('');

    onClose();
  };


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add Pricing Package"
      style={customStyles} // Apply custom styles here
    >
      <h2 className="text-xl font-semibold mb-4">Add Pricing Package</h2>
      <form onSubmit={handleSubmit}>
      <h3 className="text-lg font-semibold mt-4 flex items-center">
          <FaMoneyBillWave className="mr-2 text-gray-600" /> {/* Package Cost Icon */}
          Package Cost
        </h3>
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">
            Title:
            <input
              type="text"
              value={packageTitle}
              onChange={(e) => setPackageTitle(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </label>
        </div>
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">
            Amount:
            <input
              type="number"
              value={packageAmount}
              onChange={(e) => setPackageAmount(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </label>
        </div>
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">
            Currency:
            <input
              type="text"
              value={packageCurrency}
              onChange={(e) => setPackageCurrency(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </label>
        </div>

        <h3 className="text-lg font-semibold mt-4 flex items-center">
          <FaPercent className="mr-2 text-gray-600" /> {/* Tax Icon */}
          Tax
        </h3>
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">
            Title:
            <input
              type="text"
              value={taxTitle}
              onChange={(e) => setTaxTitle(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </label>
        </div>
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">
            Amount:
            <input
              type="number"
              value={taxAmount}
              onChange={(e) => setTaxAmount(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </label>
        </div>
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">
            Currency:
            <input
              type="text"
              value={taxCurrency}
              onChange={(e) => setTaxCurrency(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </label>
        </div>

        <div className="flex justify-end space-x-2 mt-4">
          <button type="submit" className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition">Save</button>
          <button onClick={onClose} type="button" className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition">Close</button>
        </div>
      </form>
    </Modal>
  );
};

export default AddPricing;
