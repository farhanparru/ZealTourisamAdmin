// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";

// eslint-disable-next-line react/prop-types
const AddGlobalVisasPackageModal = ({ isOpen, onRequestClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    images: [""],
    thumbnail: "",
    details: "",
    faculty: [""],
    howToApply: "",
    overview: "",
    pricing: [{ title: "", amount: "", currency: "" }],
    faq: [{ question: "", answer: "" }],
    processType: ['Low'], // Initialize with a default value
    visaNo: [0], // Initialize with a default number
    options: [
      {
        title: "",
        badge: "",
        discount: "",
        refundStatus: "",
        processType: [""],
        visaNo: [""],
        price: "",
        currency: "",
        discountPercentage: "",
        discountPrice: "",
        footerText: "",
      },
    ],
    packageCost: [{ title: "", amount: "", currency: "" }],
    tax: [{ title: "", amount: "", currency: "" }],
  });

  const [page, setPage] = useState(1); // Track the current page

  const handleChange = (e, index, section) => {
    const { name, value } = e.target;
    if (section) {
      const updatedSection = [...formData[section]];
      updatedSection[index][name] = value;
      setFormData({ ...formData, [section]: updatedSection });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddField = (section) => {
    const newField =
      section === "pricing" || section === "packageCost" || section === "tax"
        ? { title: "", amount: "", currency: "" }
        : section === "faq"
        ? { question: "", answer: "" }
        : section === "options"
        ? {
            title: "",
            badge: "",
            discount: "",
            refundStatus: "",
            processType: [""],
            visaNo: [""],
            price: "",
            currency: "",
            discountPercentage: "",
            footerText: "",
          }
        : { faculty: "" };

    setFormData({ ...formData, [section]: [...formData[section], newField] });
  };

  const handleRemoveField = (index, section) => {
    const updatedSection = formData[section].filter((_, i) => i !== index);
    setFormData({ ...formData, [section]: updatedSection });
  };

  const handleNext = () => {
    setPage((prev) => Math.min(prev + 1, 3));
  };

  const handlePrev = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <h2 className="text-2xl mb-4">Add New Visa Package</h2>
{/* Page 1: Basic Info & Pricing Details */}
{page === 1 && (
  <form className="space-y-4">
    <input
      name="title"
      value={formData.title}
      onChange={handleChange}
      placeholder="Title"
      className="w-full p-2 border"
    />
    <textarea
      name="description"
      value={formData.description}
      onChange={handleChange}
      placeholder="Description"
      className="w-full p-2 border"
    />
    <input
      type="file"
      accept="image/*"
      onChange={(e) => {
        const file = e.target.files[0];
        if (file) {
          const imageUrl = URL.createObjectURL(file);
          setFormData({
            ...formData,
            thumbnail: file,
            thumbnailUrl: imageUrl,
          });
        }
      }}
      className="w-full p-2 border"
    />
    <textarea
      name="details"
      value={formData.details}
      onChange={handleChange}
      placeholder="Details"
      className="w-full p-2 border"
    />

    {/* Process Type */}
    <div className="mt-6">
      <h3 className="text-xl mb-2">Process Type</h3>
      {formData.processType.map((type, index) => (
        <div key={index} className="flex space-x-4 mb-2">
          <select
            value={type}
            onChange={(e) => {
              const newTypes = [...formData.processType];
              newTypes[index] = e.target.value;
              setFormData({ ...formData, processType: newTypes });
            }}
            className="w-1/3 p-2 border"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <button
            type="button"
            onClick={() => {
              const newTypes = [...formData.processType];
              newTypes.splice(index, 1);
              setFormData({ ...formData, processType: newTypes });
            }}
            className="text-red-500"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => {
          setFormData({ ...formData, processType: [...formData.processType, 'Low'] });
        }}
        className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
      >
        Add Process Type
      </button>
    </div>

    {/* Visa Number */}
    <div className="mt-6">
      <h3 className="text-xl mb-2">Visa Numbers</h3>
      {formData.visaNo.map((visa, index) => (
        <div key={index} className="flex space-x-4 mb-2">
          <input
            type="number"
            value={visa}
            onChange={(e) => {
              const newVisaNos = [...formData.visaNo];
              newVisaNos[index] = e.target.value;
              setFormData({ ...formData, visaNo: newVisaNos });
            }}
            placeholder="Visa Number"
            className="w-1/3 p-2 border"
          />
          <button
            type="button"
            onClick={() => {
              const newVisaNos = [...formData.visaNo];
              newVisaNos.splice(index, 1);
              setFormData({ ...formData, visaNo: newVisaNos });
            }}
            className="text-red-500"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => {
          setFormData({ ...formData, visaNo: [...formData.visaNo, 0] });
        }}
        className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
      >
        Add Visa Number
      </button>
    </div>

    {/* Pricing Details */}
    <div className="mt-6">
      <h3 className="text-xl mb-2">Pricing Details</h3>
      {formData.pricing.map((priceDetail, index) => (
        <div key={index} className="flex space-x-4 mb-2">
          <input
            name="title"
            value={priceDetail.title}
            onChange={(e) => handleChange(e, index, "pricing")}
            placeholder="Title"
            className="w-1/3 p-2 border"
          />
          <input
            name="amount"
            value={priceDetail.amount}
            onChange={(e) => handleChange(e, index, "pricing")}
            placeholder="Amount"
            className="w-1/3 p-2 border"
          />
          <input
            name="currency"
            value={priceDetail.currency}
            onChange={(e) => handleChange(e, index, "pricing")}
            placeholder="Currency"
            className="w-1/3 p-2 border"
          />
          <button
            type="button"
            onClick={() => handleRemoveField(index, "pricing")}
            className="text-red-500"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => handleAddField("pricing")}
        className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
      >
        Add Pricing
      </button>
    </div>

   
  </form>
)}

        {/* Page 2: Faculty, Options & FAQs */}
        {page === 2 && (
          <div className="mt-6">
            {/* Faculty Section */}
            <h3 className="text-xl mb-2">Faculty</h3>
            {formData.faculty.map((facultyMember, index) => (
              <div key={index} className="flex space-x-4 mb-2">
                <input
                  name="faculty"
                  value={facultyMember}
                  onChange={(e) => handleChange(e, index, "faculty")}
                  placeholder="Faculty Member"
                  className="w-1/3 p-2 border"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveField(index, "faculty")}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddField("faculty")}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
            >
              Add Faculty
            </button>

            {/* Options Section */}
            <div className="mt-6">
              <h3 className="text-xl mb-2">Options</h3>
              {formData.options.map((option, index) => (
                <div key={index} className="flex flex-col mb-2">
                  <input
                    name="title"
                    value={option.title}
                    onChange={(e) => handleChange(e, index, "options")}
                    placeholder="Option Title"
                    className="w-full p-2 border"
                  />
                  <input
                    name="badge"
                    value={option.badge}
                    onChange={(e) => handleChange(e, index, "options")}
                    placeholder="Badge"
                    className="w-full p-2 border"
                  />
                  <input
                    name="discount"
                    value={option.discount}
                    onChange={(e) => handleChange(e, index, "options")}
                    placeholder="Discount"
                    className="w-full p-2 border"
                  />
                  <input
                    name="refundStatus"
                    value={option.refundStatus}
                    onChange={(e) => handleChange(e, index, "options")}
                    placeholder="Refund Status"
                    className="w-full p-2 border"
                  />
                  <input
                    name="price"
                    value={option.price}
                    onChange={(e) => handleChange(e, index, "options")}
                    placeholder="Price"
                    className="w-full p-2 border"
                  />
                  <input
                    name="currency"
                    value={option.currency}
                    onChange={(e) => handleChange(e, index, "options")}
                    placeholder="Currency"
                    className="w-full p-2 border"
                  />
                  <input
                    name="discountPercentage"
                    value={option.discountPercentage}
                    onChange={(e) => handleChange(e, index, "options")}
                    placeholder="Discount Percentage"
                    className="w-full p-2 border"
                  />

                  <input
                    name="discountPrice"
                    value={option.discountPercentage}
                    onChange={(e) => handleChange(e, index, "options")}
                    placeholder="discountPrice"
                    className="w-full p-2 border"
                  />
                  <input
                    name="footerText"
                    value={option.footerText}
                    onChange={(e) => handleChange(e, index, "options")}
                    placeholder="Footer Text"
                    className="w-full p-2 border"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddField("options")}
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
              >
                Add Option
              </button>
            </div>

            {/* FAQs Section */}
            <div className="mt-6">
              <h3 className="text-xl mb-2">FAQs</h3>
              {formData.faq.map((faqItem, index) => (
                <div key={index} className="flex space-x-4 mb-2">
                  <input
                    name="question"
                    value={faqItem.question}
                    onChange={(e) => handleChange(e, index, "faq")}
                    placeholder="Question"
                    className="w-1/2 p-2 border"
                  />
                  <input
                    name="answer"
                    value={faqItem.answer}
                    onChange={(e) => handleChange(e, index, "faq")}
                    placeholder="Answer"
                    className="w-1/2 p-2 border"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveField(index, "faq")}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddField("faq")}
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
              >
                Add FAQ
              </button>
            </div>
          </div>
        )}


  {/* Page 3: How to Apply & Overview */}
  {page === 3 && (
        <div className="mt-6">
          {/* How to Apply */}
          <div className="mt-6">
            <h3 className="text-xl mb-2">How to Apply</h3>
            <textarea
              name="howToApply"
              value={formData.howToApply}
              onChange={handleChange}
              placeholder="How to Apply"
              className="w-full p-2 border"
            />
          </div>

          {/* Overview */}
          <div className="mt-6">
            <h3 className="text-xl mb-2">Overview</h3>
            <textarea
              name="overview"
              value={formData.overview}
              onChange={handleChange}
              placeholder="Overview"
              className="w-full p-2 border"
            />
          </div>
        </div>
      )}

        <div className="mt-4 flex justify-between">
          {page > 1 && (
            <button
              type="button"
              onClick={handlePrev}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Previous
            </button>
          )}
          {page < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Submit
            </button>
          )}
          <button
            type="button"
            onClick={onRequestClose}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddGlobalVisasPackageModal;
