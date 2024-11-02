import { useState } from 'react';
import Modal from 'react-modal';
import { MdCreditCard } from 'react-icons/md';

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
const VisaOption = ({ isOpen, onClose ,onSubmit}) => {
 
  const [formData, setFormData] = useState({
    title: '',
    badge: '',
    discount: '',
    refundStatus: '',
    price: '',
    currency: '',
    discountPercentage: '',
    discountPrice: '',
    footerText: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
    console.log('Form Data:', formData);
 
  };

  return (
    <div>
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles} // Apply custom styles here
    >
      <div className="flex items-center mb-4">
        <MdCreditCard className="text-2xl text-gray-700 mr-2" />
        <h2 className="text-xl font-semibold">Add Visa Option</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none
               focus:ring focus:ring-blue-500 p-3 text-lg "
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Badge:
            <input
              type="text"
              name="badge"
              value={formData.badge}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 p-3 text-lg"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Discount:
            <input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 p-3 text-lg"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Refund Status:
            <input
              type="text"
              name="refundStatus"
              value={formData.refundStatus}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 p-3 text-lg"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Price:
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 p-3 text-lg"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Currency:
            <input
              type="text"
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 p-3 text-lg"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Discount Percentage:
            <input
              type="number"
              name="discountPercentage"
              value={formData.discountPercentage}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 p-3 text-lg"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Discount Price:
            <input
              type="number"
              name="discountPrice"
              value={formData.discountPrice}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 p-3 text-lg"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Footer Text:
            <textarea
              name="footerText"
              value={formData.footerText}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 p-3 text-lg"
            ></textarea>
          </label>
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <button type="submit" className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition">Save</button>
          <button onClick={onClose} type="button" className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition">Close</button>
        </div>
      </form>
    </Modal>
  </div>
  
  );
};

export default VisaOption;
