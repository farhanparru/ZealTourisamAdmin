import { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    right: 'auto',
    width: '90%',
    height: "90%",
    maxWidth: '650px',
    padding: '20px',
    borderRadius: '9px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
};

const UmrahMoreDetailsModal = ({ isOpen, onClose, onSubmit, umrahData }) => {
  const [moreDetails, setMoreDetails] = useState({
    overview: umrahData?.moreDetails?.overview || '',
    tourOverview: umrahData?.moreDetails?.tourOverview || '',
    faculty: umrahData?.moreDetails?.faculty || [''],
    inclusion: umrahData?.moreDetails?.inclusion || [''],
    exclusion: umrahData?.moreDetails?.exclusion || [''],
    AdditionalInformation: umrahData?.moreDetails?.AdditionalInformation || [''],
  });

  const handleChange = (event, path, index) => {
    const { name, value } = event.target;

    setMoreDetails(prevState => {
      if (index !== undefined) {
        const updatedArray = [...prevState[path]];
        updatedArray[index] = value;
        return { ...prevState, [path]: updatedArray };
      }
      return { ...prevState, [path]: value };
    });
  };

  const handleAddItem = (field) => {
    setMoreDetails(prevState => ({
      ...prevState,
      [field]: [...prevState[field], '']
    }));
  };

  const handleRemoveItem = (field, index) => {
    setMoreDetails(prevState => ({
      ...prevState,
      [field]: prevState[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(moreDetails);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="More Details" style={customStyles}>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">More Details</h2>
        <form onSubmit={handleSubmit}>
          <h6 className='font-bold mb-4'>Overview</h6>
          <textarea
            name="overview"
            value={moreDetails.overview || ""}
            onChange={(e) => handleChange(e, 'overview')}
            placeholder="Enter Overview"
            style={{ width: "100%" }}
          />
          <h6 className='font-bold mb-4'>Tour Overview</h6>
          <textarea
            name="tourOverview"
            value={moreDetails.tourOverview || ""}
            onChange={(e) => handleChange(e, 'tourOverview')}
            placeholder="Enter Tour Overview"
            style={{ width: "100%" }}
          />

          <h6 className='font-bold mb-4'>Faculty</h6>
          {moreDetails.faculty.map((item, index) => (
            <div key={index} className="mb-2 flex items-center space-x-2">
              <input
                type="text"
                value={item}
                onChange={(e) => handleChange(e, 'faculty', index)}
                placeholder={`Faculty ${index + 1}`}
                className="form-input w-full"
              />
              <button type="button" onClick={() => handleRemoveItem('faculty', index)} className="btn bg-red-500 text-white rounded px-2 py-1">
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddItem('faculty')} className="btn bg-green-500 text-white rounded px-2 py-1">
            Add Faculty
          </button>

          <h6 className='font-bold mb-4'>Inclusion</h6>
          {moreDetails.inclusion.map((item, index) => (
            <div key={index} className="mb-2 flex items-center space-x-2">
              <input
                type="text"
                value={item}
                onChange={(e) => handleChange(e, 'inclusion', index)}
                placeholder={`Inclusion ${index + 1}`}
                className="form-input w-full"
              />
              <button type="button" onClick={() => handleRemoveItem('inclusion', index)} className="btn bg-red-500 text-white rounded px-2 py-1">
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddItem('inclusion')} className="btn bg-green-500 text-white rounded px-2 py-1">
            Add Inclusion
          </button>

          <h6 className='font-bold mb-4'>Exclusion</h6>
          {moreDetails.exclusion.map((item, index) => (
            <div key={index} className="mb-2 flex items-center space-x-2">
              <input
                type="text"
                value={item}
                onChange={(e) => handleChange(e, 'exclusion', index)}
                placeholder={`Exclusion ${index + 1}`}
                className="form-input w-full"
              />
              <button type="button" onClick={() => handleRemoveItem('exclusion', index)} className="btn bg-red-500 text-white rounded px-2 py-1">
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddItem('exclusion')} className="btn bg-green-500 text-white rounded px-2 py-1">
            Add Exclusion
          </button>

          <h6 className='font-bold mb-4'>Additional Information</h6>
          {moreDetails.AdditionalInformation.map((item, index) => (
            <div key={index} className="mb-2 flex items-center space-x-2">
              <input
                type="text"
                value={item}
                onChange={(e) => handleChange(e, 'AdditionalInformation', index)}
                placeholder={`Additional Information ${index + 1}`}
                className="form-input w-full"
              />
              <button type="button" onClick={() => handleRemoveItem('AdditionalInformation', index)} className="btn bg-red-500 text-white rounded px-2 py-1">
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddItem('AdditionalInformation')} className="btn bg-green-500 text-white rounded px-2 py-1">
            Add AdditionalInformation
          </button>

          <div className="mt-3 flex justify-end space-x-2">
            <button type="submit" className="btn bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Save Details
            </button>
            <button type="button" onClick={onClose} className="btn bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default UmrahMoreDetailsModal;
