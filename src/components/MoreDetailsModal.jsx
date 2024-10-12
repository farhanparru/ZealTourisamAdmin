// MoreDetailsModal.js
import React, { useState } from 'react';
import Modal from 'react-modal';
import './css/MoreDetailsModal.css'; // Import the CSS file for styling

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '600px',
    maxHeight: '80%',
    overflow: 'auto',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
};

const MoreDetailsModal = ({ isOpen, onClose, onSubmit, holidayData }) => {
  const [faculty, setFaculty] = useState(holidayData.faculty || ['']);
  const [highlights, setHighlights] = useState(holidayData.highlights || ['']);
  const [overview, setOverview] = useState(holidayData.overview || '');
  const [tourOverview, setTourOverview] = useState(holidayData.tourOverview || '');
  const [inclusion, setInclusion] = useState(holidayData.inclusion || ['']);
  const [exclusion, setExclusion] = useState(holidayData.exclusion || ['']);
  const [timings, setTimings] = useState(holidayData.timings || [{ title: '', days: '', time: '' }]);

  // New state for the details object
  const [details, setDetails] = useState({
    share: holidayData.details?.share || '',
    fcb: holidayData.details?.fcb || '',
    from: holidayData.details?.from || '',
    to: holidayData.details?.to || '',
    duration: holidayData.details?.duration || '',
    date: holidayData.details?.date || '',
    price: holidayData.details?.price || '',
    discount: holidayData.details?.discount || '',
    discountPrice: holidayData.details?.discountPrice || '',
    discountPercentage: holidayData.details?.discountPercentage || '',
    attracts: holidayData.details?.attracts || '',
    tags: holidayData.details?.tags || ['']
  });

  const handleChange = (setter) => (index, value) => {
    setter((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const handleDetailsChange = (field, value) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  const addField = (setter) => () => {
    setter((prev) => [...prev, '']);
  };

  const handleTimingChange = (index, field, value) => {
    setTimings((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const addTimingField = () => {
    setTimings((prev) => [...prev, { title: '', days: '', time: '' }]);
  };

  const handleTagChange = (index, value) => {
    setDetails((prevDetails) => {
      const updatedTags = [...prevDetails.tags];
      updatedTags[index] = value;
      return { ...prevDetails, tags: updatedTags };
    });
  };

  const addTagField = () => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      tags: [...prevDetails.tags, ''],
    }));
  };

  const handleAttractsChange = (index, value) => {
    setDetails((prevDetails) => {
      const updatedAttracts = [...prevDetails.attracts];
      updatedAttracts[index] = value;
      return { ...prevDetails, attracts: updatedAttracts };
    });

  };

  const addAttractsField = () => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      attracts: [...prevDetails.attracts, ''],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      faculty,
      highlights,
      overview,
      tourOverview,
      inclusion,
      exclusion,
      timings,
      details, // Add the details object in the final submission
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Tour Details"
    >
      <h2 className="modal-title">More Details</h2>
      <div>
        <div className="input-group">
          <h4>Faculty</h4>
          {faculty.map((member, index) => (
            <input
              key={index}
              type="text"
              value={member}
              onChange={(e) => handleChange(setFaculty)(index, e.target.value)}
              placeholder="Faculty Member"
              required
              className="holiday-input"
            />
          ))}
          <button type="button" onClick={addField(setFaculty)} className="add-button">Add Faculty</button>
        </div>


        {/* Other fields: Highlights, Overview, Tour Overview, Inclusions, Exclusions, and Timings */}
        <div className="input-group">
          <h4>Highlights</h4>
          {highlights.map((highlight, index) => (
            <input
              key={index}
              type="text"
              value={highlight}
              onChange={(e) => handleChange(setHighlights)(index, e.target.value)}
              placeholder="Highlight"
              required
              className="holiday-input"
            />
          ))}
          <button type="button" onClick={addField(setHighlights)} className="add-button">Add Highlight</button>
        </div>

        <div className="input-group">
          <h4>Tour Overview</h4>
          <textarea
            value={tourOverview}
            onChange={(e) => setTourOverview(e.target.value)}
            placeholder="Tour Overview"
            required
            className="holiday-input"
          />
        </div>

        <div className="input-group">
          <h4>Inclusions</h4>
          {inclusion.map((item, index) => (
            <input
              key={index}
              type="text"
              value={item}
              onChange={(e) => handleChange(setInclusion)(index, e.target.value)}
              placeholder="Inclusion"
              required
              className="holiday-input"
            />
          ))}
          <button type="button" onClick={addField(setInclusion)} className="add-button">Add Inclusion</button>
        </div>

        <div className="input-group">
          <h4>Exclusions</h4>
          {exclusion.map((item, index) => (
            <input
              key={index}
              type="text"
              value={item}
              onChange={(e) => handleChange(setExclusion)(index, e.target.value)}
              placeholder="Exclusion"
              required
              className="holiday-input"
            />
          ))}
          <button type="button" onClick={addField(setExclusion)} className="add-button">Add Exclusion</button>
        </div>

        <div className="input-group">
          <h4>Timings</h4>
          {timings.map((timing, index) => (
            <div key={index} className="timing-item">
              <input
                type="text"
                value={timing.title}
                onChange={(e) => handleTimingChange(index, 'title', e.target.value)}
                placeholder="Timing Title"
                className="holiday-input"
                required
              />
              <input
                type="text"
                value={timing.days}
                onChange={(e) => handleTimingChange(index, 'days', e.target.value)}
                placeholder="Days"
                className="holiday-input"
                required
              />
              <input
                type="text"
                value={timing.time}
                onChange={(e) => handleTimingChange(index, 'time', e.target.value)}
                placeholder="Time"
                className="holiday-input"
                required
              />
            </div>
          ))}
          <button type="button" onClick={addTimingField} className="add-button">Add Timing</button>
        </div>
        {/* Adding details fields */}
        <div className="input-group">
          <h4>More Details</h4>
          <input
            type="text"
            value={details.share}
            onChange={(e) => handleDetailsChange('share', e.target.value)}
            placeholder="Share"
            className="holiday-input"
            required
          />
          <input
            type="text"
            value={details.fcb}
            onChange={(e) => handleDetailsChange('fcb', e.target.value)}
            placeholder="FCB"
            className="holiday-input"
            required
          />
          <input
            type="text"
            value={details.from}
            onChange={(e) => handleDetailsChange('from', e.target.value)}
            placeholder="From"
            className="holiday-input"
            required
          />
          <input
            type="text"
            value={details.to}
            onChange={(e) => handleDetailsChange('to', e.target.value)}
            placeholder="To"
            className="holiday-input"
            required
          />
          <input
            type="text"
            value={details.duration}
            onChange={(e) => handleDetailsChange('duration', e.target.value)}
            placeholder="Duration"
            className="holiday-input"
            required
          />
          <input
            type="date"
            value={details.date}
            onChange={(e) => handleDetailsChange('date', e.target.value)}
            placeholder="Date"
            className="holiday-input"
            required
          />
          <input
            type="text"
            value={details.price}
            onChange={(e) => handleDetailsChange('price', e.target.value)}
            placeholder="Price"
            className="holiday-input"
            required
          />
          <input
            type="text"
            value={details.discount}
            onChange={(e) => handleDetailsChange('discount', e.target.value)}
            placeholder="Discount"
            className="holiday-input"
            required
          />
          <input
            type="text"
            value={details.discountPrice}
            onChange={(e) => handleDetailsChange('discountPrice', e.target.value)}
            placeholder="Discount Price"
            className="holiday-input"
            required
          />
          <input
            type="text"
            value={details.discountPercentage}
            onChange={(e) => handleDetailsChange('discountPercentage', e.target.value)}
            placeholder="Discount Percentage"
            className="holiday-input"
            required
          />
          <div className="tags-section">
            <h4>Tags</h4>
            {details.tags.map((tag, index) => (
              <input
                key={index}
                type="text"
                value={tag}
                onChange={(e) => handleTagChange(index, e.target.value)}
                placeholder="Tag"
                className="holiday-input"
              />
            ))}
            <button type="button" onClick={addTagField} className="add-button">Add Tag</button>
          </div>
        </div>


        <div className="input-group">
          <h4>Attracts</h4>
          {details?.attracts?.map((attract, index) => (
            <input
              key={index}
              type="text"
              value={attract}
              onChange={(e) => handleAttractsChange(index, e.target.value)}
              placeholder="Attracts"
              required
              className="holiday-input"
            />
          ))}
          <button type="button" onClick={addAttractsField} className="add-button">Add Attracts</button>
        </div>

        <div className="modal-buttons">
          <button type="button" className="submit-button" onClick={handleSubmit}>Submit</button>
          <button type="button" onClick={onClose} className="cancel-button">Cancel</button>
        </div>
      </div>
    </Modal>
  );
};

export default MoreDetailsModal;
