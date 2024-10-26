// eslint-disable-next-line no-unused-vars
import React, { useState,useEffect } from "react";


// eslint-disable-next-line react/prop-types
const  EditPackageVisModal = ({ isOpen, onRequestClose, selectedPackage}) => {
  const [packageData, setPackageData] = useState({
    title: "",
    description: "",
    images: [""],
    thumbnail:"",
    details: "",
    faculty: [], // Initialize faculty as an empty array
    howToApply: "",
    overview: "",
    pricing: [{ title: "", amount: "", currency: "" }],
    faq: [{ question: "", answer: "" }],
    processType: ["Low"], // Initialize with a default value
    visaNo: [0], // Initialize with a default number
    options: [
      {
        title: "",
        badge: "",
        discount: "",
        refundStatus: "",
        processType:["Low", "Medium", "High"],
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
  console.log(packageData,"packageData");
  

  const [page, setPage] = useState(1); // Track the current page

  // Handle input changes
  const handleChange = (e, index, section) => {
    const { name, value } = e.target;
    
    if (section) {
      const updatedSection = [...packageData[section]];
      updatedSection[index][name] = value;
      setPackageData({ ...packageData, [section]: updatedSection });
    } else {
      setPackageData({ ...packageData, [name]: value });
    }
  };

   // Load selected package data into the modal when opened
useEffect(() => {
  if (selectedPackage) {
    setPackageData({
      // eslint-disable-next-line react/prop-types
      title: selectedPackage.packageName || "",
       // eslint-disable-next-line react/prop-types
      description: selectedPackage.description || "",
       // eslint-disable-next-line react/prop-types
      thumbnail: selectedPackage.thumbnail || "",

      // eslint-disable-next-line react/prop-types
      images: selectedPackage.image || "",
       // eslint-disable-next-line react/prop-types
      details: selectedPackage.details || "", // Example field
       // eslint-disable-next-line react/prop-types
      faculty: selectedPackage.faculty || [], // Ensure it initializes as an array
       // eslint-disable-next-line react/prop-types
      howToApply: selectedPackage.howToApply || "",
       // eslint-disable-next-line react/prop-types
      overview: selectedPackage.overview || "",
       // eslint-disable-next-line react/prop-types
      pricing: selectedPackage.pricing || [{ title: "", amount: "", currency: "" }],
       // eslint-disable-next-line react/prop-types
      faq: selectedPackage.faq || [{ question: "", answer: "" }],
       // eslint-disable-next-line react/prop-types
      options: selectedPackage.options || [{
        title: "",
        badge: "",
        discount: "",
        refundStatus: "",
        processType: ["Low"],
        visaNo: [""],
        price: "",
        currency: "",
        discountPercentage: "",
        footerText: "",
      }],
       // eslint-disable-next-line react/prop-types
      packageCost: selectedPackage.packageCost || [{ title: "", amount: "", currency: "" }],
       // eslint-disable-next-line react/prop-types
      tax: selectedPackage.tax || [{ title: "", amount: "", currency: "" }],
       // eslint-disable-next-line react/prop-types
      processType: selectedPackage.processType || ["Low"], // Ensure it initializes correctly
       // eslint-disable-next-line react/prop-types
      visaNo: selectedPackage.visaNo || [0], // Ensure it initializes correctly
    });
  }
}, [selectedPackage, isOpen]);

  

  // Add new fields for pricing, FAQ, options, etc.
  const handleAddField = (section) => {
    const newField = section === "pricing" || section === "packageCost" || section === "tax"
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

    setPackageData({ ...packageData, [section]: [...packageData[section], newField] });
  };

  // Remove fields from pricing, FAQ, options, etc.
  const handleRemoveField = (index, section) => {
    const updatedSection = packageData[section].filter((_, i) => i !== index);
    setPackageData({ ...packageData, [section]: updatedSection });
  };

  const handleNext = () => {
    setPage((prev) => Math.min(prev + 1, 3));
  };

  const handlePrev = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };


  
  
  if (!isOpen) return null;

  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <h2 className="text-2xl mb-4">Edit  Visa Package</h2>
        {/* Page 1: Basic Info & Pricing Details */}
        {page === 1 && (
          <form className="space-y-4">
            <input
              name="title"
              value={packageData.title}
              onChange={handleChange}
              placeholder="Title"
              className="w-full p-2 border"
            />
            <textarea
              name="description"
              value={packageData.description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full p-2 border"
            />
  
            {/* Thumbnail URL Input */}
            <input
              name="thumbnail"
              value={packageData.thumbnail}
              onChange={handleChange}
              placeholder="Thumbnail URL"
              className="w-full p-2 border"
            />
  
            {/* Image Upload */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setPackageData({
                    ...packageData,
                    images: file,
                  });
                }
              }}
              className="w-full p-2 border"
            />
  
            <textarea
              name="details"
              value={packageData.details}
              onChange={handleChange}
              placeholder="Details"
              className="w-full p-2 border"
            />
  
            {/* Process Type */}
            <div className="mt-6">
              <h3 className="text-xl mb-2">Process Type</h3>
              {packageData.processType.map((type, index) => (
                <div key={index} className="flex space-x-4 mb-2">
                  <select
                    value={type}
                    onChange={(e) => {
                      const newTypes = [...packageData.processType];
                      newTypes[index] = e.target.value;
                      setPackageData({ ...packageData, processType: newTypes });
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
                      const newTypes = [...packageData.processType];
                      newTypes.splice(index, 1);
                      setPackageData({ ...packageData, processType: newTypes });
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
                  setPackageData({
                    ...packageData,
                    processType: [...packageData.processType, "Low"],
                  });
                }}
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
              >
                Add Process Type
              </button>
            </div>
  
            {/* Visa Numbers */}
            <div className="mt-6">
              <h3 className="text-xl mb-2">Visa Numbers</h3>
              {packageData.visaNo.map((visa, index) => (
                <div key={index} className="flex space-x-4 mb-2">
                  <input
                    type="number"
                    value={visa}
                    onChange={(e) => {
                      const newVisaNos = [...packageData.visaNo];
                      newVisaNos[index] = e.target.value;
                      setPackageData({ ...packageData, visaNo: newVisaNos });
                    }}
                    placeholder="Visa Number"
                    className="w-1/3 p-2 border"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newVisaNos = [...packageData.visaNo];
                      newVisaNos.splice(index, 1);
                      setPackageData({ ...packageData, visaNo: newVisaNos });
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
                  setPackageData({ ...packageData, visaNo: [...packageData.visaNo, 0] });
                }}
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
              >
                Add Visa Number
              </button>
            </div>
  
            {/* Pricing Details */}
            <div className="mt-6">
              <h3 className="text-xl mb-2">Pricing Details</h3>
              {packageData.pricing.map((priceDetail, index) => (
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
            {packageData.faculty.map((facultyDetail, index) => (
                <div key={index} className="flex space-x-4 mb-2">
                  <input
                    name="faculty"
                    value={facultyDetail.faculty}
                    onChange={(e) => handleChange(e, index, "faculty")}
                    placeholder="faculty"
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
              {packageData.options.map((option, index) => (
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
                    value={option.discountPrice}
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
              {packageData.faq.map((faqItem, index) => (
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
                value={packageData.howToApply}
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
                value={packageData.overview}
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

export default EditPackageVisModal;
