// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { FaGlobe } from "react-icons/fa";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VisaOption from "../components/VisaOption";
import Pricing from "../components/Pricing";
import MoreDetails from "../components/MoreDetails";
import { useNavigate} from 'react-router-dom';

const AddGlobalVisasPackageModal = () => {

  const navigate = useNavigate();

  const handleClick = ()=>{
     navigate('/SEOsettings')
  }



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
        processType: [],
        visaNo: [],
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
        visaPackage: [
          { destinationOrTour: "", living: "", date: "", nationality: "" },
        ],
        footerText: "",
      },
    ],
    pricing: {
      packageCost: [{ title: "", amount: "", currency: "" }],
      tax: [{ title: "", amount: "", currency: "" }],
    },
  });

  console.log("Form data before sending:", globalVisaData);

  
// Modal Submit HandleFunction

  // AddMoreDetails submission function
  const addMoreDetailsSubmit = (details) => {
    setGlobalVisaData((prevData) => ({
      ...prevData,
      faculty: Array.isArray(details.faculty) ? details.faculty : [],
      howToApply: details.howToApply || '',
      overview: details.overview || '',
      faq: details.faq || '',
    }));
    closeMoreDetailsModal();
  };
  


  const addPricingSubmit = (pricingData) => {
    const { packageCost, tax } = pricingData.pricing;
  
  
    setGlobalVisaData((prevState) => ({
      ...prevState,
      pricing: {
        packageCost: prevState.pricing.packageCost[0].title === "" 
          ? [...packageCost] // Replace if first item is empty
          : [...prevState.pricing.packageCost, ...packageCost], // Add new items if the first is filled
        tax: prevState.pricing.tax[0].title === "" 
          ? [...tax] // Replace if first item is empty
          : [...prevState.pricing.tax, ...tax], // Add new items if the first is filled
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
      visaPackage,
      processType, // Include processType
      visaNo,      // Include visaNo
    } = visaOptionData;
  
    setGlobalVisaData((prevState) => ({
      ...prevState,
      options: [
        {
          title: title || "", // Initialize to an empty string if undefined
          badge: badge || "",
          discount: discount || "",
          refundStatus: refundStatus || "",
          price: price || "",
          currency: currency || "",
          discountPercentage: discountPercentage || "",
          footerText: footerText || "",
          priceWithCurrency: [
            {
              currency: (priceWithCurrency && priceWithCurrency[0] && priceWithCurrency[0].currency) || "",
              price: (priceWithCurrency && priceWithCurrency[0] && priceWithCurrency[0].price) || "",
              discountPrice: (priceWithCurrency && priceWithCurrency[0] && priceWithCurrency[0].discountPrice) || "",
              discountPercentage: (priceWithCurrency && priceWithCurrency[0] && priceWithCurrency[0].discountPercentage) || "",
            },
          ],
          visaPackage: [
            {
              destinationOrTour: ( visaPackage &&visaPackage [0] && visaPackage [0].destinationOrTour) || "",
              living: (visaPackage && visaPackage[0] && visaPackage[0].living) || "",
              date: (visaPackage && visaPackage[0] && visaPackage[0].date) || "",
              nationality: (visaPackage && visaPackage[0] && visaPackage[0].nationality) || "",
            },
          ],
         processType: Array.isArray(processType) ? [...processType] : [],
         visaNo: Array.isArray(visaNo) ? [...visaNo] : [],
             // Initialize with visaNo
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
      formDataToSend.append("title", globalVisaData.title || "");
      formDataToSend.append("slug", globalVisaData.slug || "");
      formDataToSend.append("description", globalVisaData.description || "");
      formDataToSend.append("overview", globalVisaData.overview || "");
      formDataToSend.append("howToApply", globalVisaData.howToApply || "");
      formDataToSend.append("details", globalVisaData.details || "");
  
      // Handle images
      if (globalVisaData.images?.length) {
        globalVisaData.images.forEach((image) => formDataToSend.append("images", image));
      }
  
      // Append thumbnail
      if (globalVisaData.thumbnail) {
        formDataToSend.append("thumbnail", globalVisaData.thumbnail);
      }
  
      // Handle FAQ data
      const faqData = Array.isArray(globalVisaData.faq) ? globalVisaData.faq : [globalVisaData.faq];
      faqData.forEach((item, index) => {
        formDataToSend.append(`faq[${index}][question]`, item.question || "");
        formDataToSend.append(`faq[${index}][answer]`, item.answer || "");
      });
  
      // Handle options
      globalVisaData.options.forEach((item, index) => {
        formDataToSend.append(`options[${index}][title]`, item.title || "");
        formDataToSend.append(`options[${index}][badge]`, item.badge || "");
        formDataToSend.append(`options[${index}][refundStatus]`, item.refundStatus || "");
        formDataToSend.append(`options[${index}][discount]`, item.discount || "");
        formDataToSend.append(`options[${index}][discountPercentage]`, item.discountPercentage || "");
        formDataToSend.append(`options[${index}][price]`, item.price || "");
        formDataToSend.append(`options[${index}][currency]`, item.currency || "");
        formDataToSend.append(`options[${index}][footerText]`, item.footerText || "");
  
        item.priceWithCurrency?.forEach((currencyItem, currencyIndex) => {
          formDataToSend.append(`options[${index}][priceWithCurrency][${currencyIndex}][currency]`, currencyItem.currency || "");
          formDataToSend.append(`options[${index}][priceWithCurrency][${currencyIndex}][price]`, currencyItem.price || "");
          formDataToSend.append(`options[${index}][priceWithCurrency][${currencyIndex}][discountPrice]`, currencyItem.discountPrice || "");
          formDataToSend.append(`options[${index}][priceWithCurrency][${currencyIndex}][discountPercentage]`, currencyItem.discountPercentage || "");
        });
        

        item.visaPackage?.forEach((visaPackageItem, visaPackageIndex) => {
          formDataToSend.append(`options[${index}][visaPackage][${visaPackageIndex}][destinationOrTour]`, visaPackageItem.destinationOrTour || "");
          formDataToSend.append(`options[${index}][visaPackage][${visaPackageIndex}][living]`, visaPackageItem.living || "");
          formDataToSend.append(`options[${index}][visaPackage][${visaPackageIndex}][date]`, visaPackageItem.date || "");
          formDataToSend.append(`options[${index}][visaPackage][${visaPackageIndex}][nationality]`, visaPackageItem.nationality || "");
        });
        

        item.processType?.forEach((processType, typeIndex) => {
          if (typeof processType === 'string' && processType) {
        formDataToSend.append(`options[${index}][processType][${typeIndex}]`, processType || "");
          }
      });
    
      // Append visaNo array within each option
      item.visaNo?.forEach((visa, visaIndex) => {
        formDataToSend.append(`options[${index}][visaNo][${visaIndex}]`, visa || "");
         });
      });
  
      // Handle `faculty`
      globalVisaData.faculty?.forEach((faculty, facultyIndex) => {
        if (typeof faculty === 'string' && faculty) {
          formDataToSend.append(`faculty[${facultyIndex}]`, faculty);
        }
      });
      
  
  
      // Handle pricing packageCost
      globalVisaData.pricing?.packageCost?.forEach((item, index) => {
        formDataToSend.append(`pricing[packageCost][${index}][title]`, item.title || "");
        formDataToSend.append(`pricing[packageCost][${index}][amount]`, item.amount || "");
        formDataToSend.append(`pricing[packageCost][${index}][currency]`, item.currency || "");
      });
  
      // Handle pricing tax
      globalVisaData.pricing?.tax?.forEach((item, index) => {
        formDataToSend.append(`pricing[tax][${index}][title]`, item.title || "");
        formDataToSend.append(`pricing[tax][${index}][amount]`, item.amount || "");
        formDataToSend.append(`pricing[tax][${index}][currency]`, item.currency || "");
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
              processType: [],
              visaNo: [],
              currency: "",
              discountPercentage: "",
              priceWithCurrency: [{ currency: "", price: "", discountPrice: "", discountPercentage: "" }],
              visaPackage: [
                { destinationOrTour: "", living: "", date: "", nationality: "" },
              ],
              footerText: "",
            },
          ],
        
          pricing: {
            packageCost: [{ title: "", amount: "", currency: "" }],
            tax: [{ title: "", amount: "", currency: "" }],
          },
        });
         // Show success toast notification
      toast.success("Visa package submitted successfully!");
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
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200" style={{marginTop:'-19px'}}>
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
              onClick={handleClick}
            >
               SEO Settings
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
