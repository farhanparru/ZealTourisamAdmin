import { useState, useEffect } from "react";
import Modal from "react-modal";
import { MdCreditCard } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Custom styles for the modal
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    right: "auto",
    bottom: "auto",
    width: "120%",
    maxWidth: "700px",
    height: "90%",
    padding: "20px",
    borderRadius: "9px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
};

// eslint-disable-next-line react/prop-types
const VisaOption = ({ isOpen, onClose, onSubmit, globalVisaData }) => {
  const [formData, setFormData] = useState({
    title: "",
    badge: "",
    discount: "",
    refundStatus: "",
    discountPercentage: "",
    price: "",
    currency: "",
    visaNo: [""],
    processType: [""],
    priceWithCurrency: [
      { currency: "", price: "", discountPrice: "", discountPercentage: "" },
    ],
    visaPackage: [
      { destinationOrTour: "", living: "", date: "", nationality: "" },
    ],
    footerText: "",
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

  const handleFieldChange = (e, index, fieldName) => {
    const updatedFields = [...formData[fieldName]];
    updatedFields[index] = e.target.value;
    setFormData({ ...formData, [fieldName]: updatedFields });
  };



  const addField = (fieldName) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: [...prevData[fieldName], ""],
    }));
  };

  const removeField = (fieldName, index) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: prevData[fieldName].filter((_, i) => i !== index),
    }));
  };

  const handleCurrencyChange = (index, e) => {
    const { name, value } = e.target;
    const updatedPriceWithCurrency = [...formData.priceWithCurrency];
    updatedPriceWithCurrency[index][name] = value;
    setFormData({ ...formData, priceWithCurrency: updatedPriceWithCurrency });
  };

  const handleSerachVisaChange = (index, e) => {
    const { name, value } = e.target;
    const updatedvisaPackageCurrency = [...formData.visaPackage];
    updatedvisaPackageCurrency[index][name] = value;
    setFormData({ ...formData, visaPackage: updatedvisaPackageCurrency });
  };

  const handleDateChange = (date, index) => {
    const updatedvisaPackage = [...formData.visaPackage];
    updatedvisaPackage[index].date = date;
    setFormData({ ...formData, visaPackage :updatedvisaPackage });
  };


  const handleAddCurrency = () => {
    setFormData((prevData) => ({
      ...prevData,
      priceWithCurrency: [
        ...prevData.priceWithCurrency,
        { currency: "", price: "", discountPrice: "", discountPercentage: "" },
      ],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    console.log(formData, "editt");

    setFormData({
      title: "",
      badge: "",
      discount: "",
      refundStatus: "",
      discountPercentage: "",
      price: "",
      currency: "",
      visaNo: [""],
      processType: [""],
      priceWithCurrency: [
        { currency: "", price: "", discountPrice: "", discountPercentage: "" },
      ],
      visaPackage: [
        { destinationOrTour: "", living: "", date: "", nationality: "" },
      ],
      footerText: "",
    });
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      <div className="flex items-center mb-4">
        <MdCreditCard className="text-2xl text-gray-700 mr-2" />
        <h2 className="text-xl font-semibold">Add Visa Option</h2>
      </div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 overflow-y-auto h-[75vh]"
      >
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
            Refund Status:
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

        {/* Visa No Fields */}
        <div>
          <label className="block text-gray-700 font-medium">Visa No:</label>
          {formData.visaNo.map((visa, index) => (
            <div key={index} className="flex items-center space-x-2 mt-1">
              <input
                type="text"
                value={visa}
                onChange={(e) => handleFieldChange(e, index, "visaNo")}
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
        <div>
          <label className="block text-gray-700 font-medium">
            Process Type:
          </label>
          {formData.processType.map((process, index) => (
            <div key={index} className="flex items-center space-x-2 mt-1">
              <select
                value={process}
                onChange={(e) => handleFieldChange(e, index, "processType")}
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

        <div className="space-y-4">
          <label className="block text-sm font-medium mb-1">
            Price with Currency:
          </label>
          {formData.priceWithCurrency?.map((item, index) => (
            <div key={index} className="flex space-x-4">
              <input
                type="text"
                name="currency"
                placeholder="Currency"
                value={item.currency}
                onChange={(e) => handleCurrencyChange(index, e)}
                className="w-1/3 p-2 border border-gray-300 rounded"
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={item.price}
                onChange={(e) => handleCurrencyChange(index, e)}
                className="w-1/3 p-2 border border-gray-300 rounded"
              />
              <input
                type="number"
                name="discountPrice"
                placeholder="Discount Price"
                value={item.discountPrice}
                onChange={(e) => handleCurrencyChange(index, e)}
                className="w-1/3 p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="discountPercentage"
                placeholder="discountPercentage"
                value={item.discountPercentage}
                onChange={(e) => handleCurrencyChange(index, e)}
                className="w-1/3 p-2 border border-gray-300 rounded"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddCurrency}
            className="text-blue-500 mt-2"
          >
            + Add Price with Currency
          </button>
        </div>

        {/* Search Implimentioan*/}
        <div className="space-y-4">
          <label className="block text-sm font-medium mb-1">
            VisaSearchPKG:
          </label>
          {formData.visaPackage?.map((item, index) => (
            <div key={index} className="flex space-x-4">
              <input
                type="text"
                name="living"
                placeholder="living"
                value={item.living}
                onChange={(e) => handleSerachVisaChange(index, e)}
                className="w-1/3 p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="destinationOrTour"
                placeholder="destinationOrTour"
                value={item.destinationOrTour}
                onChange={(e) => handleSerachVisaChange(index, e)}
                className="w-1/3 p-2 border border-gray-300 rounded"
              />

              <div>
                <DatePicker
                  selected={item.date}
                  onChange={(date) => handleDateChange(date, index)}
                
                  placeholderText="Select a date"
                  className="p-2 border border-gray-300 rounded"
                  style={{ width: "12rem" }}
                />
              
              </div>

              <input
                type="text"
                name="nationality"
                placeholder="nationality"
                value={item.nationality}
                onChange={(e) => handleSerachVisaChange(index, e)}
                className="w-1/3 p-2 border border-gray-300 rounded"
              />
            </div>
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Footer Text:
            <input
              type="text"
              name="footerText"
              value={formData.footerText}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3"
            />
          </label>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="mr-3 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default VisaOption;
