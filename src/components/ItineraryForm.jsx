import React, { useState } from 'react';

const ItineraryForm = ({ onSubmit, onCancel, setItineraryImages, itineraryData }) => {
  const [formData, setFormData] = useState({
    title: itineraryData?.title || '',
    description: itineraryData?.description || '',
    place: itineraryData?.place || '',
    dayDetails: itineraryData?.dayDetails || '',
    details: itineraryData?.details || [{ title: '', image: '', category: '', location: '', room: '', checkIn: '', checkout: '' }]
  });
  const [images, setImages] = useState({});
  const handleChange = (e, index = null) => {
    const { name, value } = e.target;
    if (index !== null) {
      const newDetails = [...formData.details];
      newDetails[index] = { ...newDetails[index], [name]: value };
      setFormData(prev => ({ ...prev, details: newDetails }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (index, e) => {
    if (e.target.files && e.target.files[0]) {
      setImages(prev => ({ ...prev, [index]: e.target.files[0] }));
      setItineraryImages(prev => ({ ...prev, [index]: e.target.files[0] }));
    }
  };

  const addDetail = () => {
    setFormData(prev => ({
      ...prev,
      details: [...prev.details, { title: '', image: '', category: '', location: '', room: '', checkIn: '', checkout: '' }]
    }));
  };

  const removeDetail = (index) => {
    setFormData(prev => ({
      ...prev,
      details: prev.details.filter((_, i) => i !== index)
    }));
    setImages(prev => {
      const newImages = { ...prev };
      delete newImages[index];
      return newImages;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const itineraryWithImages = formData.details.map((detail, index) => {
      if (images[index]) {
        return { ...detail, image: images[index].name };
      }
      return detail;
    });

    const itineraryData = {
      title: formData.title,
      description: formData.description,
      place: formData.place,
      dayDetails: formData.dayDetails,
      details: itineraryWithImages,
    };

    onSubmit(itineraryData); // Pass data to the parent component
  };

  return (
    <form onSubmit={handleSubmit} className="itinerary-form">
      <div className="form-card">
        <h2 className="form-title">Itinerary Information</h2>
        <div className="form-content">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="form-input"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="form-textarea"
          />
          <input
            type="text"
            name="place"
            value={formData.place}
            onChange={handleChange}
            placeholder="Place"
            className="form-input"
          />
          <input
            type="text"
            name="dayDetails"
            value={formData.dayDetails}
            onChange={handleChange}
            placeholder="Day Details"
            className="form-input"
          />
        </div>
      </div>

      {formData.details.map((detail, index) => (
        <div key={index} className="form-card">
          <h3 className="form-subtitle">Detail {index + 1}</h3>
          <div className="form-content">
            <input
              type="text"
              name="title"
              value={detail.title}
              onChange={(e) => handleChange(e, index)}
              placeholder="Title"
              className="form-input"
            />
            <input
              type="file"
              onChange={(e) => handleImageChange(index, e)}
              className="form-input"
            />
            <input
              type="text"
              name="category"
              value={detail.category}
              onChange={(e) => handleChange(e, index)}
              placeholder="Category"
              className="form-input"
            />
            <input
              type="text"
              name="location"
              value={detail.location}
              onChange={(e) => handleChange(e, index)}
              placeholder="Location"
              className="form-input"
            />
            <input
              type="text"
              name="room"
              value={detail.room}
              onChange={(e) => handleChange(e, index)}
              placeholder="Room"
              className="form-input"
            />
            <input
              type="text"
              name="checkIn"
              value={detail.checkIn}
              onChange={(e) => handleChange(e, index)}
              placeholder="Check-in"
              className="form-input"
            />
            <input
              type="text"
              name="checkout"
              value={detail.checkout}
              onChange={(e) => handleChange(e, index)}
              placeholder="Check-out"
              className="form-input"
            />
            <button
              type="button"
              onClick={() => removeDetail(index)}
              className="form-button remove-button"
            >
              Remove Detail
            </button>
          </div>
        </div>
      ))}

      <button type="button" onClick={addDetail} className="form-button add-button">
        Add Detail
      </button>

      <button type="submit" className="form-button submit-button">
        Save Itinerary
      </button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default ItineraryForm;
