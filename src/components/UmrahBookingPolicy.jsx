import  { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    right: 'auto',
    // bottom: 'auto',
    width: '90%',
    height: "90%",
    maxWidth: '650px',
    padding: '20px',
    borderRadius: '9px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
};


// eslint-disable-next-line react/prop-types
const UmrahBookingPolicyModal = ({ isOpen, onClose, onSubmit, umrahData }) => {
  const [bookingPolicy, setBookingPolicy] = useState({
    cancellation: umrahData?.bookingPolicy?.cancellation || 'asdasd',
    childPolicy: umrahData?.bookingPolicy?.childPolicy || 'asdasd',
    otherPolicies: umrahData?.bookingPolicy?.otherPolicies || [{ title: 'asdasd', description: 'asdasd' }],
    faq: umrahData?.bookingPolicy?.otherPolicies || [{ title: 'adsads', description: 'asdasd' }]
  });


  // Handle changes for title, description, and totalAmount

  const handleChange = (index, e, type = null) => {
    const { name, value } = e.target;

    if (name === "cancellation" || name === "childPolicy") {
      // Update top-level bookingPolicy properties
      setBookingPolicy(prevPolicy => ({ ...prevPolicy, [name]: value }));
    } else if (type === "otherPolicies") {
      // Update an item within bookingPolicy.otherPolicies
      setBookingPolicy(prevPolicy => {
        const updatedPolicies = [...prevPolicy.otherPolicies];
        updatedPolicies[index] = { ...updatedPolicies[index], [name]: value };
        return { ...prevPolicy, otherPolicies: updatedPolicies };
      });
    } else if (type === "faq") {
      // Update an item within bookingPolicy.faq
      setBookingPolicy(prevPolicy => {
        const updatedFaq = [...prevPolicy.faq];
        updatedFaq[index] = { ...updatedFaq[index], [name]: value };
        return { ...prevPolicy, faq: updatedFaq };
      });
    }
  };


  const addOtherPolicy = () => {
    setBookingPolicy({
      ...bookingPolicy,
      otherPolicies: [...bookingPolicy.otherPolicies, { title: '', description: '' }],
    });
  };

  const addFaq = () => {
    setBookingPolicy({
      ...bookingPolicy,
      faq: [...bookingPolicy.faq, { title: '', description: '' }],
    });
  };

  const removeOtherPolicy = (index) => {
    const updatedPolicies = bookingPolicy.otherPolicies.filter((_, i) => i !== index);
    setBookingPolicy({ ...bookingPolicy, otherPolicies: updatedPolicies });
  };

  const removeFaq = (index) => {
    const updatedPolicies = bookingPolicy.faq.filter((_, i) => i !== index);
    setBookingPolicy({ ...bookingPolicy, faq: updatedPolicies });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(bookingPolicy); // Pass data to parent component
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="BookingPolicy Modal" style={customStyles}>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Policy Details</h2>
        <form onSubmit={handleSubmit}>
          <h6 className='font-bold mb-4'>Cancellation Details</h6>
          <textarea
            name="cancellation"
            value={bookingPolicy.cancellation || ""}
            onChange={handleChange.bind(null, null)}
            placeholder="Cancellation Policy"
            style={{ width: "100%" }}
          />
          <h6 className='font-bold mb-4'>Child Policy Details</h6>
          <textarea
            name="childPolicy"
            value={bookingPolicy.childPolicy || ""}
            onChange={handleChange.bind(null, null)}
            placeholder="Child Policy"
            className="form-textarea"
            style={{ width: "100%" }}
          />
          <h6 className="font-bold mb-4">Other Policy Details</h6>
          {bookingPolicy.otherPolicies.map((policy, index) => (
            <div key={index} className="flex flex-col space-y-2 mb-4 border-b pb-2">
              <h6 className='font-bold'>Title</h6>
              <div className="flex flex-row space-x-2">
                <input
                  type="text"
                  name="title"
                  value={policy.title}
                  onChange={(e) => handleChange(index, e, "otherPolicies")}
                  placeholder="Policy Title"
                  className="form-input flex-1"
                />
                <button
                  type="button"
                  onClick={() => removeOtherPolicy(index)}
                  className="btn bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded"
                >
                  Remove
                </button>
              </div>
              <h6 className='font-bold'>Description</h6>
              <textarea
                name="description"
                value={policy.description}
                onChange={(e) => handleChange(index, e, "otherPolicies")}
                placeholder="Policy Description"
                className="form-textarea flex-1"
              />
            </div>
          ))}


          <h6 className="font-bold mb-4">FAQ</h6>
          {bookingPolicy.faq.map((data, index) => (
            <div key={index} className="flex flex-col space-y-2 mb-4 border-b pb-2">
              <h6 className='font-bold'>Title</h6>
              <div className="flex flex-row space-x-2">
                <input
                  type="text"
                  name="title"
                  value={data.title}
                  onChange={(e) => handleChange(index, e, "faq")}
                  placeholder="Faq Title"
                  className="form-input flex-1"
                />
                <button
                  type="button"
                  onClick={() => removeFaq(index)}
                  className="btn bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded"
                >
                  Remove
                </button>
              </div>
              <h6 className='font-bold'>Description</h6>
              <textarea
                name="description"
                value={data.description}
                onChange={(e) => handleChange(index, e, "faq")}
                placeholder="Faq Description"
                className="form-textarea flex-1"
              />
            </div>
          ))}

          <div className="mt-3 flex justify-end space-x-2">
            <button type="button" onClick={addFaq} className="btn bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Add Faq</button>
            <button type="button" onClick={addOtherPolicy} className="btn bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Add Other Policy</button>
            <button type="submit" className="btn bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Save Booking Policy
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

export default UmrahBookingPolicyModal;