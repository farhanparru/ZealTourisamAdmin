// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { FiEdit, FiTrash, FiEye } from "react-icons/fi";
import axios from "axios"; // Import axios for making API requests
import visas from "../assets/Images/visas.png"; // You can change this path or use different images for packages
import { useNavigate, Link } from 'react-router-dom';



const GlobalVisas = () => {
  
  const navigate = useNavigate();

  const handleClick = ()=>{
     navigate('/AddVisa')
  }

  
  const [packages, setPackages] = useState([]);

  // Fetching visa packages from the API
  useEffect(() => {
    const fetchVisaPackages = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3002/api/global-visa"
        );

        if (response.data.success) {
          const fetchedPackages = response.data.results.map((pkg) => ({
            id: pkg._id, // Ensure 'id' is included
            packageName: pkg.title,
            description: pkg.description,
            images: pkg.images.length > 0 ? pkg.images[0] : null, // Use the first image or null if none
            thumbnail: pkg.thumbnail,
            details: pkg.details,
            faculty: pkg.faculty.length > 0 ? pkg.faculty : ["Not specified"], // Ensure faculty is an array
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
        console.log(error);
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
          // Remove the deleted package from the state
          const updatedPackages = packages.filter((pkg) => pkg.id !== id);
          setPackages(updatedPackages);
        }
      })
      .catch((error) => {
        console.error("There was an error deleting the package!", error);
      });
  };

  // handle Editt





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
                    <Link to="/View">
                      <button className="text-blue-500 hover:text-blue-600 mx-2">
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

      
    </div>
  );
};

export default GlobalVisas;
