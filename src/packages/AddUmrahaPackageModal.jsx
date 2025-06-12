// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import UmrahPricingModal from "../components/UmrahPricing";
import UmrahBookingPolicy from "../components/UmrahBookingPolicy";
import MoreDetails from "../components/MoreDetailsofUmrah";
import ItineraryForm from "../components/UmrahItinery";
import makka from '../assets/Images/calendar-date.png'
import UmrahPackageDetails from "../components/UmrahDetails";

const AddUmrahPackageModal = () => {
  const [packageData, setPackageData] = useState({
    title: '',
    description: '',
    slug: '',
    images: [''],
    thumbnail: '',
    faculty: [''],
    overview: '',
    packageDetails: { Days: '', Nights: '', Country: '', Cities: '' },
    itinerary: [
      {
        place: '',
        description: '',
        ItineraryDay: '',
        ItineraryDate: '',
        HotelDetails: {
          Hoteltitle: '',
          image: null,
          location: '',
          roomType: '',
          checkIn: '',
          checkout: '',
        },
        TransportDetails: {
          Transporttitle: '',
          image: null,
          from: '',
          to: '',
          time: { timeTitle: '', time: '' },
        },
      },
    ],
    tourOverview: '',
    inclusion: [''],
    exclusion: [''],
    AdditionalInformation: [''],
    pricing: {
      adultNo: '',
      childNo: '',
      infantNo: '',
      packageCost: [{ title: '', amount: Number, currency: '' }],
      tax: [{ title: '', amount: Number, currency: '' }],
      totalAmount: '',
    },
    bookingPolicy: {
      cancellation: '',
      childPolicy: '',
      faq: [{ question: '', answer: '' }],
      otherPolicies: [{ title: '', description: '' }],
    },
  });
  
  

  console.log("packageData", packageData);

  // eslint-disable-next-line no-unused-vars
  const [itineraryImages, setItineraryImages] = useState({});

  
  const [isPackageDetailsModalOpen, setIsPackageDetailsModalOpen] = useState(false);
  const [isMoreDetailsModalOpen, setIsMoreDetailsModalOpen] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [isBookingPolicyModalOpen, setIsBookingPolicyModalOpen] = useState(false);
  const [isItineryModalOpen, setIsItineryModalOpen] = useState(false);

  const openPackageDetailsModal = () => setIsPackageDetailsModalOpen(true);
  const closePackageDetailsModal = () => setIsPackageDetailsModalOpen(false);
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
      const formDataToSend = new FormData();
      const token = localStorage.getItem("adminToken");
  
      // Append simple fields
      formDataToSend.append("title", packageData.title);
      formDataToSend.append("slug", packageData.slug);
      formDataToSend.append("description", packageData.description);
  
      // Append images
        // Append images (without index notation if backend expects just 'images')
    packageData.images.forEach((image) => {
      formDataToSend.append("images", image); // Changed from images[${index}]
    });

      // Append thumbnail
      if (packageData.thumbnail) {
        formDataToSend.append("thumbnail", packageData.thumbnail);
      }
  
      // Serialize and append nested objects (e.g., packageDetails)
      formDataToSend.append("packageDetails", JSON.stringify(packageData.packageDetails));
  
      // Serialize itinerary
      formDataToSend.append("itinerary", JSON.stringify(packageData.itinerary));

      // Serialize pricing
      formDataToSend.append("pricing", JSON.stringify(packageData.pricing));
  
      // Serialize bookingPolicy
      formDataToSend.append("bookingPolicy", JSON.stringify(packageData.bookingPolicy));
  
      // Append inclusion, exclusion, and additional information
      packageData.inclusion.forEach((item, index) => {
        formDataToSend.append(`inclusion[${index}]`, item);
      });
  
      packageData.exclusion.forEach((item, index) => {
        formDataToSend.append(`exclusion[${index}]`, item);
      });
  
      packageData.AdditionalInformation.forEach((item, index) => {
        formDataToSend.append(`AdditionalInformation[${index}]`, item);
      });
  
      // Send data to the backend
      const response = await axios.post(
        "https://zeal-tourisam-api.vercel.app/api/umrahall/",
        formDataToSend,
        {
          headers: {
            "x-access-token": token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      // Handle response
      if (response.status === 200) {
        console.log("Package submitted successfully:", response.data);
        // Reset form
        setPackageData({
          title: '',
          description: '',
          slug: '',
          images: [''],
          thumbnail: '',
          faculty: [''],
          overview: '',
          packageDetails: { Days: '', Nights: '', Country: '', Cities: '' },
          itinerary: [
            {
              place: '',
              description: '',
              ItineraryDay: '',
              ItineraryDate: '',
              HotelDetails: {
                Hoteltitle: '',
                image: null,
                location: '',
                roomType: '',
                checkIn: '',
                checkout: '',
              },
              TransportDetails: {
                Transporttitle: '',
                image: null,
                from: '',
                to: '',
                time: { timeTitle: '', time: '' },
              },
            },
          ],
          tourOverview: '',
          inclusion: [''],
          exclusion: [''],
          AdditionalInformation: [''],
          pricing: {
            adultNo: '',
            childNo: '',
            infantNo: '',
            packageCost: [{ title: '', amount: Number, currency: '' }],
            tax: [{ title: '', amount: Number, currency: '' }],
            totalAmount: '',
          },
          bookingPolicy: {
            cancellation: '',
            childPolicy: '',
            faq: [{ question: '', answer: '' }],
            otherPolicies: [{ title: '', description: '' }],
          },
        });
      } else {
        console.error("Error:", response.status, response.data);
      }
    } catch (error) {
      console.log("Error submitting form:", error);
    }
  };
  
  


  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    console.log(files);
    
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
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded transition"
              onClick={openPackageDetailsModal}
            >
              Add Package Details
            </button>

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
        onSubmit={(data) => {
          setPackageData((prev) => ({
            ...prev,
            bookingPolicy: data,
          }));
        }}
      />

      <UmrahPricingModal
        isOpen={isPricingModalOpen}
        onClose={closePricingModal}
        umrahData={packageData}
        onSubmit={(data) => {
          setPackageData((prev) => ({
            ...prev,
            pricing: data,
          }));
        }}
      />

      <MoreDetails
        isOpen={isMoreDetailsModalOpen}
        onClose={closeMoreDetailsModal}
        umrahData={packageData}
        onSubmit={(data) => {
          setPackageData((prev) => ({
            ...prev,
            overview: data.overview,
            tourOverview: data.tourOverview,
            faculty: data.faculty,
            inclusion: data.inclusion,
            exclusion: data.exclusion,
            AdditionalInformation: data.AdditionalInformation,
          }));
        }}
      />

      <ItineraryForm
        isOpen={isItineryModalOpen}
        onSubmit={(data) => {
          setPackageData((prev) => ({
            ...prev,
            itinerary: data,
          }));
        }}
        onClose={closeItineryModal}
        itineraryData={packageData.itinerary}
        setItineraryImages={(images) => {
          console.log("Itinerary Images:", images);
        }}
      />

      <UmrahPackageDetails
        isOpen={isPackageDetailsModalOpen}
        onSubmit={(data) => {
          setPackageData((prev) => ({
            ...prev,
            packageDetails: data,
          }));
        }}
        umrahData={packageData}
        onClose={closePackageDetailsModal}
      />



    </div>
  );
};

export default AddUmrahPackageModal;