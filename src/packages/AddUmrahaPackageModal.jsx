// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import UmrahPricingModal from "../components/UmrahPricing";
import UmrahBookingPolicy from "../components/UmrahBookingPolicy";
import MoreDetails from "../components/MoreDetailsofUmrah";
import ItineraryForm from "../components/UmrahItinery";
import makka from '../assets/Images/calendar-date.png'
import UmrahPackageDetails from "../components/UmrahDetails";
import '../pages/AddHolidays/AddHolidays.css'


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
    <div className="holidays-container">
      <h1 className="holidays-title">
        <img src={makka} style={{ height: "30px", width: "30px" }} alt="Makka icon" />
        Add Umrah Package
      </h1>

      <form className="holiday-form">
        <div className="holiday-formmain">
          <div className="holiday-from1">
            <div>
              <label>Title*</label>
              <input
                type="text"
                value={packageData.title}
                onChange={(e) => setPackageData({ ...packageData, title: e.target.value })}
                className="holiday-input"
                required
              />
            </div>

            <div>
              <label>Description*</label>
              <textarea
                value={packageData.description}
                onChange={(e) => setPackageData({ ...packageData, description: e.target.value })}
                className="holiday-input"
                rows={3}
                required
              />
            </div>

            <div>
              <label>Slug*</label>
              <input
                type="text"
                value={packageData.slug}
                onChange={(e) => setPackageData({ ...packageData, slug: e.target.value })}
                className="holiday-input"
                required
              />
            </div>
          </div>

          <div className="holiday-from2">
            <div>
              <label>Images File*</label>
              <div className="file-upload-container">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="file-upload-input"
                  id="images-upload"
                  required
                />
                <label htmlFor="images-upload" className="file-upload-label">
                  Choose Files
                </label>
                <span className="file-upload-text">
                  {packageData.images.length > 0 ? `${packageData.images.length} files selected` : "No files chosen"}
                </span>
              </div>
            </div>

            <div>
              <label>Thumbnail File*</label>
              <div className="file-upload-container">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailUpload}
                  className="file-upload-input"
                  id="thumbnail-upload"
                  required
                />
                <label htmlFor="thumbnail-upload" className="file-upload-label">
                  Choose File
                </label>
                <span className="file-upload-text">
                  {packageData.thumbnail ? "1 file selected" : "No file chosen"}
                </span>
              </div>
            </div>

            <div>
              <label>Overview</label>
              <textarea
                value={packageData.overview}
                onChange={(e) => setPackageData({ ...packageData, overview: e.target.value })}
                className="holiday-input"
                rows={3}
              />
            </div>
          </div>
        </div>

        <div className="holidaySecondFrom">
          <div className="holidaysecondfrom1">
            <button
              type="button"
              onClick={openPackageDetailsModal}
              className="btn-add"
            >
              Add Package Details
            </button>
            
            <button
              type="button"
              onClick={openItineryModal}
              className="btn-add"
            >
              Add Itinerary
            </button>
            
            <button
              type="button"
              onClick={openMoreDetailsModal}
              className="btn-add"
            >
              Add More Details
            </button>
            
            <button
              type="button"
              onClick={openPricingModal}
              className="btn-add"
            >
              Add Pricing
            </button>
            
            <button
              type="button"
              onClick={openBookingPolicyModal}
              className="btn-add"
            >
              Add Booking Policy
            </button>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="reset"
            className="btn cancel-btn"
          >
            Reset
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn submit-btn"
          >
            Submit
          </button>
        </div>
      </form>

      {/* Keep all your modal components here */}
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