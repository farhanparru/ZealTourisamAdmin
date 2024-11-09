// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import UmrahPricingModal from "../components/UmrahPricing";
import UmrahBookingPolicy from "../components/UmrahBookingPolicy";
import MoreDetails from "../components/MoreDetailsofUmrah";
import ItineraryForm from "../components/UmrahItinery";
import makka from '../assets/Images/calendar-date.png'

const AddUmrahPackageModal = () => {
  const [packageData, setPackageData] = useState({
    title: '',
    description: '',
    slug: '',
    images: [''],
    thumbnail: '',
    pdf: [{ type: '', link: '' }],
    details: '',
    faculty: '',
    overview: '',
    itinerary: [{ title: '', description: '', place: '', startDate: '', endDate: '', details: [{ title: '', icon: '', category: '', location: '', room: '', checkIn: '', checkout: '' }] }],
    tourOverview: '',
    inclusion: '',
    exclusion: '',
    pricing: {
      packageCost: [{ title: '', amount: 980, currency: '' }],
      tax: [{ title: '', amount: 40, currency: '' }]
    },
    bookingPolicy: {
      cancellation: [{ title: '', description: '' }],
      childPolicy: [{ title: '', description: '' }],
      otherPolicies: [{ title: '', description: '' }]
    },
    faq: [{ question: '', answer: '' }],
  });

  // eslint-disable-next-line no-unused-vars
  const [itineraryImages, setItineraryImages] = useState({});


  const addMoreDetailsSubmit = (details) => {
    console.log(details);
    closeMoreDetailsModal();
  };

  const addItinerySubmit = (itinerary) => {
    console.log(itinerary);
    closeItineryModal();
  };

  const addPricingSubmit = (pricingData) => {
    console.log(pricingData);
    closePricingModal();
  };

  const addBookingPolicy = (policy) => {
    console.log(policy);
    closeBookingPolicyModal();
  }


  const [isMoreDetailsModalOpen, setIsMoreDetailsModalOpen] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [isBookingPolicyModalOpen, setIsBookingPolicyModalOpen] = useState(false);
  const [isItineryModalOpen, setIsItineryModalOpen] = useState(false);

  const openMoreDetailsModal = () => setIsMoreDetailsModalOpen(true);
  const closeMoreDetailsModal = () => setIsMoreDetailsModalOpen(false);
  const openPricingModal = () => setIsPricingModalOpen(true);
  const closePricingModal = () => setIsPricingModalOpen(false);
  const openBookingPolicyModal = () => setIsBookingPolicyModalOpen(true);
  const closeBookingPolicyModal = () => setIsBookingPolicyModalOpen(false);
  const openItineryModal = () => setIsItineryModalOpen(true);
  const closeItineryModal = () => setIsItineryModalOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
   

    try {
      // const token = localStorage.getItem("adminToken");
      const formDataToSend = new FormData();
      const token = localStorage.getItem("adminToken");
      console.log(token,"HH");
      // Append standard fields
      formDataToSend.append("title", packageData.title);
      formDataToSend.append("slug", packageData.slug);
      formDataToSend.append("description", packageData.description);
      // formDataToSend.append("overview", globalVisaData.overview);
      formDataToSend.append("details", packageData.details);

      // Handle images
      if (packageData.images && packageData.images.length > 0) {
        packageData.images.forEach((image) => {
          formDataToSend.append("images", image);
        });
      }

      // Append thumbnail
      if (packageData.thumbnail) {
        formDataToSend.append("thumbnail", packageData.thumbnail);
      }


      // Handle FAQ data
      // eslint-disable-next-line no-undef
      const faqData = Array.isArray(packageData.faq) ? packageData.faq : [packageData.faq];
      faqData.forEach((item, index) => {
        formDataToSend.append(`faq[${index}][question]`, item.question);
        formDataToSend.append(`faq[${index}][answer]`, item.answer);
      });

      // Handle options
      // globalVisaData.options.forEach((item, index) => {
      //   formDataToSend.append(`options[${index}][title]`, item.title);
      //   formDataToSend.append(`options[${index}][badge]`, item.badge);
      //   formDataToSend.append(`options[${index}][refundStatus]`, item.refundStatus);
      //   formDataToSend.append(`options[${index}][discount]`, item.discount);
      //   formDataToSend.append(`options[${index}][discountPercentage]`, item.discountPercentage);
      //   formDataToSend.append(`options[${index}][price]`, item.price);
      //   formDataToSend.append(`options[${index}][currency]`, item.currency);
      //   formDataToSend.append(`options[${index}][footerText]`, item.footerText);

      // Append `priceWithCurrency`
      // item.priceWithCurrency.forEach((currencyItem, currencyIndex) => {
      //   formDataToSend.append(`options[${index}][priceWithCurrency][${currencyIndex}][currency]`, currencyItem.currency);
      //   formDataToSend.append(`options[${index}][priceWithCurrency][${currencyIndex}][price]`, currencyItem.price);
      //   formDataToSend.append(`options[${index}][priceWithCurrency][${currencyIndex}][discountPrice]`, currencyItem.discountPrice);
      //   formDataToSend.append(`options[${index}][priceWithCurrency][${currencyIndex}][discountPercentage]`, currencyItem.discountPercentage);
      // });

      // Append `processType` if it exists
      // if (item.processType) {
      //   item.processType.forEach((type, typeIndex) => {
      //     formDataToSend.append(`options[${index}][processType][${typeIndex}]`, type);
      //   });
      // }

      // Append `visaNo` if it exists
      //   if (item.visaNo) {
      //     item.visaNo.forEach((visa, visaIndex) => {
      //       formDataToSend.append(`options[${index}][visaNo][${visaIndex}]`, visa);
      //     });
      //   }
      // });

      // Handle pricing packageCost
      // globalVisaData.pricing.packageCost.forEach((item, index) => {
      //   formDataToSend.append(`pricing[packageCost][${index}][title]`, item.title);
      //   formDataToSend.append(`pricing[packageCost][${index}][amount]`, item.amount);
      //   formDataToSend.append(`pricing[packageCost][${index}][currency]`, item.currency);
      // });

      // Handle pricing tax
      // globalVisaData.pricing.tax.forEach((item, index) => {
      //   formDataToSend.append(`pricing[tax][${index}][title]`, item.title);
      //   formDataToSend.append(`pricing[tax][${index}][amount]`, item.amount);
      //   formDataToSend.append(`pricing[tax][${index}][currency]`, item.currency);
      // });

      // Send POST request
      const response = await axios.post(
        "http://localhost:3002/api/umrahaall",
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
        setPackageData({
          title: '',
          description: '',
          slug: '',
          images: [''],
          thumbnail: '',
          pdf: [{ type: '', link: '' }],
          details: '',
          faculty: '',
          overview: '',
          itinerary: [{ title: '', description: '', place: '', startDate: '', endDate: '', details: [{ title: '', icon: '', category: '', location: '', room: '', checkIn: '', checkout: '' }] }],
          tourOverview: '',
          inclusion: '',
          exclusion: '',
          pricing: {
            packageCost: [{ title: '', amount: 980, currency: '' }],
            tax: [{ title: '', amount: 40, currency: '' }]
          },
          bookingPolicy: {
            cancellation: [{ title: '', description: '' }],
            childPolicy: [{ title: '', description: '' }],
            otherPolicies: [{ title: '', description: '' }]
          },
          faq: [{ question: '', answer: '' }],
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
    setPackageData({
      ...packageData,
      images: files, // Store the image files directly
    });
  };

  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    setPackageData({
      ...packageData,
      thumbnail: file, // Store the single thumbnail file
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
    <h1 className="text-xl font-semibold text-center text-gray-700 mb-6 flex items-center justify-center gap-2">
  <img src={makka} style={{ height: "30px", width: "30px" }} alt="Makka icon" />
  Umrah Package
</h1>

      <form>
        <div className="grid gap-4">
          <label className="block">
            <span className="text-gray-700 font-medium">Title*</span>
            <input
              type="text"
              value={packageData.title}
              onChange={(e) => setPackageData({ ...packageData, title: e.target.value })}
              required
              className="mt-1 block w-full p-2 border rounded border-gray-300"
            />
          </label>

          <label className="block">
            <span className="text-gray-700 font-medium">Description*</span>
            <textarea
              value={packageData.description}
              onChange={(e) => setPackageData({ ...packageData, description: e.target.value })}
              required
              className="mt-1 block w-full p-2 border rounded border-gray-300"
            />
          </label>

          <label className="block">
            <span className="text-gray-700 font-medium">Details*</span>
            <textarea
              value={packageData.details}
              onChange={(e) => setPackageData({ ...packageData, details: e.target.value })}
              required
              className="mt-1 block w-full p-2 border rounded border-gray-300"
            />
          </label>

          <label className="block">
            <span className="text-gray-700 font-medium">Slug*</span>
            <input
              type="text"
              value={packageData.slug}
              onChange={(e) => setPackageData({ ...packageData, slug: e.target.value })}
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
              className="w-full bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 rounded transition"
              onClick={openItineryModal}
            >
              Add Itinery
            </button>
            <button
              type="button"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded transition"
              onClick={openMoreDetailsModal}
            >
              Add More Details
            </button>

            <button
              type="button"
              className="w-full bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 rounded transition"
              onClick={openPricingModal}
            >
              Add Pricing
            </button>

            <button
              type="button"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded transition"
              onClick={openBookingPolicyModal}
            >
              Add Booking Policy
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

      <UmrahBookingPolicy
        isOpen={isBookingPolicyModalOpen}
        onClose={closeBookingPolicyModal}
        umrahData={packageData}
        onSubmit={addBookingPolicy}
      />

      <UmrahPricingModal
        isOpen={isPricingModalOpen}
        onClose={closePricingModal}
        umrahData={packageData}
        onSubmit={addPricingSubmit} />

      <MoreDetails
        isOpen={isMoreDetailsModalOpen}
        onClose={closeMoreDetailsModal}
        umrahData={packageData}
        onSubmit={addMoreDetailsSubmit}
      />


      <ItineraryForm
        isOpen={isItineryModalOpen}
        onSubmit={addItinerySubmit}
        onClose={closeItineryModal}
        itineraryData={packageData}
        setItineraryImages={setItineraryImages}
      />
    </div>
  );
};

export default AddUmrahPackageModal;