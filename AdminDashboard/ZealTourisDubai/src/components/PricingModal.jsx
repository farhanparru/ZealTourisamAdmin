import React, { useState } from 'react';
import Modal from 'react-modal';

const PricingModal = ({ isOpen, onClose, onSubmit, holidayData }) => {
  const [pricingData, setPricingData] = useState({
    title: holidayData.pricing?.title || '',
    description: holidayData.pricing?.description || '',
    packageCost: holidayData.pricing?.packageCost || [{
      title: '',
      amount: '',
      currency: '',
    }],
    tax: holidayData.pricing?.tax || [{
      title: '',
      amount: '',
      currency: '',
    }],
    totalAmount: holidayData.pricing?.totalAmount || '',
  });


  // Handle changes for title, description, and totalAmount
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPricingData({ ...pricingData, [name]: value });
  };

  // Handle change for array fields (packageCost and tax)
  const handleArrayChange = (index, field, value, arrayType) => {
    const updatedArray = pricingData[arrayType].map((item, idx) =>
      idx === index ? { ...item, [field]: value } : item
    );
    setPricingData({ ...pricingData, [arrayType]: updatedArray });
  };

  // Add new item to packageCost or tax
  const handleAddItem = (arrayType) => {
    const newItem = { title: '', amount: '', currency: '' };
    setPricingData({ ...pricingData, [arrayType]: [...pricingData[arrayType], newItem] });
  };

  // Remove item from packageCost or tax
  const handleRemoveItem = (index, arrayType) => {
    const updatedArray = pricingData[arrayType].filter((_, idx) => idx !== index);
    setPricingData({ ...pricingData, [arrayType]: updatedArray });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(pricingData); // Pass data to parent component
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Pricing Modal">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Pricing Details</h2>
        <form onSubmit={handleSubmit}>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={pricingData.title}
            onChange={handleChange}
            placeholder="Title"
            className="form-input w-full mb-4 p-2 border border-gray-300 rounded"
          />
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            name="description"
            value={pricingData.description}
            onChange={handleChange}
            placeholder="Description"
            className="form-textarea w-full mb-4 p-2 border border-gray-300 rounded"
          />

          <h3 className="text-xl font-semibold mb-2">Package Cost</h3>
          {pricingData.packageCost.map((cost, index) => (
            <div key={index} className="form-array-item mb-4">
              <input
                type="text"
                placeholder="Package Title"
                value={cost.title}
                onChange={(e) => handleArrayChange(index, 'title', e.target.value, 'packageCost')}
                className="form-input w-full mb-2 p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                placeholder="Amount"
                value={cost.amount}
                onChange={(e) => handleArrayChange(index, 'amount', e.target.value, 'packageCost')}
                className="form-input w-full mb-2 p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                placeholder="Currency"
                value={cost.currency}
                onChange={(e) => handleArrayChange(index, 'currency', e.target.value, 'packageCost')}
                className="form-input w-full mb-2 p-2 border border-gray-300 rounded"
              />
              <button type="button" onClick={() => handleRemoveItem(index, 'packageCost')} className="btn bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddItem('packageCost')} className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
            Add Package Cost
          </button>

          <h3 className="text-xl font-semibold mb-2">Tax</h3>
          {pricingData.tax.map((taxItem, index) => (
            <div key={index} className="form-array-item mb-4">
              <input
                type="text"
                placeholder="Tax Title"
                value={taxItem.title}
                onChange={(e) => handleArrayChange(index, 'title', e.target.value, 'tax')}
                className="form-input w-full mb-2 p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                placeholder="Amount"
                value={taxItem.amount}
                onChange={(e) => handleArrayChange(index, 'amount', e.target.value, 'tax')}
                className="form-input w-full mb-2 p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                placeholder="Currency"
                value={taxItem.currency}
                onChange={(e) => handleArrayChange(index, 'currency', e.target.value, 'tax')}
                className="form-input w-full mb-2 p-2 border border-gray-300 rounded"
              />
              <button type="button" onClick={() => handleRemoveItem(index, 'tax')} className="btn bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddItem('tax')} className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
            Add Tax
          </button>

          <h3 className="text-xl font-semibold mb-2">Total Amount</h3>
          <input
            type="text"
            name="totalAmount"
            value={pricingData.totalAmount}
            onChange={handleChange}
            placeholder="Total Amount"
            className="form-input w-full mb-4 p-2 border border-gray-300 rounded"
          />

          <div className="mt-3 flex justify-end space-x-2">
            <button type="submit" className="btn bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Save Pricing
            </button>
            <button type="button" onClick={onClose} className="btn bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default PricingModal;