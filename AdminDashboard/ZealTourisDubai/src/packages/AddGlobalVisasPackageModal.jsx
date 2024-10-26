// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const AddGlobalVisasPackageModal = ({ isOpen, onRequestClose }) => {
  // eslint-disable-next-line no-unused-vars
  const [images, setImages] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    images: [],
    thumbnail: null,
    details: "",
    faculty: [],
    howToApply: "",
    overview: "",
    pricing: [{ title: "", amount: "", currency: "" }],
    faq: [{ question: "", answer: "" }],
    processType: ["Low"],
    visaNo: [0],
    options: [
      {
        title: "",
        badge: "",
        discount: "",
        refundStatus: "",
        processType: ["Low", "Medium", "High"],
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
    console.log(value, "valueee");

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



  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const token = localStorage.getItem("adminToken");
      
      // Create a new FormData instance
      const formDataToSend = new FormData();
   // Append basic fields to formDataToSend
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('overview', formData.overview);
      
     
      if (formData.images && formData.images.length > 0) {
        formData.images.forEach((image) => {
          formDataToSend.append('images', image); // Ensure images are appended correctly
        });
      }
  
      if (formData.faculty && formData.faculty.length > 0) {
        // Extract the 'faculty' property value from each object in the array
        const facultyValues = formData.faculty.map(facultyObj => facultyObj.faculty);
        console.log("Faculty data:", facultyValues);
      
        // Append each faculty value as a separate entry in formDataToSend
        facultyValues.forEach(facult => {
          formDataToSend.append('faculty', facult);
        });
      }
      
  
  
      // Append thumbnail if any
      if (formData.thumbnail) {
        formDataToSend.append('thumbnail', formData.thumbnail);
      }
  
      // Append pricing data
      formData.pricing.forEach((item, index) => {
        formDataToSend.append(`pricing[${index}][title]`, item.title);
        formDataToSend.append(`pricing[${index}][amount]`, item.amount);
        formDataToSend.append(`pricing[${index}][currency]`, item.currency);
      });
  
      // Append FAQ data
      formData.faq.forEach((item, index) => {
        formDataToSend.append(`faq[${index}][question]`, item.question);
        formDataToSend.append(`faq[${index}][answer]`, item.answer);
      });
  
      // Append options data
      formData.options.forEach((item, index) => {
        formDataToSend.append(`options[${index}][title]`, item.title);
        formDataToSend.append(`options[${index}][badge]`, item.badge);
        formDataToSend.append(`options[${index}][discount]`, item.discount);
        formDataToSend.append(`options[${index}][refundStatus]`, item.refundStatus);

        // Send only one process type (you can select the desired one based on your requirements)
  formDataToSend.append(`options[${index}][processType]`, item.processType[0]); // or just item.processType
  
  formDataToSend.append(`options[${index}][visaNo]`, item.visaNo[0]); // Ensure this is an array of numbers


        formDataToSend.append(`options[${index}][price]`, item.price);
        formDataToSend.append(`options[${index}][currency]`, item.currency);
        formDataToSend.append(`options[${index}][discountPercentage]`, item.discountPercentage);
        formDataToSend.append(`options[${index}][footerText]`, item.footerText);
      });
  
      // Append package cost data
      formData.packageCost.forEach((item, index) => {
        formDataToSend.append(`packageCost[${index}][title]`, item.title);
        formDataToSend.append(`packageCost[${index}][amount]`, item.amount);
        formDataToSend.append(`packageCost[${index}][currency]`, item.currency);
      });
  
      // Append tax data
      formData.tax.forEach((item, index) => {
        formDataToSend.append(`tax[${index}][title]`, item.title);
        formDataToSend.append(`tax[${index}][amount]`, item.amount);
        formDataToSend.append(`tax[${index}][currency]`, item.currency);
      });
  
      // Send POST request
      const response = await axios.post(
        "http://localhost:3002/api/global-visa",
        formDataToSend,
        {
          headers: {
            "x-access-token": `${token}`,
            "Content-Type": "multipart/form-data", // Important for file uploads
          },
        }
      );
  
      // Handle the API response
      if (response.status === 200) {
        console.log("Form submitted successfully:", response.data);
      
        // Reset form data after successful submission
        setFormData({
          title: "",
          description: "",
          images: [],
          thumbnail: null,
          details: "",
          faculty: [],
          howToApply: "",
          overview: "",
          pricing: [{ title: "", amount: "", currency: "" }],
          faq: [{ question: "", answer: "" }],
          processType: ["Low"],
          visaNo: [0],
          options: [
            {
              title: "",
              badge: "",
              discount: "",
              refundStatus: "",
              processType: ["Low", "Medium", "High"],
              visaNo: [""],
              price: "",
              currency: "",
              discountPercentage: "",
              footerText: "",
            },
          ],
          packageCost: [{ title: "", amount: "", currency: "" }],
          tax: [{ title: "", amount: "", currency: "" }],
        });
  
        onRequestClose(); 
      } else {
        console.error("Failed to submit form:", response.status, response.data);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  

  if (!isOpen) return null;

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      images: files, // Store the image files directly
    });
  };
  
  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      thumbnail: file, // Store the single thumbnail file
    });
  };



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

            {/* Thumbnail File Input */}
            <label className="block mb-2 font-bold">Upload Thumbnail:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleThumbnailUpload}
              className="w-full p-2 border"
            />

            {/* Image Upload (Multiple) */}
            <label className="block mb-2 font-bold">
              Upload Images (Multiple):
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
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
                  setFormData({
                    ...formData,
                    processType: [...formData.processType, "Low"],
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
            {formData.faculty.map((facultyDetail, index) => (
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
