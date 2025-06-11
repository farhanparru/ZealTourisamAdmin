// src/Holidays.js
import { useEffect, useState } from "react";
import axios from "axios";
import { FiEdit, FiTrash, FiEye } from "react-icons/fi";
import Modal from "react-modal"; // Modal for displaying holiday details
import "./Holidays.css"; // Add any custom CSS styling here
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import cdnUrl from "../../../contants/cdnUrl";
// import { FaRegFilePdf } from "react-icons/fa";
import visas from "../../assets/Images/holidaysimg1.jpg";
import moment from "moment";
import { useNavigate } from "react-router-dom";
const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "90%",
    maxHeight: "90%",
    minWidth: "80%",
    overflow: "auto",
    padding: "20px",
    backgroundColor: "#f0f0f0",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(197, 75, 75, 0.1)",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
};
const Holidays = () => {
  const navigate = useNavigate();
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // const [setSelectedHoliday] = useState(null);
  const [state, setState] = useState(false);
  // Holiday data structure for the modal
  const [holidayData, setHolidayData] = useState(null);

  console.log(holidayData, "holiday view ::::::::::::::::");
  // Fetch holidays from API
  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await axios.get("https://zeal-tourisam-api.vercel.app/api/holidays", {
          headers: {
            "x-access-token": localStorage.getItem("adminToken"),
          },
        }); // Replace with your API URL
        setHolidays(response.data.results);
      } catch (error) {
        console.error("Error fetching holidays:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHolidays();
  }, [state]);

  // Delete a holiday
  const handleDelete = async (id) => {
    console.log(id, "id::::::::");
    try {
      await axios.delete(`https://zeal-tourisam-api.vercel.app/api/holidays/${id}`, {
        headers: {
          "x-access-token": localStorage.getItem("adminToken"),
        },
      }); // Replace with your API URL
      setState(!state);
         toast.success("Delete pacakaje successfully");
    } catch (error) {
      console.error("Error deleting holiday:", error);
    }
  };

  // Open modal and set selected holiday data
  const handleViewDetails = (pkg) => {
    // setSelectedHoliday(pkg);
    setHolidayData({
      title: pkg?.title,
      description: pkg?.description,
      slug: pkg?.slug,
      thumbnail: pkg?.thumbnail,
      images: pkg?.images,
      pdf: pkg?.pdf,
      faculty: pkg?.faculty,
      details: pkg?.details,
      highlights: pkg?.highlights,
      overview: pkg?.overview,
      itinerary: pkg?.itinerary,
      timings: pkg?.timings,
      inclusions: pkg?.inclusions,
      exclusions: pkg?.exclusions,
      tourOverview: pkg?.tourOverview,
      pricing: pkg?.pricing,
      bookingPolicy: pkg?.bookingPolicy,
      faq: pkg?.faq,
      rating: pkg?.rating,
      additionalInfo: pkg?.additionalInfo,
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
      <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white p-6 rounded-lg shadow mb-6 flex items-center justify-between">
        <div className="w-1/2">
          <h2 className="text-2xl font-bold mb-4">
            Take only memories, leave only footprints
          </h2>
          <p className="mb-4">
            Get exclusive discounts on our holiday packages for a limited time!
          </p>
          <button className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-full font-bold hover:bg-yellow-300 transition">
            Discover Offers
          </button>
        </div>
        <div className="w-1/2 flex justify-end">
          <img
            src={visas}
            alt="Special Offer Global Visas"
            className="w-80 h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-2">Holidays</h2>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition flex items-center space-x-2"
          onClick={() => navigate("/add-holidays")}
        >
          Add Holiday
        </button>
      </div>

      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-2">All Packages</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-gray-600">id</th>
                <th className="px-4 py-2 text-left text-gray-600">Title</th>
                <th className="px-4 py-2 text-left text-gray-600">Date</th>
                <th className="px-4 py-2 text-left text-gray-600">Image</th>
                <th className="px-4 py-2 text-center text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {holidays.map((pkg, index) => (
                <tr key={pkg._id} className="border-b">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{pkg.title}</td>
                  <td>
                    {moment(pkg.createdAt).format("DD-MM-YYYY HH:MM:SS A")}
                  </td>
                  <td className="px-4 py-2">
                    <img
                      src={pkg.images} // Ensure this is the correct field for your image
                      alt="Hidd"
                      className="w-20 h-auto rounded"
                    />
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      className="text-blue-500 hover:text-blue-600 mx-2"
                      onClick={() => handleViewDetails(pkg)}
                    >
                      <FiEye />
                    </button>

                    <button
                      className="text-yellow-500 hover:text-yellow-600 mx-2"
                      onClick={() => navigate(`/update-holidays/${pkg._id}`)}
                    >
                      <FiEdit />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-600 mx-2"
                      onClick={() => handleDelete(pkg._id)} // Pass the package ID to the delete function
                    >
                      <FiTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Holiday Details"
        style={modalStyles}
      >
        <div className="holiday-modal p-4 bg-white rounded shadow-md max-w-6xl mx-auto">
  <h2 className="text-3xl font-bold mb-6 text-center">{holidayData?.title}</h2>

  {/* General Information Table */}
  <table className="table-auto w-full border-collapse border border-gray-300 mb-6">
    <thead>
      <tr className="bg-gray-200">
        <th className="border border-gray-300 px-4 py-2 text-left">Field</th>
        <th className="border border-gray-300 px-4 py-2 text-left">Details</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className="border border-gray-300 px-4 py-2">Description</td>
        <td className="border border-gray-300 px-4 py-2">{holidayData?.description}</td>
      </tr>
      <tr>
        <td className="border border-gray-300 px-4 py-2">Slug</td>
        <td className="border border-gray-300 px-4 py-2">{holidayData?.slug}</td>
      </tr>
      <tr>
        <td className="border border-gray-300 px-4 py-2">Overview</td>
        <td className="border border-gray-300 px-4 py-2">{holidayData?.overview}</td>
      </tr>
    </tbody>
  </table>

  {/* Highlights */}
  <div className="mb-6">
    <h3 className="text-xl font-semibold mb-4">Highlights</h3>
    <ul className="list-disc pl-5">
      {holidayData?.highlights?.map((highlight, index) => (
        <li key={index}>{highlight}</li>
      ))}
    </ul>
  </div>


  <div className="flex flex-row gap-6">
  {/* Images Section */}
  <div className="mb-6 flex-1">
    <h3 className="text-xl font-semibold mb-2">Images</h3>
    <div className="flex flex-wrap gap-4">
      {holidayData?.images?.map((image, index) => (
        <a
          key={index}
          href={image} // Full URL of the image
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <img
            src={image} // Display the image
            alt={`Holiday ${index + 1}`}
            className="w-60 h-40 object-cover rounded shadow-lg"
          />
        </a>
      ))}
    </div>
  </div>

  {/* Thumbnail Section */}
  <div className="mb-6 flex-1">
    <h3 className="text-xl font-semibold mb-2">Thumbnail</h3>
    {holidayData?.thumbnail && (
      <img
        src={holidayData?.thumbnail}
        alt="Thumbnail"
        className="w-60 h-40 object-cover rounded shadow-lg"
      />
    )}
  </div>

  {/* PDF Section */}
  {/* <div className="mb-6 flex-1">
    <h3 className="text-xl font-semibold mb-2">PDFkkkk</h3>
    <div className="flex flex-col gap-2">
      {holidayData?.pdf?.map((pdf, index) => (
        <a
          key={index}
          href={`${cdnUrl}${pdf.link}`} // Correctly render the PDF link
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 flex items-center gap-2"
        >
          <span className="font-medium">View PDF</span>
        </a>
      ))}
    </div>
  </div> */}
</div>


 
     
  {/* Pricing Table */}
  <h3 className="text-xl font-semibold mb-4">Pricing</h3>
  <table className="table-auto w-full border-collapse border border-gray-300 mb-6">
    <thead>
      <tr className="bg-gray-200">
        <th className="border border-gray-300 px-4 py-2">Title</th>
        <th className="border border-gray-300 px-4 py-2">Description</th>
        <th className="border border-gray-300 px-4 py-2">Total Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className="border border-gray-300 px-4 py-2">{holidayData?.pricing?.title}</td>
        <td className="border border-gray-300 px-4 py-2">{holidayData?.pricing?.description}</td>
        <td className="border border-gray-300 px-4 py-2">{holidayData?.pricing?.totalAmount}</td>
      </tr>
    </tbody>
  </table>

  {/* Timings Table */}
  <h3 className="text-xl font-semibold mb-4">Timings</h3>
  <table className="table-auto w-full border-collapse border border-gray-300 mb-6">
    <thead>
      <tr className="bg-gray-200">
        <th className="border border-gray-300 px-4 py-2">Title</th>
        <th className="border border-gray-300 px-4 py-2">Days</th>
        <th className="border border-gray-300 px-4 py-2">Time</th>
      </tr>
    </thead>
    <tbody>
      {holidayData?.timings?.map((timing, index) => (
        <tr key={index}>
          <td className="border border-gray-300 px-4 py-2">{timing.title}</td>
          <td className="border border-gray-300 px-4 py-2">{timing.days}</td>
          <td className="border border-gray-300 px-4 py-2">{timing.time}</td>
        </tr>
      ))}
    </tbody>
  </table>

  {/* FAQ */}
  <div className="mb-6">
    <h3 className="text-xl font-semibold mb-4">FAQ</h3>
    {holidayData?.faq?.map((faq, index) => (
      <div key={index} className="mb-4">
        <p className="font-semibold">Q: {faq.question}</p>
        <p>A: {faq.answer}</p>
      </div>
    ))}
  </div>

  {/* Additional Information */}
  <div className="mb-6">
    <h3 className="text-xl font-semibold mb-4">Additional Information</h3>
    <p>{holidayData?.additionalInfo}</p>
  </div>

  {/* Close Button */}
  <button
    onClick={closeModal}
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
  >
    Close
  </button>
</div>

      </Modal>
    </div>
  );
};

export default Holidays;
