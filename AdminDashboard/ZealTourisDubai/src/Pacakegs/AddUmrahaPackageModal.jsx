// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import Modal from 'react-modal';

// Set the root element for modal accessibility
Modal.setAppElement('#root');

// eslint-disable-next-line react/prop-types
const AddUmrahaPackageModal = ({ isOpen, onRequestClose, onSubmit }) => {
  const [packageData, setPackageData] = useState({
    title: '',
    description: '',
    location: '',
    startDate: '',
    endDate: '',
    pricing: [{ title: 'Package Cost', amount: '', currency: 'USD' }],
    itinerary: [],
    inclusion: [],
    exclusion: [],
    faq: [],
    bookingPolicy: {
      cancellation: { title: 'Cancellation Policy', description: '' },
      childPolicy: { title: 'Child Policy', description: '' },
      otherPolicies: []
    },
    rating: { stars: 4, reviews: [] }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPackageData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(packageData); // Call the submit handler from props
    onRequestClose(); // Close the modal after submitting
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add New Umraha Package"
      className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto mt-20"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <h2 className="text-2xl font-bold mb-4">Add New Umraha Package</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Package Name */}
        <input
          type="text"
          name="title"
          value={packageData.title}
          placeholder="Package Name"
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
        {/* Description */}
        <textarea
          name="description"
          value={packageData.description}
          placeholder="Package Description"
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        {/* Location */}
        <input
          type="text"
          name="location"
          value={packageData.location}
          placeholder="Location"
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        {/* Start Date */}
        <input
          type="date"
          name="startDate"
          value={packageData.startDate}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        {/* End Date */}
        <input
          type="date"
          name="endDate"
          value={packageData.endDate}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        {/* Pricing Details */}
        <input
          type="number"
          name="pricingAmount"
          value={packageData.pricing[0].amount}
          placeholder="Package Cost"
          onChange={(e) =>
            setPackageData((prev) => ({
              ...prev,
              pricing: [{ ...prev.pricing[0], amount: e.target.value }],
            }))
          }
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        {/* Inclusions */}
        <textarea
          name="inclusion"
          value={packageData.inclusion.join(", ")}
          placeholder="Inclusions (comma-separated)"
          onChange={(e) =>
            setPackageData((prev) => ({
              ...prev,
              inclusion: e.target.value.split(","),
            }))
          }
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        {/* Exclusions */}
        <textarea
          name="exclusion"
          value={packageData.exclusion.join(", ")}
          placeholder="Exclusions (comma-separated)"
          onChange={(e) =>
            setPackageData((prev) => ({
              ...prev,
              exclusion: e.target.value.split(","),
            }))
          }
          className="w-full p-2 border border-gray-300 rounded-md"
        />
  
        {/* Thumbnail Upload */}
        <div>
          <label className="block text-gray-700">Package Thumbnail</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setPackageData((prev) => ({
                ...prev,
                thumbnail: e.target.files[0],
              }))
            }
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
  
        {/* Optional: Thumbnail Preview */}
        {packageData.thumbnail && (
          <div className="mt-4">
            <img
              src={URL.createObjectURL(packageData.thumbnail)}
              alt="Thumbnail Preview"
              className="w-32 h-32 object-cover"
            />
          </div>
        )}
  
        {/* Submit and Cancel */}
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
            onClick={onRequestClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Add Package
          </button>
        </div>
      </form>
    </Modal>
  );
  
};

export default AddUmrahaPackageModal;
