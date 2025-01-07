// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import packge from '../assets/Images/umraga.png'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const Umraha = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState(null);


  const handleClick = ()=>{
     navigate('/AddUmraha')
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.zealtourism.com/api/umrahaall/'); // Add your backend URL here

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
      await axios.delete(`https://api.zealtourism.com/api/umrahaall/${id}`,{
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


  const handleView = (pkg) => {
    navigate(`/Umrahaall/view-package/${pkg._id}`, { state: { packageData: pkg } })
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
          <div>Image</div>
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
                  onClick={() => handleView(pkg)}
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
    </div>
  );
};

export default Umraha;