import React, { useState } from 'react';
import Modal from 'react-modal';

const BookingPolicyModal = ({ isOpen, onClose, onSubmit, holidayData }) => {
  const [bookingPolicy, setBookingPolicy] = useState({
    cancellation: holidayData?.bookingPolicy?.cancellation || '',
    childPolicy: holidayData?.bookingPolicy?.childPolicy || '',
    otherPolicies: holidayData?.bookingPolicy?.otherPolicies || [{ title: '', description: '' }],
  });

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    if (name === "cancellation" || name === "childPolicy") {
      setBookingPolicy({ ...bookingPolicy, [name]: value });
    } else {
      const updatedPolicies = [...bookingPolicy.otherPolicies];
      updatedPolicies[index] = { ...updatedPolicies[index], [name]: value };
      setBookingPolicy({ ...bookingPolicy, otherPolicies: updatedPolicies });
    }
  };

  const addOtherPolicy = () => {
    setBookingPolicy({
      ...bookingPolicy,
      otherPolicies: [...bookingPolicy.otherPolicies, { title: '', description: '' }],
    });
  };

  const removeOtherPolicy = (index) => {
    const updatedPolicies = bookingPolicy.otherPolicies.filter((_, i) => i !== index);
    setBookingPolicy({ ...bookingPolicy, otherPolicies: updatedPolicies });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(bookingPolicy); // Pass data to parent component
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Booking Policy Modal">
      <h2>Booking Policy</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          name="cancellation"
          value={bookingPolicy.cancellation}
          onChange={handleChange}
          placeholder="Cancellation Policy"
          className="form-textarea"
        />
        <textarea
          name="childPolicy"
          value={bookingPolicy.childPolicy}
          onChange={handleChange}
          placeholder="Child Policy"
          className="form-textarea"
        />

        <h3>Other Policies</h3>
        {bookingPolicy.otherPolicies.map((policy, index) => (
          <div key={index} className="policy-container">
            <input
              type="text"
              name="title"
              value={policy.title}
              onChange={(e) => handleChange(index, e)}
              placeholder="Policy Title"
              className="form-input"
            />
            <textarea
              name="description"
              value={policy.description}
              onChange={(e) => handleChange(index, e)}
              placeholder="Policy Description"
              className="form-textarea"
            />
            <button
              type="button"
              onClick={() => removeOtherPolicy(index)}
              className="btn remove-btn"
            >
              Remove Policy
            </button>
          </div>
        ))}

        <div className='mt-3'>
          <button type="button" onClick={addOtherPolicy} className="btn">Add Policy</button>
          <button type="submit" className="btn">Save Policy</button>
          <button type="button" onClick={onClose} className="btn cancel-btn">Cancel</button>
        </div>
      </form>
    </Modal>
  );
};

export default BookingPolicyModal;
