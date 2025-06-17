// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt, FaEye, FaSearch, FaPlus } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "react-modal";
import "react-toastify/dist/ReactToastify.css";

const Umraha = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLocation, setFilterLocation] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
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

  const closeModal = () => setModalIsOpen(false);

  const handleAddPackage = () => navigate("/AddUmraha");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://zeal-tourisam-api.vercel.app/api/umrahall/"
        );
        setPackages(response.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load packages");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this package?")) return;
    
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(
        `https://zeal-tourisam-api.vercel.app/api/umrahall/${id}`,
        {
          headers: {
            "x-access-token": token,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Umrah package deleted successfully");
      setPackages(packages.filter((pkg) => pkg._id !== id));
    } catch (error) {
      console.error("Error deleting package:", error);
      toast.error("Failed to delete package");
    }
  };

  const handleViewDetails = (pkg) => {
    setSelectedPackage(pkg);
    setModalIsOpen(true);
  };

  // Filter packages based on search term and location
  const filteredPackages = packages?.filter((pkg) => {
    const matchesSearch =
      pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation =
      filterLocation === "all" ||
      pkg.location?.toLowerCase() === filterLocation.toLowerCase();
    return matchesSearch && matchesLocation;
  });

  // Get unique locations for filter dropdown
  const locations = packages
    ? [...new Set(packages.map((pkg) => pkg.location).filter(Boolean))]
    : [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {/* Hero Section with UAE-inspired design */}
      <div className="relative bg-gradient-to-r from-blue-900 to-green-800 text-white py-16 px-4 sm:px-6 lg:px-8 rounded-xl mb-8 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Umrah Packages</h1>
          <p className="text-xl md:text-2xl mb-8">
            Experience spiritual journeys with our exclusive Umrah packages
          </p>
          
          {/* Search and Filter Bar */}
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-4 flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
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
                <option key={index} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg font-medium transition duration-300 flex items-center justify-center gap-2">
              <FaSearch /> Search
            </button>
          </div>
        </div>
      </div>

      {/* Add New Package Section */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8 border border-gray-100">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Manage Umrah Packages</h2>
            <p className="text-gray-600">Add new packages or manage existing ones</p>
          </div>
          <button
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-6 py-3 rounded-full font-medium hover:from-yellow-600 hover:to-yellow-700 transition flex items-center gap-2 shadow-lg"
            onClick={handleAddPackage}
          >
            <FaPlus /> Add New Package
          </button>
        </div>
      </div>

      {/* Packages List Section */}
     
<div className="bg-white rounded-xl shadow-md overflow-hidden">
  {/* Table Header - Fixed */}
  <div className="hidden md:grid grid-cols-12 bg-gradient-to-r from-blue-900 to-green-800 text-white p-4 font-bold sticky top-0 z-10">
    <div className="col-span-12 md:col-span-3">Name</div>
    <div className="col-span-12 md:col-span-4">Description</div>
    <div className="col-span-12 md:col-span-2">Location</div>
    <div className="col-span-12 md:col-span-1">Image</div>
    <div className="col-span-12 md:col-span-2 text-center">Actions</div>
  </div>

  {/* Scrollable Package Rows */}
  <div className="h-32  overflow-y-auto">
    {filteredPackages?.length > 0 ? (
      filteredPackages.map((pkg) => (
        <div 
          key={pkg._id} 
          className="grid grid-cols-1 md:grid-cols-12 items-center p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
        >
          {/* Mobile view - stacked */}
          <div className="md:hidden mb-2">
            <div className="flex justify-between items-start">
              <div className="font-medium text-gray-800 truncate flex-1">{pkg.title}</div>
              <div className="flex gap-2 ml-2">
                <button
                  onClick={() => handleViewDetails(pkg)}
                  className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-50 transition"
                  title="View Details"
                >
                  <FaEye size={14} />
                </button>
                <button
                  onClick={() => navigate(`/updateUmrahaall/${pkg._id}`)}
                  className="text-yellow-600 hover:text-yellow-800 p-1 rounded-full hover:bg-yellow-50 transition"
                  title="Edit"
                >
                  <FaEdit size={14} />
                </button>
                <button
                  onClick={() => handleDelete(pkg._id)}
                  className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50 transition"
                  title="Delete"
                >
                  <FaTrashAlt size={14} />
                </button>
              </div>
            </div>
            <div className="flex items-center mt-2">
              {pkg.thumbnail && (
                <img
                  src={pkg.thumbnail}
                  alt={pkg.title}
                  className="w-10 h-10 object-cover rounded-lg mr-3"
                />
              )}
              <div className="text-sm text-gray-600 truncate flex-1">
                {pkg.description}
                {pkg.location && <div className="text-gray-500 mt-1">Location: {pkg.location}</div>}
              </div>
            </div>
          </div>

          {/* Desktop view - grid */}
          <div className="hidden md:contents">
            <div className="col-span-3 font-medium text-gray-800 truncate">{pkg.title}</div>
            <div className="col-span-4 text-gray-600 truncate">{pkg.description}</div>
            <div className="col-span-2">{pkg.location || "-"}</div>
            <div className="col-span-1">
              <img
                src={pkg.thumbnail || "https://via.placeholder.com/80"}
                alt={pkg.title}
                className="w-12 h-12 object-cover rounded-lg"
              />
            </div>
            <div className="col-span-2 flex justify-center gap-4">
              <button
                onClick={() => handleViewDetails(pkg)}
                className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50 transition"
                title="View Details"
              >
                <FaEye size={16} />
              </button>
              <button
                onClick={() => navigate(`/updateUmrahaall/${pkg._id}`)}
                className="text-yellow-600 hover:text-yellow-800 p-2 rounded-full hover:bg-yellow-50 transition"
                title="Edit"
              >
                <FaEdit size={16} />
              </button>
              <button
                onClick={() => handleDelete(pkg._id)}
                className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50 transition"
                title="Delete"
              >
                <FaTrashAlt size={16} />
              </button>
            </div>
          </div>
        </div>
      ))
    ) : (
      <div className="p-8 text-center text-gray-500">
        {packages?.length === 0 ? "No packages available" : "No packages match your search"}
      </div>
    )}
  </div>
</div>

     <Modal
  isOpen={modalIsOpen}
  onRequestClose={closeModal}
  contentLabel="Package Details"
  style={modalStyles}
  ariaHideApp={false}
>
  {selectedPackage && (
    <div className="flex flex-col h-full">
      {/* Modal Header - Sticky on mobile */}
      <div className="sticky top-0 z-10 flex justify-between items-center p-4 sm:p-6 bg-gradient-to-r from-blue-900 to-green-800 text-white">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold truncate max-w-[70%]">
          {selectedPackage.title}
        </h2>
        <button
          onClick={closeModal}
          className="text-white hover:text-yellow-300 text-2xl p-1"
        >
          &times;
        </button>
      </div>

      {/* Modal Body - Scrollable Content */}
      <div className="overflow-y-auto p-4 sm:p-6 flex-1">
        {/* Main Content - Stack on mobile, 2 columns on larger screens */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          {/* Image Section - Full width on mobile */}
          <div className="w-full lg:w-1/2 space-y-4">
            <img
              src={selectedPackage.thumbnail || "https://via.placeholder.com/800x500"}
              alt={selectedPackage.title}
              className="w-full h-auto max-h-64 sm:max-h-80 md:max-h-96 object-cover rounded-lg shadow-md"
            />
            
            {/* Gallery - Responsive grid */}
            {selectedPackage.images?.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Gallery</h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                  {selectedPackage.images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`${selectedPackage.title} ${i + 1}`}
                      className="w-full h-20 sm:h-24 object-cover rounded cursor-pointer hover:opacity-80"
                      onClick={() => window.open(img, '_blank')}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Details Section - Full width on mobile */}
          <div className="w-full lg:w-1/2 space-y-4">
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r">
              <h3 className="font-bold text-base sm:text-lg text-yellow-700 mb-2">Overview</h3>
              <p className="text-sm sm:text-base text-gray-700">
                {selectedPackage.overview || "No overview available"}
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r">
              <h3 className="font-bold text-base sm:text-lg text-blue-700 mb-2">Description</h3>
              <p className="text-sm sm:text-base text-gray-700">
                {selectedPackage.description || "No description available"}
              </p>
            </div>

            {/* Key Details - Stack on mobile, 2 columns on larger screens */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-gray-50 p-3 rounded">
                <h4 className="font-semibold text-sm sm:text-base text-gray-600">Location</h4>
                <p className="text-sm sm:text-base">{selectedPackage.location || '-'}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <h4 className="font-semibold text-sm sm:text-base text-gray-600">Duration</h4>
                <p className="text-sm sm:text-base">{selectedPackage.duration || '-'}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <h4 className="font-semibold text-sm sm:text-base text-gray-600">Group Size</h4>
                <p className="text-sm sm:text-base">{selectedPackage.groupSize || '-'}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <h4 className="font-semibold text-sm sm:text-base text-gray-600">Rating</h4>
                <p className="text-sm sm:text-base">
                  {selectedPackage.rating ? `${selectedPackage.rating}/5` : '-'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Section - Horizontal scroll on mobile */}
        {selectedPackage.pricing && (
          <div className="mb-6">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 text-gray-800 border-b pb-2">
              Pricing Information
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Currency
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {selectedPackage.pricing.packageCost?.map((cost, index) => (
                    <tr key={index}>
                      <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {cost.title || 'Package Cost'}
                      </td>
                      <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-gray-500">
                        {cost.amount || '-'}
                      </td>
                      <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-gray-500">
                        {cost.currency || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Options Section - Stack on mobile */}
        {selectedPackage.options?.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 text-gray-800 border-b pb-2">
              Package Options
            </h3>
            <div className="space-y-3">
              {selectedPackage.options.map((option, index) => (
                <div key={index} className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-1 sm:mb-2">{option.title}</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-sm">
                    <div>
                      <p><span className="font-medium">Badge:</span> {option.badge || '-'}</p>
                      <p><span className="font-medium">Discount:</span> {option.discountPercentage || '0'}%</p>
                    </div>
                    <div>
                      <p><span className="font-medium">Price:</span> {option.price || '0'} {option.currency || ''}</p>
                      <p><span className="font-medium">Refund:</span> {option.refundStatus || '-'}</p>
                    </div>
                  </div>
                  {option.footerText && (
                    <p className="mt-2 text-xs sm:text-sm text-gray-600">
                      {option.footerText}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer with close button - Sticky on mobile */}
        <div className="sticky bottom-0 bg-white py-3 border-t flex justify-end">
          <button
            onClick={closeModal}
            className="px-4 py-2 sm:px-6 sm:py-2 bg-gradient-to-r from-blue-900 to-green-800 text-white rounded-md hover:opacity-90 transition text-sm sm:text-base"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )}
</Modal>
    </div>
  );
};

export default Umraha;