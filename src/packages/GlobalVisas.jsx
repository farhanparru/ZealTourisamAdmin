// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { FiEdit, FiTrash, FiEye, FiSearch, FiPlus } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "react-modal";
import "react-toastify/dist/ReactToastify.css";
import visas from "../assets/Images/visas.png";

const GlobalVisas = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
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

  useEffect(() => {
    const fetchVisaPackages = async () => {
      try {
        const response = await axios.get(
          "https://zeal-tourisam-api.vercel.app/api/global-visa"
        );

        if (response.data.success) {
          const fetchedPackages = response.data.results.map((pkg) => ({
            id: pkg._id,
            packageName: pkg.title,
            description: pkg.description,
            images: pkg.images.length > 0 ? pkg.images[0] : null,
            thumbnail: pkg.thumbnail,
            details: pkg.details,
            faculty: pkg.faculty?.length > 0 ? pkg.faculty : ["Not specified"],
            visaNo: pkg.visaNo?.length > 0 ? pkg.visaNo : [0],
            howToApply: pkg.howToApply,
            overview: pkg.overview,
            pricing: {
              packageCost: pkg.pricing.packageCost,
              tax: pkg.pricing.tax,
            },
            options: pkg.options || [],
            faq: pkg.faq || [],
          }));
          setPackages(fetchedPackages);
        }
      } catch (error) {
        console.error("Error fetching visa packages:", error);
        toast.error("Failed to load visa packages");
      } finally {
        setIsLoading(false);
      }
    };

    fetchVisaPackages();
  }, []);

  const handleDeletePackage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this visa package?")) return;
    
    const token = localStorage.getItem("adminToken");
    try {
      await axios.delete(
        `https://zeal-tourisam-api.vercel.app/api/global-visa/${id}`,
        {
          headers: {
            "x-access-token": token,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Visa package deleted successfully");
      setPackages(packages.filter((pkg) => pkg.id !== id));
    } catch (error) {
      console.error("Error deleting visa package:", error);
      toast.error("Failed to delete visa package");
    }
  };

  const handleViewDetails = (pkg) => {
    setSelectedPackage(pkg);
    setModalIsOpen(true);
  };

  const filteredPackages = packages.filter((pkg) =>
    pkg.packageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pkg.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Global Visa Packages</h1>
          <p className="text-xl md:text-2xl mb-8">
            Explore our exclusive visa services for destinations worldwide
          </p>
          
          {/* Search Bar */}
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-4">
            <div className="relative flex-grow">
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search visa packages..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-800"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Add New Package Section */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8 border border-gray-100">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Manage Visa Packages</h2>
            <p className="text-gray-600">Add new packages or manage existing ones</p>
          </div>
          <button
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-6 py-3 rounded-full font-medium hover:from-yellow-600 hover:to-yellow-700 transition flex items-center gap-2 shadow-lg"
            onClick={() => navigate("/AddVisa")}
          >
            <FiPlus /> Add New Package
          </button>
        </div>
      </div>

      {/* Packages List Section */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Table Header - Fixed */}
        <div className="grid grid-cols-12 bg-gradient-to-r from-blue-900 to-green-800 text-white p-4 font-bold sticky top-0 z-10">
          <div className="col-span-4">Package Name</div>
          <div className="col-span-5">Description</div>
          <div className="col-span-1">Image</div>
          <div className="col-span-2 text-center">Actions</div>
        </div>

        {/* Scrollable Package Rows */}
        <div className="h-32  overflow-y-auto">
          {filteredPackages.length > 0 ? (
            filteredPackages.map((pkg) => (
              <div 
                key={pkg.id} 
                className="grid grid-cols-12 items-center p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <div className="col-span-4 font-medium text-gray-800 truncate">{pkg.packageName}</div>
                <div className="col-span-5 text-gray-600 truncate">{pkg.description}</div>
                <div className="col-span-1">
                  <img
                    src={pkg.images || pkg.thumbnail || visas}
                    alt={pkg.packageName}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                </div>
                <div className="col-span-2 flex justify-center gap-4">
                  <button
                    onClick={() => handleViewDetails(pkg)}
                    className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50 transition"
                    title="View Details"
                  >
                    <FiEye size={16} />
                  </button>
                  <button
                    onClick={() => navigate(`/EditGlobalVisa/${pkg.id}`)}
                    className="text-yellow-600 hover:text-yellow-800 p-2 rounded-full hover:bg-yellow-50 transition"
                    title="Edit"
                  >
                    <FiEdit size={16} />
                  </button>
                  <button
                    onClick={() => handleDeletePackage(pkg.id)}
                    className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50 transition"
                    title="Delete"
                  >
                    <FiTrash size={16} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500">
              {packages.length === 0 ? "No visa packages available" : "No packages match your search"}
            </div>
          )}
        </div>
      </div>

      {/* Package Details Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Visa Package Details"
        style={modalStyles}
      >
        {selectedPackage ? (
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-3xl font-bold text-gray-800">
                {selectedPackage.packageName}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Main Image */}
              <div className="col-span-1">
                <img
                  src={selectedPackage.images || selectedPackage.thumbnail || visas}
                  alt={selectedPackage.packageName}
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
              </div>

              {/* Quick Info */}
              <div className="col-span-1">
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-4">
                  <h3 className="font-bold text-yellow-700 mb-2">Overview</h3>
                  <p className="text-gray-700">{selectedPackage.overview || "No overview available"}</p>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                  <h3 className="font-bold text-blue-700 mb-2">Description</h3>
                  <p className="text-gray-700">{selectedPackage.description || "No description available"}</p>
                </div>
              </div>
            </div>

            {/* Pricing */}
            {selectedPackage.pricing && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
                  Pricing Information
                </h3>
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <table className="min-w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-left text-gray-700">Title</th>
                        <th className="px-4 py-3 text-left text-gray-700">Amount</th>
                        <th className="px-4 py-3 text-left text-gray-700">Currency</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedPackage.pricing.packageCost?.map((cost, index) => (
                        <tr key={index} className="border-t">
                          <td className="px-4 py-3">{cost.title || 'Package Cost'}</td>
                          <td className="px-4 py-3">{cost.amount || '-'}</td>
                          <td className="px-4 py-3">{cost.currency || '-'}</td>
                        </tr>
                      ))}
                      {selectedPackage.pricing.tax?.map((tax, index) => (
                        <tr key={`tax-${index}`} className="border-t">
                          <td className="px-4 py-3">{tax.title || 'Tax'}</td>
                          <td className="px-4 py-3">{tax.amount || '-'}</td>
                          <td className="px-4 py-3">{tax.currency || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* How to Apply */}
            {selectedPackage.howToApply && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
                  How to Apply
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">{selectedPackage.howToApply}</p>
                </div>
              </div>
            )}

            {/* FAQ */}
            {selectedPackage.faq?.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                  {selectedPackage.faq.map((item, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">Q: {item.question}</h4>
                      <p className="text-gray-700">A: {item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end mt-6">
              <button
                onClick={closeModal}
                className="bg-gradient-to-r from-blue-900 to-green-800 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-800 hover:to-green-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div>Loading package details...</div>
        )}
      </Modal>
    </div>
  );
};

export default GlobalVisas;