// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { FiEdit, FiTrash, FiEye } from "react-icons/fi";
import axios from "axios"; // Import axios for making API requests
import visas from "../assets/Images/visas.png"; // You can change this path or use different images for packages
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal"; // Modal for displaying holiday details

const GlobalVisas = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/AddVisa");
  };

  const [packages, setPackages] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  console.log(selectedPackage, "selectedPackage");

  const closeModal = () => {
    setModalIsOpen(false);
  };

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

  // Fetching visa packages from the API
  useEffect(() => {
    const fetchVisaPackages = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3002/api/global-visa"
        );

        console.log(response,"myGlobal");

        if (response.data.success) {
          const fetchedPackages = response.data.results.map((pkg) => ({
            id: pkg._id, // Ensure 'id' is included
            packageName: pkg.title,
            description: pkg.description,
            images: pkg.images.length > 0 ? pkg.images[0] : null, // Use the first image or null if none
            thumbnail: pkg.thumbnail,
            details: pkg.details,
            faculty: pkg.faculty?.length > 0 ? pkg.faculty : ["Not specified"], // Ensure faculty is an array
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
          console.log(fetchedPackages, "fetchedPackages");

          setPackages(fetchedPackages);
        }
      } catch (error) {
        console?.log(error);
      }
    };

    fetchVisaPackages();
  }, []);

  // Delete Visa package by ID
  const handleDeletePackage = (id) => {
    console.log("Deleting package with id:", id); // Check if id is undefined
    const token = localStorage.getItem("adminToken");

    axios
      .delete(`http://localhost:3002/api/global-visa/${id} `, {
        headers: {
          "x-access-token": `${token}`,
          "Content-Type": "application/json",
        },
      })

      .then((response) => {
        if (response.data.success) {
          toast.success("Delete pacakaje successfully");
          // Remove the deleted package from the state
          const updatedPackages = packages.filter((pkg) => pkg.id !== id);
          setPackages(updatedPackages);
        }
      })
      .catch((error) => {
        console.error("There was an error deleting the package!", error);
      });
  };


  // View GlobalVisa pacakje deleteils
  const handleViewDetails = (pkg) => {
    setSelectedPackage(pkg); // Set the selected package details
    setModalIsOpen(true); // Open the modal
  };

  return (
    <div className="p-6">
      {/* Special Offer Section */}
      <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white p-6 rounded-lg shadow mb-6 flex items-center justify-between">
        <div className="w-1/2">
          <h2 className="text-2xl font-bold mb-4">
            Special Offer: Global Visas Discount
          </h2>
          <p className="mb-4">
            Get exclusive discounts on our visa packages for a limited time!
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
        <h2 className="text-xl font-semibold mb-2">Add New Package</h2>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition flex items-center space-x-2"
          onClick={handleClick}
        >
          Add New Package
        </button>
      </div>

      {/* Packages Table */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-2">All Packages</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-gray-600">
                  Package Name
                </th>
                <th className="px-4 py-2 text-left text-gray-600">
                  Description
                </th>
                <th className="px-4 py-2 text-left text-gray-600">Image</th>
                <th className="px-4 py-2 text-center text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {packages.map((pkg) => (
                <tr key={pkg._id} className="border-b">
                  <td className="px-4 py-2">{pkg.packageName}</td>
                  <td className="px-4 py-2">{pkg.description}</td>
                  <td className="px-4 py-2">
                    <img
                      src={pkg.images} // Ensure this is the correct field for your image
                      alt="Hidd"
                      className="w-20 h-auto rounded"
                    />
                  </td>
                  <td className="px-4 py-2 text-center">
                    <Link>
                      <button
                        className="text-blue-500 hover:text-blue-600 mx-2"
                        onClick={() => handleViewDetails(pkg)}
                      >
                        <FiEye />
                      </button>
                    </Link>
                    <button
                      className="text-yellow-500 hover:text-yellow-600 mx-2"
                      onClick={() => navigate(`/EditGlobalVisa/${pkg.id}`)}
                    >
                      <FiEdit />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-600 mx-2"
                      onClick={() => handleDeletePackage(pkg.id)} // Pass the package ID to the delete function
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
        contentLabel="Package Details"
        style={modalStyles}
      >
        {selectedPackage ? (
          <div className="p-6 bg-white rounded-lg shadow-lg max-w-5xl mx-auto">
            {/* Title */}
            <h2 className="text-3xl font-bold mb-4">
              {selectedPackage.packageName}
            </h2>

            {/* Overview & Description */}
            <p className="text-gray-700 mb-4">
              <strong>Overview:</strong> {selectedPackage.overview}
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Description:</strong> {selectedPackage.description}
            </p>

            {/* Images & Thumbnail */}
            <div className="flex space-x-4 mb-4">
              {selectedPackage.images ? (
                <img
                  src={selectedPackage.images}
                  alt="Package Image"
                  className="w-40 h-40 object-cover rounded shadow"
                />
              ) : (
                <p>No image available</p>
              )}
              {selectedPackage.thumbnail ? (
                <img
                  src={selectedPackage.thumbnail}
                  alt="Package Thumbnail"
                  className="w-20 h-20 object-cover rounded shadow"
                />
              ) : (
                <p>No thumbnail available</p>
              )}
            </div>

            {/* Pricing Table */}
            <h3 className="text-xl font-semibold mb-2">Pricing</h3>
            <table className="table-auto w-full border-collapse border border-gray-300 mb-6">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">Title</th>
                  <th className="border border-gray-300 px-4 py-2">Amount</th>
                  <th className="border border-gray-300 px-4 py-2">Currency</th>
                </tr>
              </thead>
              <tbody>
                {selectedPackage.pricing.packageCost.map((cost, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2">
                      {cost.title}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {cost.amount}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {cost.currency}
                    </td>
                  </tr>
                ))}
                {selectedPackage.pricing.tax.map((tax, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2">
                      {tax.title}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {tax.amount}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {tax.currency}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Options */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Options</h3>
              {selectedPackage.options && selectedPackage.options.length > 0 ? (
                selectedPackage.options.map((option, index) => (
                  <div key={index} className="mb-4 border p-4 rounded shadow">
                    <p>
                      <strong>Title:</strong> {option.title}
                    </p>
                    <p>
                      <strong>Badge:</strong> {option.badge}
                    </p>
                    <p>
                      <strong>Discount:</strong> {option.discountPercentage}
                    </p>
                    <p>
                      <strong>Refund Status:</strong> {option.refundStatus}
                    </p>
                    <p>
                      <strong>Price:</strong> {option.price} {option.currency}
                    </p>
                    <p>
                      <strong>Footer Text:</strong> {option.footerText}
                    </p>

                    {/* Process Type */}
                    {option.processType && option.processType.length > 0 && (
                      <p>
                        <strong>Process Type:</strong>{" "}
                        {option.processType.join(", ")}
                      </p>
                    )}

                    {/* Price With Currency */}
                    {option.priceWithCurrency &&
                      option.priceWithCurrency.length > 0 && (
                        <div>
                          <h4 className="font-semibold mt-2">
                            Price with Currency
                          </h4>
                          <ul className="list-disc list-inside">
                            {option.priceWithCurrency.map((pwc, pwcIndex) => (
                              <li key={pwcIndex}>
                                <strong>Currency:</strong> {pwc.currency},
                                <strong> Discount Price:</strong>{" "}
                                {pwc.discountPrice},
                                <strong> Discount Percentage:</strong>{" "}
                                {pwc.discountPercentage}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                  </div>
                ))
              ) : (
                <p>No options available</p>
              )}
            </div>

            {/* FAQ */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">FAQ</h3>
              {selectedPackage.faq && selectedPackage.faq.length > 0 ? (
                <ul className="list-disc list-inside">
                  {selectedPackage.faq.map((item, index) => (
                    <li key={index}>
                      <strong>{item.question}</strong>: {item.answer}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No FAQs available</p>
              )}
            </div>

            {/* Close Button */}
            <button
              onClick={closeModal}
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        ) : (
          <p>Loading package details...</p>
        )}
      </Modal>
    </div>
  );
};

export default GlobalVisas;
