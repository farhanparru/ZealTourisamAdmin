// eslint-disable-next-line no-unused-vars
import React from 'react';

const UmrahaView = () => {
  return (
    <div className="flex flex-col md:flex-row items-start p-6 max-w-6xl mx-auto bg-white">
      {/* Left section - Image and Thumbnails */}
      <div className="w-full md:w-1/2 p-4">
        <img
          src="https://easygoltd.com/wp-content/uploads/2022/06/parallexhajj-531x354.jpg"
          alt="Main Umraha Package"
          className="w-full h-auto rounded-lg"
        />
        <div className="flex mt-4 space-x-3">
          {/* Thumbnails */}
          <img src="https://easygoltd.com/wp-content/uploads/2015/07/CRc6G4fUkAAjdYF-531x354.jpg" alt="Thumbnail 1" className="w-12 h-12 rounded-lg" />
          <img src="https://easygoltd.com/wp-content/uploads/2015/07/CRc6G4fUkAAjdYF-531x354.jpg" alt="Thumbnail 2" className="w-12 h-12 rounded-lg" />
          <img src="https://easygoltd.com/wp-content/uploads/2015/07/CRc6G4fUkAAjdYF-531x354.jpg" alt="Thumbnail 3" className="w-12 h-12 rounded-lg" />
          <img src="https://easygoltd.com/wp-content/uploads/2015/07/CRc6G4fUkAAjdYF-531x354.jpg" alt="Thumbnail 4" className="w-12 h-12 rounded-lg" />
        </div>
      </div>

      {/* Right section - Product Details */}
      <div className="w-full md:w-1/2 p-4">
        <h2 className="text-2xl font-bold mb-2">Umraha Package Name</h2>
        <p className="text-gray-600">Duration: 7 Days / 6 Nights</p>
        <p className="text-gray-600">Price: $1200</p>

        <div className="my-4">
          <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            Top Rated
          </span>
        </div>

        <p className="text-gray-800 mb-4">
          Experience a fulfilling Umraha journey with our premium package that includes all-inclusive
          services, transportation, and comfortable accommodations.
        </p>

        <ul className="list-disc list-inside mb-4">
          <li>All-inclusive meals</li>
          <li>Transportation from airport</li>
          <li>Guided tours of holy sites</li>
        </ul>

        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <span className="text-lg">⭐</span>
            <span className="text-sm text-gray-600 ml-1">4.9 (27 Reviews)</span>
          </div>
          <a href="#" className="text-blue-600 text-sm">Read Reviews</a>
        </div>

        {/* Icons or Special Notes */}
        <div className="mt-4 flex space-x-4">
          <div className="text-center">
            <img src="icon1.jpg" alt="Feature 1" className="w-8 h-8" />
            <p className="text-xs mt-1">Enhancing</p>
          </div>
          <div className="text-center">
            <img src="icon2.jpg" alt="Feature 2" className="w-8 h-8" />
            <p className="text-xs mt-1">Nourishing</p>
          </div>
          <div className="text-center">
            <img src="icon3.jpg" alt="Feature 3" className="w-8 h-8" />
            <p className="text-xs mt-1">Moisturizing</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UmrahaView;
