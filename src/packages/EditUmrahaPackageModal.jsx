// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import UmrahPricingModal from "../components/UmrahPricing";
import UmrahBookingPolicy from "../components/UmrahBookingPolicy";
import MoreDetails from "../components/MoreDetailsofUmrah";
import ItineraryForm from "../components/UmrahItinery";
import makka from '../assets/Images/calendar-date.png'
import UmrahPackageDetails from "../components/UmrahDetails";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';

const EditUmrahPackageModal = () => {

    let { id } = useParams();
    const navigate = useNavigate();

  const [packageData, setPackageData] = useState({
    title: 'Umrah Package 2025',
    description: 'A comprehensive package for your spiritual journey.',
    slug: 'umrah-package-2025',
    images: ['image1.jpg', 'image2.jpg'],
    thumbnail: 'thumbnail.jpg',
    faculty: ['Sheikh A', 'Sheikh B'],
    overview: 'This package includes all necessary arrangements for Umrah.',
    packageDetails: { Days: '7', Nights: '6', Country: 'Saudi Arabia', Cities: 'Makkah, Madinah' },
    itinerary: [
      {
        place: 'Makkah',
        description: 'Perform Umrah rituals at Masjid al-Haram.',
        ItineraryDay: '1',
        ItineraryDate: '2025-01-10',
        HotelDetails: {
          Hoteltitle: 'Hilton Makkah',
          image: 'hilton.jpg',
          location: 'Near Haram',
          roomType: 'Deluxe',
          checkIn: '2025-01-10',
          checkout: '2025-01-13',
        },
        TransportDetails: {
          Transporttitle: 'Private Bus',
          image: 'bus.jpg',
          from: 'Jeddah Airport',
          to: 'Makkah Hotel',
          time: { timeTitle: 'AM', time: '10:00' },
        },
      },
      {
        place: 'Madinah',
        description: 'Visit Masjid an-Nabawi.',
        ItineraryDay: '4',
        ItineraryDate: '2025-01-13',
        HotelDetails: {
          Hoteltitle: 'Pullman Zamzam Madinah',
          image: 'pullman.jpg',
          location: 'Near Masjid an-Nabawi',
          roomType: 'Executive',
          checkIn: '2025-01-13',
          checkout: '2025-01-16',
        },
        TransportDetails: {
          Transporttitle: 'Private Bus',
          image: 'bus2.jpg',
          from: 'Makkah Hotel',
          to: 'Madinah Hotel',
          time: { timeTitle: 'PM', time: '2:00' },
        },
      },
    ],
    tourOverview: 'Experience the spirituality of Umrah with guided tours.',
    inclusion: ['Accommodation', 'Transport', 'Zamzam water'],
    exclusion: ['Airfare', 'Visa fees'],
    AdditionalInformation: ['All payments are non-refundable.', 'Guided tours included.'],
    pricing: {
      adultNo: '2',
      childNo: '1',
      infantNo: '0',
      packageCost: [
        { title: 'Adult', amount: 2000, currency: 'USD' },
        { title: 'Child', amount: 1500, currency: 'USD' },
      ],
      tax: [
        { title: 'VAT', amount: 100, currency: 'USD' },
        { title: 'Service Tax', amount: 50, currency: 'USD' },
      ],
      totalAmount: '4650',
    },
    bookingPolicy: {
      cancellation: 'Cancellation is allowed up to 15 days before departure.',
      childPolicy: 'Children under 5 years are free of charge.',
      faq: [
        { question: 'What documents are required?', answer: 'Passport and visa.' },
        { question: 'Is airfare included?', answer: 'No, airfare is not included.' },
      ],
      otherPolicies: [
        { title: 'Refund Policy', description: 'No refund after payment.' },
        { title: 'Room Sharing', description: 'Rooms are on twin-sharing basis.' },
      ],
    },
  });
  



  useEffect(() => {
    const fetchHoliday = async () => {
      try {
        const response = await axios.get(`https://zeal-tourisam-api.vercel.app/api/umrahaall/${id}`);
        if (response.status === 200) {
          const data = response.data.results;
          setPackageData({
            title: data?.title || '',
            description: data?.description || '',
            slug: data?.slug || '',
            images: data?.images || [],
            thumbnail: data?.thumbnail || '',
            faculty: data?.faculty || [],
            overview: data?.overview || '',
            packageDetails: {
              Days: data?.packageDetails?.Days || '',
              Nights: data?.packageDetails?.Nights || '',
              Country: data?.packageDetails?.Country || '',
              Cities: data?.packageDetails?.Cities || '',
              TravelFrom: data?.packageDetails?.TravelFrom || '',
              TravelTo: data?.packageDetails?.TravelTo || '',
              TravelDate: data?.packageDetails?.TravelDate || '',
              TravelTime: {
                time: data?.packageDetails?.TravelTime?.time || '',
                timeTitle: data?.packageDetails?.TravelTime?.timeTitle || '',
              },
            },
            itinerary: data?.itinerary?.map((item) => ({
              place: item?.place || '',
              description: item?.description || '',
              ItineraryDay: item?.ItineraryDay || '',
              ItineraryDate: item?.ItineraryDate || '',
              HotelDetails: {
                Hoteltitle: item?.HotelDetails?.Hoteltitle || '',
                image: item?.HotelDetails?.image || null,
                location: item?.HotelDetails?.location || '',
                roomType: item?.HotelDetails?.roomType || '',
                checkIn: item?.HotelDetails?.checkIn || '',
                checkout: item?.HotelDetails?.checkout || '',
              },
              TransportDetails: {
                Transporttitle: item?.TransportDetails?.Transporttitle || '',
                image: item?.TransportDetails?.image || null,
                from: item?.TransportDetails?.from || '',
                to: item?.TransportDetails?.to || '',
                time: {
                  timeTitle: item?.TransportDetails?.time?.timeTitle || '',
                  time: item?.TransportDetails?.time?.time || '',
                },
              },
            })) || [],
            tourOverview: data?.tourOverview || '',
            inclusion: data?.inclusion || [],
            exclusion: data?.exclusion || [],
            AdditionalInformation: data?.AdditionalInformation || [],
            pricing: {
              adultNo: data?.pricing?.adultNo || '',
              childNo: data?.pricing?.childNo || '',
              infantNo: data?.pricing?.infantNo || '',
              packageCost: data?.pricing?.packageCost || [{ title: '', amount: 0, currency: '' }],
              tax: data?.pricing?.tax || [{ title: '', amount: 0, currency: '' }],
              totalAmount: data?.pricing?.totalAmount || '',
            },
            bookingPolicy: {
              cancellation: data?.bookingPolicy?.cancellation || '',
              childPolicy: data?.bookingPolicy?.childPolicy || '',
              faq: data?.bookingPolicy?.faq || [{ question: '', answer: '' }],
              otherPolicies: data?.bookingPolicy?.otherPolicies || [{ title: '', description: '' }],
            },
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
      packageData.images.forEach((image, index) => {
        formDataToSend.append(`images[${index}]`, image);
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
      const response = await axios.put(`https://zeal-tourisam-api.vercel.app/api/umrahaall/${id}`,
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
            navigate('/Umrahaall')
           toast.success("Umraha updated successfully");
        }
    } catch (error) {
        console.error("Error updating Umraha:", error);
        toast.error("Failed to update Umraha");
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

export default EditUmrahPackageModal;