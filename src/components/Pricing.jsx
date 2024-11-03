import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FaMoneyBillWave, FaPercent } from 'react-icons/fa';

Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    right: 'auto',
    bottom: 'auto',
    width: '90%',
    maxWidth: '600px',
    padding: '20px',
    borderRadius: '9px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
};

// eslint-disable-next-line react/prop-types
const Pricing = ({ isOpen, onClose, onSubmit, globalVisaData }) => {
  const [formData, setFormData] = useState({
    pricing: {
      packageCost: [{ title: '', amount: '', currency: '' }],
      tax: [{ title: '', amount: '', currency: '' }],
    }
  });

  // Use useEffect to populate the form if globalVisaData is provided
  useEffect(() => {
    if (globalVisaData) {
      setFormData(globalVisaData);
    }
  }, [globalVisaData]);

  const handleChange = (e, section, field) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      pricing: {
        ...prevData.pricing,
        [section]: [
          {
            ...prevData.pricing[section][0],
            [field]: value,
          },
        ],
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    console.log(formData, "formData");

    // Reset fields after submission
    setFormData({
      pricing: {
        packageCost: [{ title: '', amount: '', currency: '' }],
        tax: [{ title: '', amount: '', currency: '' }],
      }
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Add Pricing Package" style={customStyles}>
      <h2 className="text-xl font-semibold mb-4">Add Pricing Package</h2>
      <form onSubmit={handleSubmit}>
        <h3 className="text-lg font-semibold mt-4 flex items-center">
          <FaMoneyBillWave className="mr-2 text-gray-600" /> Package Cost
        </h3>
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">
            Title:
            <input
              type="text"
              value={formData.pricing.packageCost[0].title}
              onChange={(e) => handleChange(e, 'packageCost', 'title')}
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
              value={formData.pricing.packageCost[0].amount}
              onChange={(e) => handleChange(e, 'packageCost', 'amount')}
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
              value={formData.pricing.packageCost[0].currency}
              onChange={(e) => handleChange(e, 'packageCost', 'currency')}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </label>
        </div>

        <h3 className="text-lg font-semibold mt-4 flex items-center">
          <FaPercent className="mr-2 text-gray-600" /> Tax
        </h3>
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">
            Title:
            <input
              type="text"
              value={formData.pricing.tax[0].title}
              onChange={(e) => handleChange(e, 'tax', 'title')}
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
              value={formData.pricing.tax[0].amount}
              onChange={(e) => handleChange(e, 'tax', 'amount')}
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
              value={formData.pricing.tax[0].currency}
              onChange={(e) => handleChange(e, 'tax', 'currency')}
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

export default Pricing;
