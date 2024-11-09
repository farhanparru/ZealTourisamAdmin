// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';

const UmrahaSEO = () => {
  const [title, setTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [headerTags, setHeaderTags] = useState('');

  const handleSave = () => {
    // Add functionality to save SEO settings
    console.log("SEO settings saved:", { title, metaDescription, headerTags });
  };

  const handleClose = () => {
    // Add functionality to close the SEO settings
    console.log("SEO settings closed");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">SEOsettings</h2>
        <div className="border-b border-gray-200 mb-4">
         
        </div>

        <div className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Title Tags (Max 60 characters)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Get Your Dubai Express Visa Today - Apply Online Now"
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Meta Descriptions (150-160 characters)
            </label>
            <textarea
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              placeholder="Need a Dubai Express Visa? Get fast online processing and quick approval..."
              className="w-full border border-gray-300 rounded-lg p-2"
              rows="3"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Header Tags (H1, H2, H3)
            </label>
            <input
              type="text"
              value={headerTags}
              onChange={(e) => setHeaderTags(e.target.value)}
              placeholder="Dubai express visa, Express tourist visa Dubai, Apply for Dubai express visa..."
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
        </div>

        <div className="flex justify-end mt-6 space-x-2">
          <button
            onClick={handleClose}
            className="bg-red-500 text-white rounded-lg px-4 py-2"
          >
            Close
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white rounded-lg px-4 py-2"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UmrahaSEO;
