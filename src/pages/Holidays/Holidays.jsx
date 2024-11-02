// src/Holidays.js
import  { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal'; // Modal for displaying holiday details
import './Holidays.css'; // Add any custom CSS styling here
import baseUrl from '../../../contants/baseUrl';
import cdnUrl from '../../../contants/cdnUrl';
import { FaRegFilePdf } from "react-icons/fa";
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '90%',
    maxHeight: '90%',
    minWidth: '80%',
    overflow: 'auto',
    padding: '20px',
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)'
  }
};
const Holidays = () => {
  const navigate = useNavigate();
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [setSelectedHoliday] = useState(null);
  const [state, setState] = useState(false);
  // Holiday data structure for the modal
  const [holidayData, setHolidayData] = useState(null);

  // Fetch holidays from API
  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await axios.get(baseUrl + '/holidays', {
          headers: {
            "x-access-token": localStorage.getItem("adminToken"),
          },
        }); // Replace with your API URL
        setHolidays(response.data.results);
      } catch (error) {
        console.error('Error fetching holidays:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHolidays();
  }, [state]);

  // Delete a holiday
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseUrl}/holidays/${id}`, {
        headers: {
          "x-access-token": localStorage.getItem("adminToken"),
        },
      }); // Replace with your API URL
      setState(!state);
    } catch (error) {
      console.error('Error deleting holiday:', error);
    }
  };

  // Open modal and set selected holiday data
  const handleViewDetails = (holiday) => {
    setSelectedHoliday(holiday);
    setHolidayData({
      title: holiday?.title,
      description: holiday?.description,
      slug: holiday?.slug,
      thumbnail: holiday?.thumbnail,
      images: holiday?.images,
      pdf: holiday?.pdf,
      faculty: holiday?.faculty,
      details: holiday?.details,
      highlights: holiday?.highlights,
      overview: holiday?.overview,
      itinerary: holiday?.itinerary,
      timings: holiday?.timings,
      inclusions: holiday?.inclusions,
      exclusions: holiday?.exclusions,
      tourOverview: holiday?.tourOverview,
      pricing: holiday?.pricing,
      bookingPolicy: holiday?.bookingPolicy,
      faq: holiday?.faq,
      rating: holiday?.rating,
      additionalInfo: holiday?.additionalInfo,
    });
    setModalIsOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setModalIsOpen(false);
  };

  if (loading) return <div>Loading holidays...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Holidays</h1>
        <button
          onClick={() => navigate('/add-holidays')} // Assuming you have a function to open a modal for adding a holiday
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Holiday
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {holidays.map((holiday, index) => (
            <tr key={holiday._id}>
              <td>{index + 1}</td>
              <td>{holiday.title}</td>
              <td>{moment(holiday.createdAt).format('DD-MM-YYYY HH:MM:SS A')}</td>
              <td>
                <button
                  onClick={() => handleViewDetails(holiday)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  View
                </button>
                <button
                  onClick={() => navigate(`/update-holidays/${holiday._id}`)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(holiday._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for displaying detailed holiday information */}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Holiday Details"
        style={modalStyles}
      >
        <div className="holiday-modal">
          <h2 className="text-3xl font-bold mb-4">{holidayData?.title}</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">General Information</h3>
              <p><strong>Description:</strong> {holidayData?.description}</p>
              <p><strong>Slug:</strong> {holidayData?.slug}</p>
              <p><strong>Overview:</strong> {holidayData?.overview}</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Images</h3>
              <div className="grid grid-cols-3 gap-2">
                {holidayData?.images?.map((image, index) => (
                  // eslint-disable-next-line react/jsx-key
                  <a href={cdnUrl + image} target="_blank" rel="noopener noreferrer">
                    <img key={index} src={cdnUrl + image} alt={`Holiday ${index + 1}`} className="w-10 h-10 object-cover rounded" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Highlights</h3>
            <ul className="list-disc pl-5">
              {holidayData?.highlights?.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Itinerary</h3>
            {holidayData?.itinerary?.map((item, index) => (
              <div key={index} className="mb-6 border-b pb-4">
                <h4 className="font-bold text-lg">{item.title}</h4>
                <p className="mb-2">{item.description}</p>
                <p><strong>Place:</strong> {item.place}</p>
                <p><strong>Day Details:</strong> {item.dayDetails}</p>

                <div className="mt-3">
                  <h5 className="font-semibold">Itinerary Details:</h5>
                  {item.details?.map((detail, detailIndex) => (
                    <div key={detailIndex} className="mt-2 bg-gray-100 p-3 rounded">
                      <h6 className="font-semibold">{detail.title}</h6>
                      {detail.image && (
                        <a href={cdnUrl + detail.image} target="_blank" rel="noopener noreferrer">
                          <img
                            src={cdnUrl + detail.image}
                            alt={detail.title}
                            className="w-10 object-cover rounded mt-2 mb-2"
                          />
                        </a>
                      )}
                      <p><strong>Category:</strong> {detail.category}</p>
                      <p><strong>Location:</strong> {detail.location}</p>
                      {detail.room && <p><strong>Room:</strong> {detail.room}</p>}
                      {detail.checkIn && <p><strong>Check-in:</strong> {detail.checkIn}</p>}
                      {detail.checkout && <p><strong>Check-out:</strong> {detail.checkout}</p>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Timings</h3>
            <ul>
              {holidayData?.timings?.map((timing, index) => (
                <li key={index}>
                  <strong>{timing?.title}:</strong> {timing?.days} at {timing?.time}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Pricing</h3>
            <p><strong>Title:</strong> {holidayData?.pricing?.title}</p>
            <p><strong>Description:</strong> {holidayData?.pricing?.description}</p>
            <p><strong>Total Amount:</strong> {holidayData?.pricing?.totalAmount}</p>
            <h4 className="font-bold mt-2">Package Costs:</h4>
            <ul>
              {holidayData?.pricing?.packageCost?.map((cost, index) => (
                <li key={index}>
                  {cost.title}: {cost.amount} {cost.currency}
                </li>
              ))}
            </ul>
            <h4 className="font-bold mt-2">Taxes:</h4>
            <ul>
              {holidayData?.pricing?.tax?.map((tax, index) => (
                <li key={index}>
                  {tax.title}: {tax.amount} {tax.currency}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Booking Policy</h3>
            <p><strong>Cancellation:</strong> {holidayData?.bookingPolicy?.cancellation}</p>
            <p><strong>Child Policy:</strong> {holidayData?.bookingPolicy?.childPolicy}</p>
            <h4 className="font-bold mt-2">Other Policies:</h4>
            <ul>
              {holidayData?.bookingPolicy?.otherPolicies?.map((policy, index) => (
                <li key={index}>{policy}</li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">FAQ</h3>
            {holidayData?.faq?.map((item, index) => (
              <div key={index} className="mb-2">
                <p><strong>Q: {item.question}</strong></p>
                <p>A: {item.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Additional Information</h3>
            <p>{holidayData?.additionalInfo}</p>
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Faculty</h3>
            {holidayData?.faculty?.map((faculty, index) => (
              <div key={index} className="mb-2">
                <p><strong>Name:</strong> {faculty}</p>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">PDF</h3>
            {holidayData?.pdf?.map((image) => (
              // eslint-disable-next-line react/jsx-key
              <a href={cdnUrl + image} target="_blank" rel="noopener noreferrer">
                <FaRegFilePdf />
              </a>
            ))}
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Thumbnail</h3>
            <img
              src={cdnUrl + holidayData?.thumbnail}
              className="w-10 h-10 object-cover rounded mt-2 mb-2"
            />
          </div>
          <button
            onClick={closeModal}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Holidays;