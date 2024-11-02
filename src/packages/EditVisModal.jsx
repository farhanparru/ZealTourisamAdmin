// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";

// eslint-disable-next-line react/prop-types
const EditPackageVisModal = ({
  // eslint-disable-next-line react/prop-types
  isOpen,
  // eslint-disable-next-line react/prop-types
  onRequestClose,
  // eslint-disable-next-line react/prop-types
  selectedPackage,
  // eslint-disable-next-line react/prop-types
  packages,
  // eslint-disable-next-line react/prop-types
  setPackages,
}) => {
  const [packageData, setPackageData] = useState({
    title: "",
    description: "",
    images: [""],
    thumbnail: "",
    details: "",
    faculty: [""], // Update here to be an array of objects
    howToApply: "",
    overview: "",
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
    pricing: {
      packageCost: [{ title: "", amount: "", currency: "" }],
      tax: [{ title: "", amount: "", currency: "" }],
    },
  });

  

  const [page, setPage] = useState(1);

  useEffect(() => {
    if (selectedPackage) {
      console.log(selectedPackage,"selectedPackage");
      
      setPackageData({
        // eslint-disable-next-line react/prop-types
        title: selectedPackage.packageName || "",
        // eslint-disable-next-line react/prop-types
        description: selectedPackage.description || "",
        // eslint-disable-next-line react/prop-types
        thumbnail: selectedPackage.thumbnail || "",
        // eslint-disable-next-line react/prop-types
        images: Array.isArray(selectedPackage.images)   ? selectedPackage.images
          : [""],
        // eslint-disable-next-line react/prop-types
        details: selectedPackage.details || "",
        // eslint-disable-next-line react/prop-types
      faculty: Array.isArray(selectedPackage.faculty) ? selectedPackage.faculty : [""],

        // eslint-disable-next-line react/prop-types
        visaNo: Array.isArray(selectedPackage.visaNo)? selectedPackage.visaNo
          : [0],
        // eslint-disable-next-line react/prop-types
        howToApply: selectedPackage.howToApply || "",
        // eslint-disable-next-line react/prop-types
        overview: selectedPackage.overview || "",
        // eslint-disable-next-line react/prop-types
        pricing: selectedPackage.pricing || {
          packageCost: [{ title: "", amount: "", currency: "" }],
          tax: [{ title: "", amount: "", currency: "" }],
        },
        // eslint-disable-next-line react/prop-types
        faq: selectedPackage.faq || [{ question: "", answer: "" }],
        // eslint-disable-next-line react/prop-types
        options: selectedPackage.options || [
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
        // eslint-disable-next-line react/prop-types
        processType: selectedPackage.processType || ["Low"],
      });
    }
  }, [selectedPackage]);

  const handleChangeR = (e, index) => {
    const updatedFaculty = [...packageData.faculty];
    updatedFaculty[index] = e.target.value; // Update the specific faculty member
    setPackageData({ ...packageData, faculty: updatedFaculty });
  };

  const handleChange = (e, index, section) => {
    const { name, value } = e.target;
  

  

    if (section === "visaNo") {
      const updatedVisaNo = [...packageData.visaNo];
      updatedVisaNo[index] = value;
      setPackageData({ ...packageData, visaNo: updatedVisaNo });
    } else if (section === "packageCost" || section === "tax") {
      const updatedPricing = { ...packageData.pricing };
      const updatedSection = [...updatedPricing[section]];
      updatedSection[index] = { ...updatedSection[index], [name]: value };
      updatedPricing[section] = updatedSection;
      setPackageData({ ...packageData, pricing: updatedPricing });
    } else if (section) {
      const updatedSection = [...packageData[section]];
      updatedSection[index] = { ...updatedSection[index], [name]: value };
      setPackageData({ ...packageData, [section]: updatedSection });
    } else {
      setPackageData({ ...packageData, [name]: value });
    }
  };

  const handleEditPackage = async () => {
    // eslint-disable-next-line react/prop-types
    if (!selectedPackage?.id) return;
  
    const token = localStorage.getItem("adminToken");       
    const formDataToSend = new FormData();

    // Append fields individually
    formDataToSend.append('title', packageData.title);
    formDataToSend.append('description', packageData.description);
    formDataToSend.append('details', packageData.details);
    formDataToSend.append('howToApply', packageData.howToApply);
    formDataToSend.append('overview', packageData.overview);
    
  // Append images array
if (packageData.images && packageData.images.length > 0) {
  packageData.images.forEach((image) => {
      formDataToSend.append('images', image);
  });
}

   // Append thumbnail
if (packageData.thumbnail) {
  formDataToSend.append('thumbnail', packageData.thumbnail);
}

// Append faculty array
if (packageData.faculty && packageData.faculty.length > 0) {
  packageData.faculty.forEach((faculty) => {
      formDataToSend.append('faculty', faculty); // Assuming faculty is a simple string; otherwise adjust this line
  });
}

    packageData.faq.forEach((item, index) => {
      formDataToSend.append(`faq[${index}][question]`, item.question);
      formDataToSend.append(`faq[${index}][answer]`, item.answer);
    });
  
    packageData.options.forEach((option, index) => {
      formDataToSend.append(`options[${index}][title]`, option.title);
      formDataToSend.append(`options[${index}][badge]`, option.badge);
      formDataToSend.append(`options[${index}][discount]`, option.discount);
      formDataToSend.append(`options[${index}][refundStatus]`, option.refundStatus);
      formDataToSend.append(`options[${index}][price]`, option.price);
      formDataToSend.append(`options[${index}][currency]`, option.currency);
      formDataToSend.append(`options[${index}][discountPercentage]`, option.discountPercentage);
      formDataToSend.append(`options[${index}][footerText]`, option.footerText);
  
      option.processType.forEach((type, typeIndex) => {
        formDataToSend.append(`options[${index}][processType][${typeIndex}]`, type);
      });
      option.visaNo.forEach((visa, visaIndex) => {
        formDataToSend.append(`options[${index}][visaNo][${visaIndex}]`, visa);
      });
    });
  
    packageData.pricing.packageCost.forEach((item, index) => {
      formDataToSend.append(`pricing[packageCost][${index}][title]`, item.title);
      formDataToSend.append(`pricing[packageCost][${index}][amount]`, item.amount);
      formDataToSend.append(`pricing[packageCost][${index}][currency]`, item.currency);
    });
  
    packageData.pricing.tax.forEach((item, index) => {
      formDataToSend.append(`pricing[tax][${index}][title]`, item.title);
      formDataToSend.append(`pricing[tax][${index}][amount]`, item.amount);
      formDataToSend.append(`pricing[tax][${index}][currency]`, item.currency);
    });
  
    try {
      const response = await axios.put(
          // eslint-disable-next-line react/prop-types
        `http://localhost:3002/api/global-visa/${selectedPackage.id}`,formDataToSend,{
          headers: {
            "x-access-token": token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      if (response.data.success) {
          // eslint-disable-next-line react/prop-types
        const updatedPackages = packages.map((pkg) =>
            // eslint-disable-next-line react/prop-types
          pkg.id === selectedPackage.id ? response.data.results : pkg
        );
        setPackages(updatedPackages);
        onRequestClose();
      }
    } catch (error) {
      if (error.response) {
        console.log('Error response data:', error.response.data);
      } else if (error.request) {
        console.log('Error request:', error.request);
      } else {
        console.log('Error message:', error.message);
      }
    }
  };
  
  const handleAddField = (section) => {
    const newField =
      section === "packageCost" || section === "tax"
        ? { title: "", amount: "", currency: "" }
        : section === "faq"
        ? { question: "", answer: "" }
        : section === "options"
        ? {
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
          }
        : { faculty: "" };

    setPackageData({
      ...packageData,
      [section]: [...packageData[section], newField],
    });
  };

  const handleRemoveField = (index, section) => {
    const updatedSection = packageData[section].filter((_, i) => i !== index);
    setPackageData({ ...packageData, [section]: updatedSection });
  };

  const handleNext = () => setPage((prev) => Math.min(prev + 1, 3));
  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));

  if (!isOpen) return null;

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    console.log(files, "images");

    setPackageData({
      ...packageData,
      images: files, // Store the image files as an array of File objects
    });
  };

  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    console.log(file, "Thubnail");
    if (file) {
      setPackageData({
        ...packageData,
        thumbnail: file, // Store the thumbnail as a File object
      });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-1/1 h-[100%]"
        style={{ width: "40%" }}
      >
        <div className="flex items-center mb-4">
          <h2 className="text-2xl mr-2">Edit Visa Package</h2>
          <FaEdit className="text-xl text-gray-500" />
        </div>
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

            {/* Existing Thumbnail Display */}
            <div>
              <input
                type="file"
                accept="image/*"
                name="thumbnail"
                onChange={handleThumbnailUpload}
                className="w-full p-2 border"
              />
            </div>

            {/* Existing Images Display */}
            <div>
              <input
                type="file"
                accept="image/*"
                name="images"
                onChange={handleImageUpload}
                className="w-full p-2 border"
              />
            </div>

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
                    value={packageData.processType}
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
                    value={packageData.visaNo}
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
                  setPackageData({
                    ...packageData,
                    visaNo: [...packageData.visaNo, 0],
                  });
                }}
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
              >
                Add Visa Number
              </button>
            </div>

            {/* Pricing Details */}
            <div className="mt-6">
              <h3 className="text-xl mb-2">Pricing Details</h3>
              {packageData.pricing.packageCost.map((priceDetail, index) => (
                <div key={index} className="flex space-x-4 mb-2">
                  <input
                    name="title"
                    value={priceDetail.title}
                    onChange={(e) => handleChange(e, index, "packageCost")}
                    placeholder="Title"
                    className="w-1/3 p-2 border"
                  />
                  <input
                    name="amount"
                    value={priceDetail.amount}
                    onChange={(e) => handleChange(e, index, "packageCost")}
                    placeholder="Amount"
                    className="w-1/3 p-2 border"
                  />
                  <input
                    name="currency"
                    value={priceDetail.currency}
                    onChange={(e) => handleChange(e, index, "packageCost")}
                    placeholder="Currency"
                    className="w-1/3 p-2 border"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveField(index, "packageCost")}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddField("packageCost")}
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
              >
                Add Pricing
              </button>
            </div>
          </form>
        )}

        {page === 2 && (
          <div>
            {/* Options Section */}
            <div className="mt-8">
              <h3 className="text-2xl font-semibold mb-4">Options</h3>
              {packageData.options.map((option, index) => (
                <div key={index} className="flex flex-col gap-4 mb-4">
                  <input
                    name="title"
                    value={option.title || ""}
                    onChange={(e) => handleChange(e, index, "options")}
                    placeholder="Option Title"
                    className="w-full p-2 border"
                  />
                  <input
                    name="badge"
                    value={option.badge || ""}
                    onChange={(e) => handleChange(e, index, "options")}
                    placeholder="Badge"
                    className="w-full p-2 border"
                  />
                  <input
                    name="discount"
                    value={option.discount || ""}
                    onChange={(e) => handleChange(e, index, "options")}
                    placeholder="Discount"
                    className="w-full p-2 border"
                  />
                  <input
                    name="refundStatus"
                    value={option.refundStatus || ""}
                    onChange={(e) => handleChange(e, index, "options")}
                    placeholder="Refund Status"
                    className="w-full p-2 border"
                  />
                  <input
                    name="price"
                    value={option.price || ""}
                    onChange={(e) => handleChange(e, index, "options")}
                    placeholder="Price"
                    className="w-full p-2 border"
                  />
                  <input
                    name="currency"
                    value={option.currency || ""}
                    onChange={(e) => handleChange(e, index, "options")}
                    placeholder="Currency"
                    className="w-full p-2 border"
                  />
                  <input
                    name="discountPercentage"
                    value={option.discountPercentage || ""}
                    onChange={(e) => handleChange(e, index, "options")}
                    placeholder="Discount Percentage"
                    className="w-full p-2 border"
                  />
                  <input
                    name="discountPrice"
                    value={option.discountPrice || ""}
                    onChange={(e) => handleChange(e, index, "options")}
                    placeholder="Discount Price"
                    className="w-full p-2 border"
                  />
                  <input
                    name="footerText"
                    value={option.footerText || ""}
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
            <div className="mt-10">
              <h3 className="text-2xl font-semibold mb-4">FAQs</h3>
              {packageData.faq.map((faqItem, index) => (
                <div key={index} className="flex items-center gap-4 mb-4">
                  <input
                    name="question"
                    value={faqItem.question || ""}
                    onChange={(e) => handleChange(e, index, "faq")}
                    placeholder="Question"
                    className="w-1/2 p-2 border"
                  />
                  <input
                    name="answer"
                    value={faqItem.answer || ""}
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
            {/* Tax Details Section */}
            <h3 className="text-xl mb-2">Tax Details</h3>
            {packageData.pricing.tax.map((taxDetail, index) => (
              <div key={index} className="flex space-x-4 mb-2">
                <input
                  name="title"
                  value={taxDetail.title}
                  onChange={(e) => handleChange(e, index, "tax")}
                  placeholder="Title"
                  className="w-1/3 p-2 border"
                />
                <input
                  name="amount"
                  value={taxDetail.amount}
                  onChange={(e) => handleChange(e, index, "tax")}
                  placeholder="Amount"
                  className="w-1/3 p-2 border"
                />
                <input
                  name="currency"
                  value={taxDetail.currency}
                  onChange={(e) => handleChange(e, index, "tax")}
                  placeholder="Currency"
                  className="w-1/3 p-2 border"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveField(index, "tax")}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddField("tax")}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
            >
              Add Tax Detail
            </button>

         
<div className="mt-6">
  <h3 className="text-xl mb-2">Faculty</h3>
  {packageData.faculty.map((name, index) => (
    <div key={index} className="flex space-x-4 mb-2">
      <input
        type="text"
        name="faculty"
        value={name} // Display each faculty name
        onChange={(e) => handleChangeR(e, index, "faculty")}
        placeholder="Faculty"
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
</div>


            {/* How to Apply */}
            <div className="mt-6">
              <h3 className="text-xl mb-2">How to Apply</h3>
              <textarea
                name="howToApply"
                value={packageData.howToApply}
                onChange={(e) => handleChange(e)}
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
                onChange={(e) => handleChange(e)}
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
              onClick={handleEditPackage}
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
