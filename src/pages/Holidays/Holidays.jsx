// src/Holidays.js
import { useEffect, useState } from "react";
import axios from "axios";
import { FiEdit, FiTrash, FiEye, FiSearch } from "react-icons/fi";
import Modal from "react-modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import visas from "../../assets/Images/holidaysimg1.jpg";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '95%', // More width for mobile
    maxWidth: '1200px',
    maxHeight: '90vh',
    padding: '0',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
    border: 'none',
    overflow: 'hidden'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 1000
  }
};
const Holidays = () => {
  const navigate = useNavigate();
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [holidayData, setHolidayData] = useState(null);
  const [state, setState] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLocation, setFilterLocation] = useState("all");

  // Fetch holidays from API
  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await axios.get(
          "https://zeal-tourisam-api.vercel.app/api/holidays",
          {
            headers: {
              "x-access-token": localStorage.getItem("adminToken"),
            },
          }
        );
        setHolidays(response.data.results);
      } catch (error) {
        console.error("Error fetching holidays:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHolidays();
  }, [state]);

  // Filter packages based on search term
  const filteredHolidays = holidays?.filter(pkg => {
    const matchesSearch = pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         pkg.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Get unique locations for filter dropdown
  const locations = holidays ? [...new Set(holidays.map(pkg => pkg.location))] : [];

  // Delete a holiday
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://zeal-tourisam-api.vercel.app/api/holidays/${id}`,
        {
          headers: {
            "x-access-token": localStorage.getItem("adminToken"),
          },
        }
      );
      setState(!state);
      toast.success("Package deleted successfully");
    } catch (error) {
      console.error("Error deleting holiday:", error);
    }
  };

  // Open modal and set selected holiday data
  const handleViewDetails = (pkg) => {
    setHolidayData({
      title: pkg?.title,
      description: pkg?.description,
      slug: pkg?.slug,
      thumbnail: pkg?.thumbnail,
      images: pkg?.images,
      highlights: pkg?.highlights,
      overview: pkg?.overview,
      itinerary: pkg?.itinerary,
      timings: pkg?.timings,
      inclusions: pkg?.inclusions,
      exclusions: pkg?.exclusions,
      pricing: pkg?.pricing,
      faq: pkg?.faq,
      additionalInfo: pkg?.additionalInfo,
    });
    setModalIsOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setModalIsOpen(false);
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-500"></div>
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      {/* Hero Section with UAE-inspired design */}
      <div className="relative bg-gradient-to-r from-blue-900 to-green-800 text-white py-16 px-4 sm:px-6 lg:px-8 rounded-xl mb-8 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Holiday Packages</h1>
          <p className="text-xl md:text-2xl mb-8">Discover exclusive travel experiences in the UAE</p>
          
          {/* Search and Filter Bar */}
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-4 flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search packages..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-800"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-800"
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
            >
              <option value="all">All Locations</option>
              {locations.map((loc, index) => (
                <option key={index} value={loc}>{loc}</option>
              ))}
            </select>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg font-medium transition duration-300 flex items-center justify-center gap-2">
              <FiSearch /> Search
            </button>
          </div>
        </div>
      </div>

      {/* Add New Package Section */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8 border border-gray-100">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Manage Holiday Packages</h2>
            <p className="text-gray-600">Add new packages or manage existing ones</p>
          </div>
          <button
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-6 py-3 rounded-full font-medium hover:from-yellow-600 hover:to-yellow-700 transition flex items-center gap-2 shadow-lg"
            onClick={() => navigate("/add-holidays")}
          >
            <span>+</span> Add New Package
          </button>
        </div>
      </div>

     {/* Packages List Section */}
<div className="bg-white rounded-xl shadow-md overflow-hidden">
  {/* Table Header - Fixed */}
  <div className="grid grid-cols-12 bg-gradient-to-r from-blue-900 to-green-800 text-white p-4 font-bold sticky top-0 z-10">
    <div className="col-span-1">#</div>
    <div className="col-span-3">Title</div>
    <div className="col-span-2">Date</div>
    <div className="col-span-3">Image</div>
    <div className="col-span-3 text-center">Actions</div>
  </div>

  {/* Scrollable Package Rows */}
  <div className="h-32  overflow-y-auto">
    {filteredHolidays.length > 0 ? (
      filteredHolidays.map((pkg, index) => (
        <div 
          key={pkg._id} 
          className="grid grid-cols-12 items-center p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
        >
          <div className="col-span-1 text-gray-700">{index + 1}</div>
          <div className="col-span-3 font-medium text-gray-800 truncate">{pkg.title}</div>
          <div className="col-span-2 text-gray-600">
            {moment(pkg.createdAt).format("DD-MM-YYYY")}
          </div>
          <div className="col-span-3">
            <img
              src={pkg.thumbnail || pkg.images?.[0] || visas}
              alt={pkg.title}
              className="w-20 h-16 object-cover rounded-lg shadow-sm"
            />
          </div>
          <div className="col-span-3 flex justify-center gap-4">
            <button
              onClick={() => handleViewDetails(pkg)}
              className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50 transition"
              title="View Details"
            >
              <FiEye size={18} />
            </button>
            <button
              onClick={() => navigate(`/update-holidays/${pkg._id}`)}
              className="text-yellow-600 hover:text-yellow-800 p-2 rounded-full hover:bg-yellow-50 transition"
              title="Edit"
            >
              <FiEdit size={18} />
            </button>
            <button
              onClick={() => handleDelete(pkg._id)}
              className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50 transition"
              title="Delete"
            >
              <FiTrash size={18} />
            </button>
          </div>
        </div>
      ))
    ) : (
      <div className="p-8 text-center text-gray-500 grid grid-cols-12">
        <div className="col-span-12">
          No packages found matching your search criteria
        </div>
      </div>
    )}
  </div>
</div>
   {/* Modal for Package Details */}
<Modal
  isOpen={modalIsOpen}
  onRequestClose={closeModal}
  contentLabel="Package Details"
  style={modalStyles}
  ariaHideApp={false}
>
  {holidayData ? (
    <div className="p-4 md:p-6">
      {/* Header with Close Button */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 border-b-2 border-yellow-500 pb-2">
            {holidayData.title}
          </h2>
          <p className="text-green-700 mt-1">{holidayData.location || 'UAE'}</p>
        </div>
        <button
          onClick={closeModal}
          className="text-gray-500 hover:text-red-600 text-2xl"
        >
          ✕
        </button>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Images and Highlights */}
        <div className="lg:col-span-2">
          {/* Main Image */}
          <div className="mb-6 rounded-xl overflow-hidden shadow-lg">
            <img
              src={holidayData.thumbnail || holidayData.images?.[0] || visas}
              alt={holidayData.title}
              className="w-full h-64 md:h-80 object-cover"
            />
          </div>

          {/* Gallery */}
          {holidayData.images?.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b-2 border-yellow-500 pb-2">
                Gallery
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {holidayData.images.map((image, index) => (
                  <div 
                    key={index} 
                    className="relative group cursor-pointer"
                    onClick={() => window.open(image, '_blank')}
                  >
                    <img
                      src={image}
                      alt={`${holidayData.title} ${index + 1}`}
                      className="w-full h-24 md:h-32 object-cover rounded-lg shadow-md group-hover:opacity-75 transition"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                      <FiEye className="text-white text-2xl" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="mb-8 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-800">
            <h3 className="text-xl font-semibold mb-3 text-blue-800">
              Package Description
            </h3>
            <p className="text-gray-700">{holidayData.description}</p>
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="lg:col-span-1">
          {/* Quick Facts */}
          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500 mb-6">
            <h3 className="text-xl font-semibold mb-3 text-yellow-700">
              Quick Facts
            </h3>
            <div className="space-y-2">
              <p className="flex items-center">
                <span className="font-medium w-24">Duration:</span>
                <span>7 Days / 6 Nights</span>
              </p>
              <p className="flex items-center">
                <span className="font-medium w-24">Location:</span>
                <span>{holidayData.location || 'Dubai'}</span>
              </p>
              <p className="flex items-center">
                <span className="font-medium w-24">Rating:</span>
                <span className="text-yellow-500">★★★★☆</span>
              </p>
            </div>
          </div>

          {/* Pricing */}
          {holidayData.pricing && (
            <div className="mb-6 bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-blue-900 to-green-800 text-white p-3">
                <h3 className="text-lg font-semibold">Pricing Information</h3>
              </div>
              <div className="p-4">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-3 py-2 text-left text-gray-700">Item</th>
                      <th className="px-3 py-2 text-right text-gray-700">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {holidayData.pricing.packageCost?.map((cost, index) => (
                      <tr key={index} className="border-t">
                        <td className="px-3 py-2">{cost.title}</td>
                        <td className="px-3 py-2 text-right">
                          {cost.amount} {cost.currency}
                        </td>
                      </tr>
                    ))}
                    {holidayData.pricing.tax?.map((tax, index) => (
                      <tr key={`tax-${index}`} className="border-t">
                        <td className="px-3 py-2">{tax.title}</td>
                        <td className="px-3 py-2 text-right">
                          {tax.amount} {tax.currency}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td className="px-3 py-2 font-semibold">Total</td>
                      <td className="px-3 py-2 text-right font-semibold">
                        ${holidayData.pricing.totalAmount || '0'}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}

          {/* Highlights */}
          {holidayData.highlights?.length > 0 && (
            <div className="mb-6 bg-green-50 p-4 rounded-lg border-l-4 border-green-600">
              <h3 className="text-xl font-semibold mb-3 text-green-800">
                Package Highlights
              </h3>
              <ul className="space-y-2">
                {holidayData.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-gray-700">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* FAQ Section */}
      {holidayData.faq?.length > 0 && (
        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800 border-b-2 border-yellow-500 pb-2">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            {holidayData.faq.map((item, index) => (
              <div 
                key={index} 
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
              >
                <h4 className="font-semibold text-blue-800 mb-2 flex items-start">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center mr-2">Q</span>
                  {item.question}
                </h4>
                <p className="text-gray-700 ml-8 flex items-start">
                  <span className="bg-green-100 text-green-600 rounded-full w-6 h-6 flex items-center justify-center mr-2">A</span>
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h4 className="text-lg font-semibold text-gray-800">Ready to book this package?</h4>
          <p className="text-gray-600">Contact our travel experts now</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={closeModal}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
          >
            Close
          </button>
          <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-6 py-2 rounded-lg font-medium hover:from-yellow-600 hover:to-yellow-700 transition">
            Book Now
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="p-8 text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500 mx-auto"></div>
      <p className="mt-4 text-gray-600">Loading package details...</p>
    </div>
  )}
</Modal>
    </div>
  );
};

export default Holidays;