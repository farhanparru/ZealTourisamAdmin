// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import packge from '../assets/Images/umraga.png'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "react-modal"; 
import 'react-toastify/dist/ReactToastify.css';


const Umraha = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);

console.log(selectedPackage,"selectedPackage");

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
    

  const handleClick = ()=>{
     navigate('/AddUmraha')
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3002/api/umrahaall/'); // Add your backend URL here
        console.log(response,"new response");
        
        setPackages(response.data.results); // Set the response data to state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);



  const handleDelete = async (id) => {
    console.log("Deleting package with id:", id); // Check if id is undefined
    const token = localStorage.getItem("adminToken");
    try {
      await axios.delete(`http://localhost:3002/api/umrahaall/${id}`,{
        headers: {
          "x-access-token": `${token}`,
          "Content-Type": "application/json",
        },
      });
       toast.success("Umraha pacakaje delete successfully")
      setPackages((prevPackages) => prevPackages.filter(pkg => pkg._id !== id));
    } catch (error) {
      console.error('Error deleting package:', error);

    }
  };

  const handleViewDetails = (pkg) => {
    setSelectedPackage(pkg); // Set the selected package details
    setModalIsOpen(true); // Open the modal
  };


  return (
    <div className="container mx-auto p-4">
      {/* Header Section */}
      <div className="bg-blue-100 p-6 rounded-lg shadow-lg mb-6">
        <h1 className="text-3xl font-bold mb-4">Umraha Packages</h1>
        <p className="text-gray-700">
          Browse our collection of Umraha and special occasions from around the world.
        </p>
      </div>

      {/* Umraha Package Advertisement Section */}
      <div className="bg-blue-100 p-6 rounded-lg shadow-lg mb-6 flex items-center space-x-6">
        <img
          src={packge} // Assuming the first package is highlighted
          alt="Umraha Package"
          className="w-48 h-48 object-cover rounded-lg shadow-md"
        />
        <div>
          <h2 className="text-2xl font-bold mb-2">Special Umraha Package</h2>
          <p className="text-gray-700 mb-4">Description of the special package.</p>
          <div className="text-lg font-semibold mb-2">Location: Special Location</div>
          <div className="text-lg font-semibold mb-2">Price: $XXX</div>
          <button className="bg-green-500 text-white px-4 py-2 rounded-md">
            View More
          </button>
        </div>
      </div>

      {/* Add New Package Section */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-2">Add New Package</h2>
        <button
         
          className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition flex items-center space-x-2"
          onClick={handleClick}
        >
          Add New Package
        </button>
      </div>
        <p className="text-gray-600">
          Add a new Umraha package to our collection.
        </p>
      </div>

      {/* Packages List Section */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">All Packages</h2>
        {/* Table Header */}
        <div className="grid grid-cols-5 font-bold text-gray-700 mb-2">
          <div>Name</div>
          <div>Description</div>
          <div>Location</div>
          <div>Images</div>
          <div>Actions</div>
        </div>

        {/* Package Rows */}
        {packages && (
          packages.map((pkg) => (
            <div key={pkg._id} className="grid grid-cols-5 py-2 border-b">
              <div>{pkg.title}</div>
              <div>{pkg.description}</div>
              <div>{pkg.location}</div>
              <div>
                <img
                  src={pkg.thumbnail}
                  alt={pkg.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
              </div>
              <div className="flex space-x-2">
                <FaEye
                  className="text-blue-500 cursor-pointer"
                  onClick={() => handleViewDetails(pkg)}
                />
               
                <FaEdit
                  className="text-green-500 cursor-pointer"
                  onClick={() => navigate(`/updateUmrahaall/${pkg._id}`)}
                  />
                <FaTrashAlt
                  className="text-red-500 cursor-pointer"
                  onClick={() => handleDelete(pkg._id)}
                />
              </div>
            </div>
          ))
        )}

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
        {selectedPackage.title}
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
        {selectedPackage.images && selectedPackage.images.length > 0 ? (
          selectedPackage.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt="Package Image"
              className="w-40 h-40 object-cover rounded shadow"
            />
          ))
        ) : (
          <p>No images available</p>
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
          {selectedPackage.pricing.packageCost && selectedPackage.pricing.packageCost.length > 0 ? (
            selectedPackage.pricing.packageCost.map((cost, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">{cost.title}</td>
                <td className="border border-gray-300 px-4 py-2">{cost.amount}</td>
                <td className="border border-gray-300 px-4 py-2">{cost.currency}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="border border-gray-300 px-4 py-2">No pricing information available</td>
            </tr>
          )}
          {selectedPackage.pricing.tax && selectedPackage.pricing.tax.length > 0 ? (
            selectedPackage.pricing.tax.map((tax, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">{tax.title}</td>
                <td className="border border-gray-300 px-4 py-2">{tax.amount}</td>
                <td className="border border-gray-300 px-4 py-2">{tax.currency}</td>
              </tr>
            ))
          ) : null}
        </tbody>
      </table>

      {/* Options */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Options</h3>
        {selectedPackage.options && selectedPackage.options.length > 0 ? (
          selectedPackage.options.map((option, index) => (
            <div key={index} className="mb-4 border p-4 rounded shadow">
              <p><strong>Title:</strong> {option.title}</p>
              <p><strong>Badge:</strong> {option.badge}</p>
              <p><strong>Discount:</strong> {option.discountPercentage}</p>
              <p><strong>Refund Status:</strong> {option.refundStatus}</p>
              <p><strong>Price:</strong> {option.price} {option.currency}</p>
              <p><strong>Footer Text:</strong> {option.footerText}</p>

              {/* Process Type */}
              {option.processType && option.processType.length > 0 && (
                <p><strong>Process Type:</strong> {option.processType.join(", ")}</p>
              )}

              {/* Price With Currency */}
              {option.priceWithCurrency && option.priceWithCurrency.length > 0 && (
                <div>
                  <h4 className="font-semibold mt-2">Price with Currency</h4>
                  <ul className="list-disc list-inside">
                    {option.priceWithCurrency.map((pwc, pwcIndex) => (
                      <li key={pwcIndex}>
                        <strong>Currency:</strong> {pwc.currency},
                        <strong> Discount Price:</strong> {pwc.discountPrice},
                        <strong> Discount Percentage:</strong> {pwc.discountPercentage}
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

export default Umraha;