// eslint-disable-next-line no-unused-vars
import React, { useState,useEffect  } from "react";
import {  useNavigate, useParams } from 'react-router-dom'; // Import useParams from react-router-dom
import { FaGlobe } from "react-icons/fa";
import axios from "axios";
import VisaOption from "../components/VisaOption";
import Pricing from "../components/Pricing";
import MoreDetails from "../components/MoreDetails";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// eslint-disable-next-line react/prop-types
const EditVisModal = () => {

  let { id } = useParams();
  const navigate = useNavigate()
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
        footerText: "",
      },
    ],
    pricing: {
      packageCost: [{ title: "", amount: "", currency: "" }],
      tax: [{ title: "", amount: "", currency: "" }],
    },
  });

  useEffect(() => {
    const fetchHoliday = async () => {
      try {
        const response = await axios.get(`https://zeal-tourisam-api.vercel.app/api/global-visa/${id}`);
        if (response.status === 200) {
          const data = response.data.results;
          setGlobalVisaData({
            title: data?.title || '',
            description: data?.description || '',
            slug: data?.slug || '',
            details: data?.details || '',
            images: data?.images || [],
            thumbnail: data?.thumbnail || null,
            faculty: data?.faculty || [],
            howToApply: data?.howToApply || '',
            overview: data?.overview || '',
            faq: data?.faq || [{ question: "", answer: "" }],
            options: data?.options || [],
            pricing: data?.pricing || { packageCost: [], tax: [] },
          });
        } else {
          throw new Error("Failed to fetch holiday");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to fetch holiday");
      }
    };
    fetchHoliday();
  }, [id]);

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
          ? [...packageCost]
          : [...prevState.pricing.packageCost, ...packageCost],
        tax: prevState.pricing.tax[0].title === "" 
          ? [...tax]
          : [...prevState.pricing.tax, ...tax],
      },
    }));
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
      priceWithCurrency,
      processType,
      visaNo,
    } = visaOptionData;

    setGlobalVisaData((prevState) => ({
      ...prevState,
      options: [
        {
          title: title || "",
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
          processType: Array.isArray(processType) ? [...processType] : [],
          visaNo: Array.isArray(visaNo) ? [...visaNo] : [],
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
        const formData = new FormData();

        // Append basic data fields
        formData.append("title", globalVisaData.title || "");
        formData.append("slug", globalVisaData.slug || "");
        formData.append("description", globalVisaData.description || "");
        formData.append("overview", globalVisaData.overview || "");
        formData.append("howToApply", globalVisaData.howToApply || "");
        formData.append("details", JSON.stringify(globalVisaData.details || {}));

        // Append images if they exist as files
        if (globalVisaData.images && globalVisaData.images.length > 0) {
            globalVisaData.images.forEach((image) => {
                formData.append("images", image);  // Each image file directly
            });
        }

        // Append thumbnail if it exists and is a file
        if (globalVisaData.thumbnail instanceof File) {
            formData.append("thumbnail", globalVisaData.thumbnail);
        }

        // Convert arrays and objects to JSON and append
        if (globalVisaData.faq) {
            formData.append("faq", JSON.stringify(globalVisaData.faq));
        }

        if (globalVisaData.options) {
            formData.append("options", JSON.stringify(globalVisaData.options));
        }

        if (globalVisaData.faculty) {
            formData.append("faculty", JSON.stringify(globalVisaData.faculty));
        }

        if (globalVisaData.pricing) {
            formData.append("pricing", JSON.stringify(globalVisaData.pricing));
        }

        // Send the form data to the backend
        const response = await axios.put(`https://zeal-tourisam-api.vercel.app/api/global-visa/${id}`, formData, {
            headers: {
                "x-access-token": token,
                // Content-Type is automatically set by axios for FormData
            },
        });

        if (response.status === 200) {
            navigate('/GlobalVisas')
           toast.success("Global visa updated successfully");
        }
    } catch (error) {
        console.error("Error updating global visa:", error);
        toast.error("Failed to update visa");
    }
};

const handleImageUpload = (e) => {
  const files = Array.from(e.target.files); // Convert FileList to Array
  setGlobalVisaData({
      ...globalVisaData,
      images: files, // Store the image files directly
  });
};

// Handle thumbnail upload similarly
const handleThumbnailUpload = (e) => {
  const file = e.target.files[0]; // Only single file expected
  setGlobalVisaData({
      ...globalVisaData,
      thumbnail: file, // Store the thumbnail file directly
  });
};

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h1 className="text-xl font-semibold text-center text-gray-700 mb-6 flex items-center justify-center gap-2">
        <FaGlobe className="text-blue-500" /> Edit Global Visas Package
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

export default EditVisModal;
