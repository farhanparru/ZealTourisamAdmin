// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { FaGlobe } from "react-icons/fa";
import axios from "axios";
import VisaOption from "../components/VisaOption";
import Pricing from "../components/Pricing";
import MoreDetails from "../components/MoreDetails";

const AddGlobalVisasPackageModal = () => {
  const [globalVisaData, setGlobalVisaData] = useState({
    title: "",
    description: "",
    slug: "",
    images: [],
    thumbnail: null,
    details: "",
    faculty: [],
    howToApply: "",
    overview: "",
    faq: [{ question: "", answer: "" }],
    options: [
      {
        title: "",
        badge: "",
        discount: "",
        refundStatus: "",
        price: "",
        currency: "",
        discountPercentage: "",
        priceWithCurrency: [
          {
            currency: "",
            price: "",
            discountPrice: "",
            discountPercentage: "",
          },
        ],
        footerText: "",
      },
    ],
    pricing: {
      packageCost: [{ title: "", amount: "", currency: "" }],
      tax: [{ title: "", amount: "", currency: "" }],
    },
  });
  
  // Modal Submit HandleFunction

  // AddMoreDetails submission function
  const addMoreDetailsSubmit = (details) => {
    setGlobalVisaData((prevData) => ({
      ...prevData,
      faculty: details.faculty,
      howToApply: details.howToApply,
      overview: details.overview,
      processType: details.processType,
      visaNo: details.visaNo,
      faq: details.faq,
    }));
    closeMoreDetailsModal();
  };


  const addPricingSubmit = (pricingData) => {
    // Destructure packageCost and tax from pricingData.pricing
    const { packageCost, tax } = pricingData.pricing;
    console.log( pricingData.pricing," pricingData.pricing");
    
  
    // Update globalVisaData state with new pricing details
    setGlobalVisaData((prevState) => ({
      ...prevState,
      pricing: {
        packageCost: [...prevState.pricing.packageCost, ...packageCost],
        tax: [...prevState.pricing.tax, ...tax],
      },
    }));
  
    // Close the Pricing Modal after submission
    closePricingModal();
  };
  
  

  const AddVisaOptionSubmit = (visaOptionData) => {
    const {
      title,
      badge,
      discount,
      refundStatus,
      price,
      currency,
      discountPercentage,
      footerText,
      priceWithCurrency, // Accept priceWithCurrency from the form data
    } = visaOptionData;
  
    setGlobalVisaData((prevState) => ({
      ...prevState,
      options: [
        ...(prevState.options || []),
        {
          title,
          badge,
          discount,
          refundStatus,
          price,
          currency,
          discountPercentage,
          footerText,
          priceWithCurrency: priceWithCurrency || [
            {
              currency: "",
              price: "",
              discountPrice: "",
              discountPercentage: "",
            },
          ],
        },
      ],
    }));
  
    closeVisaoptionModal();
  };
  
  const [isMoreDetailsModalOpen, setIsMoreDetailsModalOpen] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [isVisaOptionModalOpen, setIsVisasOptionModalOpen] = useState(false);

  const openMoreDetailsModal = () => setIsMoreDetailsModalOpen(true);
  const closeMoreDetailsModal = () => setIsMoreDetailsModalOpen(false);
  const openPricingModal = () => setIsPricingModalOpen(true);
  const closePricingModal = () => setIsPricingModalOpen(false);
  const openVisaoptionModal = () => setIsVisasOptionModalOpen(true);
  const closeVisaoptionModal = () => setIsVisasOptionModalOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const token = localStorage.getItem("adminToken");
      const formDataToSend = new FormData();
  
      // Append standard fields
      formDataToSend.append("title", globalVisaData.title);
      formDataToSend.append("slug", globalVisaData.slug);
      formDataToSend.append("description", globalVisaData.description);
      formDataToSend.append("overview", globalVisaData.overview);
      formDataToSend.append("howToApply", globalVisaData.howToApply);
      formDataToSend.append("details", globalVisaData.details);
  
      // Handle images
      if (globalVisaData.images && globalVisaData.images.length > 0) {
        globalVisaData.images.forEach((image) => {
          formDataToSend.append("images", image);
        });
      }
  
      // Handle faculty
      if (globalVisaData.faculty && globalVisaData.faculty.length > 0) {
        globalVisaData.faculty.forEach((facultyObj) => {
          formDataToSend.append("faculty", facultyObj.faculty);
        });
      }
  
      // Append thumbnail
      if (globalVisaData.thumbnail) {
        formDataToSend.append("thumbnail", globalVisaData.thumbnail);
      }
  
      // Handle FAQ data
      const faqData = Array.isArray(globalVisaData.faq) ? globalVisaData.faq : [globalVisaData.faq];
      faqData.forEach((item, index) => {
        formDataToSend.append(`faq[${index}][question]`, item.question);
        formDataToSend.append(`faq[${index}][answer]`, item.answer);
      });
  
      // Handle options
      globalVisaData.options.forEach((item, index) => {
        formDataToSend.append(`options[${index}][title]`, item.title);
        formDataToSend.append(`options[${index}][badge]`, item.badge);
        formDataToSend.append(`options[${index}][refundStatus]`, item.refundStatus);
        formDataToSend.append(`options[${index}][discount]`, item.discount);
        formDataToSend.append(`options[${index}][discountPercentage]`, item.discountPercentage);
        formDataToSend.append(`options[${index}][price]`, item.price);
        formDataToSend.append(`options[${index}][currency]`, item.currency);
        formDataToSend.append(`options[${index}][footerText]`, item.footerText);
  
        // Append `priceWithCurrency`
        item.priceWithCurrency.forEach((currencyItem, currencyIndex) => {
          formDataToSend.append(`options[${index}][priceWithCurrency][${currencyIndex}][currency]`, currencyItem.currency);
          formDataToSend.append(`options[${index}][priceWithCurrency][${currencyIndex}][price]`, currencyItem.price);
          formDataToSend.append(`options[${index}][priceWithCurrency][${currencyIndex}][discountPrice]`, currencyItem.discountPrice);
          formDataToSend.append(`options[${index}][priceWithCurrency][${currencyIndex}][discountPercentage]`, currencyItem.discountPercentage);
        });
  
        // Append `processType` if it exists
        if (item.processType) {
          item.processType.forEach((type, typeIndex) => {
            formDataToSend.append(`options[${index}][processType][${typeIndex}]`, type);
          });
        }
  
        // Append `visaNo` if it exists
        if (item.visaNo) {
          item.visaNo.forEach((visa, visaIndex) => {
            formDataToSend.append(`options[${index}][visaNo][${visaIndex}]`, visa);
          });
        }
      });
  
      // Handle pricing packageCost
      globalVisaData.pricing.packageCost.forEach((item, index) => {
        formDataToSend.append(`pricing[packageCost][${index}][title]`, item.title);
        formDataToSend.append(`pricing[packageCost][${index}][amount]`, item.amount);
        formDataToSend.append(`pricing[packageCost][${index}][currency]`, item.currency);
      });
  
      // Handle pricing tax
      globalVisaData.pricing.tax.forEach((item, index) => {
        formDataToSend.append(`pricing[tax][${index}][title]`, item.title);
        formDataToSend.append(`pricing[tax][${index}][amount]`, item.amount);
        formDataToSend.append(`pricing[tax][${index}][currency]`, item.currency);
      });
  
      // Send POST request
      const response = await axios.post(
        "http://localhost:3002/api/global-visa",
        formDataToSend,
        {
          headers: {
            "x-access-token": token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      // Reset form if success
      if (response.status === 200) {
        setGlobalVisaData({
          title: "",
          description: "",
          slug: "",
          images: [],
          thumbnail: null,
          details: "",
          faculty: [],
          howToApply: "",
          overview: "",
          faq: [{ question: "", answer: "" }],
          options: [
            {
              title: "",
              badge: "",
              discount: "",
              refundStatus: "",
              price: "",
              currency: "",
              discountPercentage: "",
              priceWithCurrency: [
                { currency: "", price: "", discountPrice: "", discountPercentage: "" }
              ],
              footerText: "",
              processType: [],
              visaNo: [],
            },
          ],
          pricing: {
            packageCost: [{ title: "", amount: "", currency: "" }],
            tax: [{ title: "", amount: "", currency: "" }],
          },
        });
      } else {
        console.error("Error:", response.status, response.data);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setGlobalVisaData({
      ...globalVisaData,
      images: files, // Store the image files directly
    });
  };

  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    setGlobalVisaData({
      ...globalVisaData,
      thumbnail: file, // Store the single thumbnail file
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h1 className="text-xl font-semibold text-center text-gray-700 mb-6 flex items-center justify-center gap-2">
        <FaGlobe className="text-blue-500" /> Add Global Visas Package
      </h1>

      <form>
        <div className="grid gap-4">
          <label className="block">
            <span className="text-gray-700 font-medium">Title*</span>
            <input
              type="text"
              value={globalVisaData.title}
              onChange={(e) => setGlobalVisaData({ ...globalVisaData, title: e.target.value })}
              required
              className="mt-1 block w-full p-2 border rounded border-gray-300"
            />
          </label>

          <label className="block">
            <span className="text-gray-700 font-medium">Description*</span>
            <textarea
              value={globalVisaData.description}
              onChange={(e) => setGlobalVisaData({ ...globalVisaData, description: e.target.value })}
              required
              className="mt-1 block w-full p-2 border rounded border-gray-300"
            />
          </label>

          <label className="block">
            <span className="text-gray-700 font-medium">Details*</span>
            <textarea
              value={globalVisaData.details}
              onChange={(e) => setGlobalVisaData({ ...globalVisaData, details: e.target.value })}
              required
              className="mt-1 block w-full p-2 border rounded border-gray-300"
            />
          </label>

          <label className="block">
            <span className="text-gray-700 font-medium">Slug*</span>
            <input
              type="text"
              value={globalVisaData.slug}
              onChange={(e) => setGlobalVisaData({ ...globalVisaData, slug: e.target.value })}
              required
              className="mt-1 block w-full p-2 border rounded border-gray-300"
            />
          </label>

          <label className="block">
            <span className="text-gray-700 font-medium">Images File*</span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
          </label>

          <label className="block">
            <span className="text-gray-700 font-medium">Thumbnail File*</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleThumbnailUpload}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
          </label>

          <div className="grid gap-3">
            <button
              type="button"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded transition"
              onClick={openMoreDetailsModal}
            >
              Add More Details
            </button>

            <button
              type="button"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded transition"
              onClick={openPricingModal}
            >
              Add Pricing
            </button>

            <button
              type="button"
              className="w-full bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 rounded transition"
              onClick={openVisaoptionModal}
            >
              Add Visa Options
            </button>
          </div>

          <div className="flex justify-between mt-4">
            <button
              type="reset"
              className="w-[48%] bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 rounded transition"
            >
              Reset
            </button>

            <button
              type="submit"
              className="w-[48%] bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded transition"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </form>

      {/* Render AddMoreDetails modal and pass open and close handlers */}
      <VisaOption
        isOpen={isVisaOptionModalOpen}
        onClose={closeVisaoptionModal}
        globalVisaData={globalVisaData}
        onSubmit={AddVisaOptionSubmit}
      />
      <Pricing
      isOpen={isPricingModalOpen}
      onClose={closePricingModal} 
      globalVisaData={globalVisaData} 
      onSubmit={addPricingSubmit}/>

      <MoreDetails
        isOpen={isMoreDetailsModalOpen}
        onClose={closeMoreDetailsModal}
        globalVisaData={globalVisaData}
        onSubmit={addMoreDetailsSubmit} // Pass the submit handler
      />
    </div>
  );
};

export default AddGlobalVisasPackageModal;
