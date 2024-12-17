import  { useState } from 'react';
import Modal from 'react-modal';
import './AddHolidays.css';
import ItineraryForm from '../../components/ItineraryForm';
import MoreDetailsModal from '../../components/MoreDetailsModal'; // Import the new modal component
import baseUrl from '../../../contants/baseUrl';
import FaqModal from '../../components/FaqModal';
import BookingPolicyModal from '../../components/BookingPolicyModal';
import PricingModal from '../../components/PricingModal';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import RatingModal from '../../components/RatingModal';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt } from "react-icons/fa";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '80%',
    maxHeight: '80%',
    overflow: 'auto',
  },
};

const Holidays = () => {
  const navigate = useNavigate();
  const [holidayData, setHolidayData] = useState({
    title: '',
    description: '',
    slug: '',
    thumbnail: {},
    images: [],
    pdf: [],
    faculty: [],
    details: {},
    highlights: [],
    overview: '',
    tourOverview: '',
    itinerary: [],
    timings: [],
    pricing: {
      title: '',
      description: '',
      packageCost: [],
      tax: [],
      totalAmount: '',
    },
    bookingPolicy: {
      cancellation: {},
      childPolicy: {},
      otherPolicies: [],
    },
    faq: [],
    rating: {},
    additionalInfo: '',
  });

  const [modalIsOpen, setIsOpen] = useState(false);
  const [tourModalIsOpen, setTourModalOpen] = useState(false); // State for tour details modal
  const [images, setImages] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [itineraryImages, setItineraryImages] = useState({});
  const [isPricingModalOpen, setPricingModalOpen] = useState(false);
  const [isBookingPolicyModalOpen, setBookingPolicyModalOpen] = useState(false);
  const [isFaqModalOpen, setFaqModalOpen] = useState(false);
  const [isRatingModalOpen, setRatingModalOpen] = useState(false);
  const [selectedItineraryIndex, setSelectedItineraryIndex] = useState(null);
  const [itineraryData, setItineraryData] = useState({
    title: '',
    description: '',
    place: '',
    dayDetails: '',
    details: [{ title: '', image: '', category: '', location: '', room: '', checkIn: '', checkout: '' }]
  });

  const handlePricingSubmit = (pricingData) => {
    setHolidayData({ ...holidayData, pricing: pricingData });
  };

  const handleBookingPolicySubmit = (policyData) => {
    setHolidayData({ ...holidayData, bookingPolicy: policyData });
  };

  const handleFaqSubmit = (faqData) => {
    setHolidayData({ ...holidayData, faq: faqData });
  };

  const handleRatingSubmit = (ratingData) => {
    setHolidayData({ ...holidayData, rating: ratingData });
  };

  // Handles changes for all inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setHolidayData({ ...holidayData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('title', holidayData.title);
    formDataToSend.append('description', holidayData.description);
    formDataToSend.append('slug', holidayData.slug);
    formDataToSend.append('overview', holidayData.overview);

    // Append holiday images
    if (images) {
      Array.from(images).forEach((image) => {
        formDataToSend.append('images', image);
      });
    }

    // Append PDF files
    if (pdf) {
      Array.from(pdf).forEach((pdfFile) => {
        formDataToSend.append('pdf', pdfFile);
      });
    }

    // Append thumbnail
    if (holidayData.thumbnail) {
      formDataToSend.append('thumbnail', holidayData.thumbnail);
    }

    // Append itinerary data (as JSON)
    formDataToSend.append('itinerary', JSON.stringify(holidayData.itinerary));

    // Append itinerary images
    Object.keys(itineraryImages).forEach((key) => {
      formDataToSend.append('itineraryImages', itineraryImages[key]);
    });

    // Append other data as JSON
    formDataToSend.append('faculty', JSON.stringify(holidayData.faculty));
    formDataToSend.append('highlights', JSON.stringify(holidayData.highlights));
    formDataToSend.append('timings', JSON.stringify(holidayData.timings));
    formDataToSend.append('inclusions', JSON.stringify(holidayData.inclusions));
    formDataToSend.append('exclusions', JSON.stringify(holidayData.exclusions));
    formDataToSend.append('tourOverview', JSON.stringify(holidayData.tourOverview));
    formDataToSend.append('additionalInfo', holidayData.additionalInfo);
    formDataToSend.append('pricing', JSON.stringify(holidayData.pricing));
    formDataToSend.append('bookingPolicy', JSON.stringify(holidayData.bookingPolicy));
    formDataToSend.append('faq', JSON.stringify(holidayData.faq));
    formDataToSend.append('rating', JSON.stringify(holidayData.rating));
    formDataToSend.append('details', JSON.stringify(holidayData.details));

    try {
      const response = await axios.post(baseUrl + '/holidays', formDataToSend, {
        headers: {
          "x-access-token": localStorage.getItem("adminToken"),
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        toast.success('Holiday saved successfully');
        navigate('/holidays');
      } else {
        throw new Error('Failed to save holiday');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to save holiday');
    }
  };

  // Open/close modals
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const openDetailModal = () => setTourModalOpen(true);
  const closeTourModal = () => setTourModalOpen(false);

  // Add itinerary data to holidayData when the itinerary form is submitted
  const addItinerary = (itineraryData) => {
    if (selectedItineraryIndex !== null) {
      const updatedItinerary = holidayData.itinerary.map((item, index) => {
        if (index === selectedItineraryIndex) {
          return itineraryData;
        }
        return item;
      });
      setHolidayData({ ...holidayData, itinerary: updatedItinerary });
      setSelectedItineraryIndex(null);
    } else {
      setHolidayData({
        ...holidayData,
        itinerary: [...holidayData.itinerary, itineraryData],
      });
    }
    closeModal();
  };

  const openUpdateModal = (index) => {
    // Set the selected itinerary item to be updated
    setSelectedItineraryIndex(index);
    setItineraryData(holidayData.itinerary[index]);
    openModal();
  };

  const removeItinerary = (index) => {
    const updatedItinerary = holidayData.itinerary.filter((_, i) => i !== index);
    setHolidayData({ ...holidayData, itinerary: updatedItinerary });
  };

  // Add tour details to holidayData when the tour modal is submitted
  const addTourDetails = (tourData) => {
    setHolidayData({
      ...holidayData,
      faculty: tourData.faculty,
      highlights: tourData.highlights,
      overview: tourData.overview,
      tourOverview: tourData.tourOverview,
      inclusion: tourData.inclusion,
      exclusion: tourData.exclusion,
      timings: tourData.timings,
      details: tourData.details
    });
    closeTourModal();
  };

  return (
    <div className="holidays-container">
      <h1 className="holidays-title">
      <FaCalendarAlt style={{ marginRight: "8px" }} /> Add Holidays
    </h1>
      <div className="holiday-form">
        <input type="text" name="title" placeholder="Title" onChange={handleChange} required className="holiday-input" />
        <textarea name="description" placeholder="Description" onChange={handleChange} className="holiday-input"></textarea>

        <input type="text" name="slug" placeholder="Slug" onChange={handleChange} required className="holiday-input" />

        <label className="block text-gray-700 text-sm font-bold" htmlFor="thumbnail">
          Thumbnail
        </label>
        <input
          type="file"
          name="thumbnail"
          onChange={(e) => setHolidayData((prev) => ({ ...prev, thumbnail: e.target.files[0] }))}
          className="holiday-input"
        />

        <textarea name="overview" placeholder="Overview" onChange={handleChange} className="holiday-input"></textarea>
        <label className="block text-gray-700 text-sm font-bold" htmlFor="images">
          Images
        </label>
        <input type="file" name="images" onChange={(e) => setImages(e.target.files)} multiple className="holiday-input" />

      
        <input type="file" name="pdf" onChange={(e) => setPdf(e.target.files)} multiple className="holiday-input" />
        <textarea name="additionalInfo" placeholder="Additional Info" onChange={(e) => setHolidayData((prev) => ({ ...prev, additionalInfo: e.target.value }))} className="holiday-input"></textarea>

        <div className="itinerary-section">
          <h2 className="itinerary-title">Itineraries</h2>
          {holidayData.itinerary.map((item, index) => (
            <div key={index} className="itinerary-item">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <button
                type="button"
                onClick={() => openUpdateModal(index)}
                className="text-blue-500 hover:text-blue-700"
              >
                <FaEdit className="inline-block mr-2" />
                Update
              </button>
              <button
                type="button"
                onClick={() => removeItinerary(index)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash className="inline-block mr-2" />
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={openModal} className="btn add-itinerary-btn">Add Itinerary</button>
        </div>

        <button className="btn-add" onClick={() => setPricingModalOpen(true)}>Add Pricing</button>
        <button className="btn-add" onClick={() => setBookingPolicyModalOpen(true)}>Add Booking Policy</button>
        <button className="btn-add" onClick={() => setFaqModalOpen(true)}>Add FAQs</button>
        <button type="button" className="btn-add" onClick={openDetailModal}>Add More Details</button>
        <button type="button" className="btn-add" onClick={() => setRatingModalOpen(true)}>Add Ratings</button>

        <MoreDetailsModal isOpen={tourModalIsOpen} onClose={closeTourModal} onSubmit={addTourDetails} holidayData={holidayData} />
        <PricingModal isOpen={isPricingModalOpen} onClose={() => setPricingModalOpen(false)} onSubmit={handlePricingSubmit} holidayData={holidayData} />
        <BookingPolicyModal isOpen={isBookingPolicyModalOpen} onClose={() => setBookingPolicyModalOpen(false)} onSubmit={handleBookingPolicySubmit} holidayData={holidayData} />
        <FaqModal isOpen={isFaqModalOpen} onClose={() => setFaqModalOpen(false)} onSubmit={handleFaqSubmit} holidayData={holidayData} />
        <RatingModal isOpen={isRatingModalOpen} onClose={() => setRatingModalOpen(false)} onSubmit={handleRatingSubmit} holidayData={holidayData} />
        <button type="submit" onClick={handleSubmit} className="btn submit-btn">Submit</button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Itinerary"
      >
        <ItineraryForm onSubmit={addItinerary} onCancel={closeModal} setItineraryImages={setItineraryImages} itineraryData={itineraryData} />
      </Modal>
    </div>
  );
};

export default Holidays;