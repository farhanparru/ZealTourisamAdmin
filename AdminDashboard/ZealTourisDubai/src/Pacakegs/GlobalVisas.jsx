// eslint-disable-next-line no-unused-vars
import React from "react";
import { FiEdit, FiTrash, FiEye } from "react-icons/fi";
import visas from "../assets/Images/visas.png";

const GlobalVisas = () => {
  const packages = [
    {
      host: "Ryan Richards",
      location: "Khulna",
      packageName: "Sundarbans",
      type: "Group",
      duration: "3D 2N",
      phone: "(164)224-5824",
      email: "ronnie.nelson@mail.com",
    },
    {
      host: "Richard Holland",
      location: "Chittagong",
      packageName: "Cox's Bazar",
      type: "Group",
      duration: "2D 3N",
      phone: "(910)946-2457",
      email: "diana.estrada@mail.com",
    },
    // Add more packages as needed...
  ];

  return (
    <div className="p-6">
      {/* Special Offer Advertisement Section */}
      <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white p-6 rounded-lg shadow mb-6 flex items-center justify-between">
        <div className="w-1/2">
          <h2 className="text-2xl font-bold mb-4">
            Special Offer: Global Visas Discount
          </h2>
          <p className="mb-4">
            Get exclusive discounts on our visa packages for a limited time!
            Whether you re traveling to Asia, Europe, or anywhere else, we have
            the best deals for you.
          </p>
          <p className="text-lg mb-4 font-semibold">
            Book now and save up to 30% on selected packages!
          </p>
          <button className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-full font-bold hover:bg-yellow-300 transition">
            Discover Offers
          </button>
        </div>
        {/* Image Section */}
        <div className="w-1/2 flex justify-end">
          <img
            src={visas}
            alt="Special Offer Global Visas"
            className="w-80 h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Add New Package Section */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-2">Add New Package</h2>
        <p className="text-gray-500 mb-4">
          Lorem Ipsum is simply dummy text of the printing and typesetting.
        </p>
        <button className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition">
          <span className="text-lg">+</span>
        </button>
      </div>

      {/* Package List Section */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-2">All Package</h2>
        <p className="text-gray-500 mb-4">
          Lorem Ipsum is simply dummy text of the printing and typesetting.
        </p>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-gray-600">Host</th>
                <th className="px-4 py-2 text-left text-gray-600">Location</th>
                <th className="px-4 py-2 text-left text-gray-600">
                  Package Name
                </th>
                <th className="px-4 py-2 text-left text-gray-600">Type</th>
                <th className="px-4 py-2 text-left text-gray-600">Duration</th>
                <th className="px-4 py-2 text-left text-gray-600">Phone</th>
                <th className="px-4 py-2 text-left text-gray-600">Email</th>
                <th className="px-4 py-2 text-center text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {packages.map((pkg, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{pkg.host}</td>
                  <td className="px-4 py-2">{pkg.location}</td>
                  <td className="px-4 py-2">{pkg.packageName}</td>
                  <td className="px-4 py-2">{pkg.type}</td>
                  <td className="px-4 py-2">{pkg.duration}</td>
                  <td className="px-4 py-2">{pkg.phone}</td>
                  <td className="px-4 py-2">{pkg.email}</td>
                  <td className="px-4 py-2 text-center">
                    <button className="text-blue-500 hover:text-blue-600 mx-2">
                      <FiEye />
                    </button>
                    <button className="text-yellow-500 hover:text-yellow-600 mx-2">
                      <FiEdit />
                    </button>
                    <button className="text-red-500 hover:text-red-600 mx-2">
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
