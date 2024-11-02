import React, { useState } from 'react';
import Modal from 'react-modal';

const RatingModal = ({ isOpen, onClose, onSubmit, holidayData }) => {
  const [ratingData, setRatingData] = useState({
    stars: holidayData?.rating?.stars || "4.0",
    ratingCount: holidayData?.rating?.ratingCount || "0",
    reviews: holidayData?.rating?.reviews || [{ review: '', details: '' }],
  });

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedReviews = [...ratingData.reviews];
    updatedReviews[index] = { ...updatedReviews[index], [name]: value };
    setRatingData({ ...ratingData, reviews: updatedReviews });
  };

  const handleStarsChange = (e) => {
    const { value } = e.target;
    setRatingData({ ...ratingData, stars: value });
  };

  const addReview = () => {
    setRatingData({
      ...ratingData,
      reviews: [...ratingData.reviews, { review: '', details: '' }],
    });
  };

  const removeReview = (index) => {
    const updatedReviews = ratingData.reviews.filter((_, i) => i !== index);
    setRatingData({ ...ratingData, reviews: updatedReviews });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(ratingData); // Pass data to parent component
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Rating Modal">
      <h2>Ratings & Reviews</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="stars">Rating (Stars): </label>
          <input
            type="number"
            name="stars"
            value={ratingData.stars}
            onChange={handleStarsChange}
            min="0"
            max="5"
            step="0.1"
            className="form-input"
          />
        </div>

        {ratingData.reviews.map((review, index) => (
          <div key={index} className="review-container">
            <input
              type="text"
              name="review"
              value={review.review}
              onChange={(e) => handleChange(index, e)}
              placeholder="Review"
              className="form-input"
            />
            <textarea
              name="details"
              value={review.details}
              onChange={(e) => handleChange(index, e)}
              placeholder="Review Details"
              className="form-textarea"
            />
            <button
              type="button"
              onClick={() => removeReview(index)}
              className="btn remove-btn"
            >
              Remove
            </button>
          </div>
        ))}

        <div className='mt-3'>
          <button type="button" onClick={addReview} className="btn">Add Review</button>
          <button type="submit" className="btn">Save Ratings</button>
          <button type="button" onClick={onClose} className="btn cancel-btn">Cancel</button>
        </div>
      </form>
    </Modal>
  );
};

export default RatingModal;
