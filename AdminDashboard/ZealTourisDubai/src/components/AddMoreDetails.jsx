// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import Modal from "react-modal";
import { MdMoreHoriz } from "react-icons/md"; // Import icon from react-icons

Modal.setAppElement("#root"); // Set root element for accessibility

const customStyles = {
  content: {
    top: "50%",
    left: "50%", // Center horizontally
    right: "auto",
    bottom: "auto",
    width: "90%", // Adjust the width to your preference
    maxWidth: "600px", // Optional max width
    padding: "20px",
    borderRadius: "9px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Add shadow for depth
  },
};

// eslint-disable-next-line react/prop-types
const AddMoreDetails = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    faculty: [""],
    howToApply: "",
    overview: "",
    processType: ["Low", "Medium", "High"],
    visaNo: [""],
    faq: { question: "", answer: "" },
  });

  const handleChange = (e, index, field) => {
    const { name, value } = e.target;

    if (name === "question" || name === "answer") {
      setFormData({
        ...formData,
        faq: { ...formData.faq, [name]: value },
      });
    } else if (field) {
      const updatedField = [...formData[field]];
      updatedField[index] = value;
      setFormData({ ...formData, [field]: updatedField });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addField = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  const removeField = (field, index) => {
    const updatedField = [...formData[field]];
    updatedField.splice(index, 1);
    setFormData({ ...formData, [field]: updatedField });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    onSubmit(formData); // Call onSubmit with formData
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles} // Apply custom styles here
      className="modal-content bg-white rounded-lg p-6 max-w-md mx-auto shadow-lg border border-gray-300"
      overlayClassName="modal-overlay fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center"
    >
      <div className="flex items-center mb-4">
        <MdMoreHoriz className="text-xl text-gray-700 mr-2" />{" "}
        {/* Icon for "More Details" */}
        <h2 className="text-lg font-semibold text-gray-700">
          Add More Details
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Faculty Fields */}
        <div>
          <label className="block text-gray-700 font-medium">Faculty:</label>
          {formData.faculty.map((faculty, index) => (
            <div key={index} className="flex items-center space-x-2 mt-1">
              <input
                type="text"
                name="faculty"
                value={faculty}
                onChange={(e) => handleChange(e, index, "faculty")}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded outline-none"
              />
              <button
                type="button"
                onClick={() => removeField("faculty", index)}
                className="text-red-500 font-semibold"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addField("faculty")}
            className="text-blue-500 mt-2"
          >
            + Add Faculty
          </button>
        </div>

        {/* Visa No Fields */}
        <div>
          <label className="block text-gray-700 font-medium">Visa No:</label>
          {formData.visaNo.map((visa, index) => (
            <div key={index} className="flex items-center space-x-2 mt-1">
              <input
                type="text"
                name="visaNo"
                value={visa}
                onChange={(e) => handleChange(e, index, "visaNo")}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded outline-none"
              />
              <button
                type="button"
                onClick={() => removeField("visaNo", index)}
                className="text-red-500 font-semibold"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addField("visaNo")}
            className="text-blue-500 mt-2"
          >
            + Add Visa No
          </button>
        </div>

        {/* Process Type Fields */}
        {/* Process Type Fields */}
        <div>
          <label className="block text-gray-700 font-medium">
            Process Type:
          </label>
          {formData.processType.map((process, index) => (
            <div key={index} className="flex items-center space-x-2 mt-1">
              <select
                name="processType"
                value={process}
                onChange={(e) => handleChange(e, index, "processType")}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded outline-none"
              >
                <option value="">Select Process Type</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <button
                type="button"
                onClick={() => removeField("processType", index)}
                className="text-red-500 font-semibold"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addField("processType")}
            className="text-blue-500 mt-2"
          >
            + Add Process Type
          </button>
        </div>

        {/* Other fields (How to Apply, Overview, FAQ) */}
        <div>
          <label className="block text-gray-700 font-medium">
            How To Apply:
          </label>
          <textarea
            type="text"
            name="howToApply"
            value={formData.howToApply}
            onChange={handleChange}
            required
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded outline-none"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Overview:</label>
          <textarea
            name="overview"
            value={formData.overview}
            onChange={handleChange}
            required
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded outline-none"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">
            FAQ Question:
          </label>
          <input
            type="text"
            name="question"
            value={formData.faq.question}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded outline-none"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">FAQ Answer:</label>
          <textarea
            name="answer"
            value={formData.faq.answer}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded outline-none"
          />
        </div>

        {/* Submit and Close buttons */}
        <div className="flex justify-end space-x-2 mt-4">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition"
          >
            Save
          </button>
          <button
            onClick={onClose}
            type="button"
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition"
          >
            Close
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddMoreDetails;
