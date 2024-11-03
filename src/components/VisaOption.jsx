import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { MdCreditCard } from 'react-icons/md';

// Custom styles for the modal
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    right: 'auto',
    bottom: 'auto',
    width: '90%',
    maxWidth: '600px',
    height: '90%',
    padding: '20px',
    borderRadius: '9px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
};
// eslint-disable-next-line react/prop-types
const VisaOption = ({ isOpen, onClose, onSubmit, globalVisaData }) => {
  const [formData, setFormData] = useState({
    title: '',
    badge: '',
    discount: '',
    refundStatus: '',
    discountPercentage: '',
    price: '',
    currency: '',
    priceWithCurrency: [{ currency: '', price: '', discountPrice: '', discountPercentage: '' }],
    footerText: '',
  });

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    if (isOpen && globalVisaData && globalVisaData.options.length > 0) {
      // eslint-disable-next-line react/prop-types
      const visaData = globalVisaData.options[0];
      setFormData(visaData);
    }
  }, [isOpen, globalVisaData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCurrencyChange = (index, e) => {
    const { name, value } = e.target;
    const updatedPriceWithCurrency = Array.isArray(formData.priceWithCurrency)
      ? [...formData.priceWithCurrency]
      : [];
    updatedPriceWithCurrency[index][name] = value;
    setFormData({ ...formData, priceWithCurrency: updatedPriceWithCurrency });
  };
  const handleAddCurrency = () => {
    setFormData((prevData) => ({
      ...prevData,
      priceWithCurrency: Array.isArray(prevData.priceWithCurrency)
        ? [...prevData.priceWithCurrency, { currency: '', price: '', discountPrice: '', discountPercentage: '' }]
        : [{ currency: '', price: '', discountPrice: '', discountPercentage: '' }],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  console.log(formData,"VisaOption");
  
    setFormData({
      title: '',
      badge: '',
      discount: '',
      refundStatus: '',
      discountPercentage: '',
      price: '',
      currency: '',
      priceWithCurrency: [{ currency: '', price: '', discountPrice: '', discountPercentage: '' }],
      footerText: '',
    });
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      <div className="flex items-center mb-4">
        <MdCreditCard className="text-2xl text-gray-700 mr-2" />
        <h2 className="text-xl font-semibold">Add Visa Option</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto h-[75vh]">
        <div>
          <label className="block text-sm font-medium mb-1">
            Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3"
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
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Discount Percentage:
            <input
              type="text"
              name="discountPercentage"
              value={formData.discountPercentage}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
          RefundStatus:
            <input
              type="text"
              name="refundStatus"
              value={formData.refundStatus}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3"
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
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3"
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
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3"
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
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3"
            />
          </label>
        </div>
        <div className="space-y-4">
          <label className="block text-sm font-medium mb-1">Price with Currency:</label>
          {formData.priceWithCurrency?.map((item, index) => (
            <div key={index} className="flex space-x-4">
              <input
                type="text"
                name="currency"
                placeholder="Currency"
                value={item.currency}
                onChange={(e) => handleCurrencyChange(index, e)}
                required
                className="block border border-gray-300 rounded-md shadow-sm p-3 w-1/4"
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={item.price}
                onChange={(e) => handleCurrencyChange(index, e)}
                required
                className="block border border-gray-300 rounded-md shadow-sm p-3 w-1/4"
              />
              <input
                type="number"
                name="discountPrice"
                placeholder="discountPrice"
                value={item.discountPrice}
                onChange={(e) => handleCurrencyChange(index, e)}
                required
                className="block border border-gray-300 rounded-md shadow-sm p-3 w-2/4"
              />
              <input
                type="text"
                name="discountPercentage"
                placeholder="DiscountPercentage"
                value={item.discountPercentage}
                onChange={(e) => handleCurrencyChange(index, e)}
                required
                className="block border border-gray-300 rounded-md shadow-sm p-3 w-2/4"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddCurrency}
            className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Add Another Currency
          </button>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Footer Text:
            <textarea
              name="footerText"
              value={formData.footerText}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3"
            ></textarea>
          </label>
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <button type="submit" className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition">
            Save
          </button>
          <button onClick={onClose} type="button" className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition">
            Close
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default VisaOption;
