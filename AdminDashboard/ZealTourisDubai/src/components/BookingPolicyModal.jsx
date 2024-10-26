import React, { useState } from 'react';
import Modal from 'react-modal';

const BookingPolicyModal = ({ isOpen, onClose, onSubmit, holidayData }) => {
  const [bookingPolicy, setBookingPolicy] = useState({
    cancellation: holidayData?.bookingPolicy?.cancellation || '',
    childPolicy: holidayData?.bookingPolicy?.childPolicy || '',
    otherPolicies: holidayData?.bookingPolicy?.otherPolicies || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingPolicy({ ...bookingPolicy, [name]: value });
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
        <textarea
          name="otherPolicies"
          value={bookingPolicy.otherPolicies}
          onChange={handleChange}
          placeholder="Other Policies"
          className="form-textarea"
        />
        <div className='mt-3'>

          <button type="submit" className="btn">Save Policy</button>
          <button type="button" onClick={onClose} className="btn cancel-btn">Cancel</button>
        </div>

      </form>
    </Modal>
  );
};

export default BookingPolicyModal;
