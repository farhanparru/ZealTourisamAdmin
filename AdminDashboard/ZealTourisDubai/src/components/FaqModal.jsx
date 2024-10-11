import React, { useState } from 'react';
import Modal from 'react-modal';

const FaqModal = ({ isOpen, onClose, onSubmit, holidayData }) => {
  const [faqData, setFaqData] = useState(holidayData?.faq || [{ question: '', answer: '' }]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedFaqs = [...faqData];
    updatedFaqs[index] = { ...updatedFaqs[index], [name]: value };
    setFaqData(updatedFaqs);
  };

  const addFaq = () => {
    setFaqData([...faqData, { question: '', answer: '' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(faqData); // Pass data to parent component
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="FAQ Modal">
      <h2>FAQs</h2>
      <form onSubmit={handleSubmit}>
        {faqData.map((faq, index) => (
          <div key={index}>
            <input
              type="text"
              name="question"
              value={faq.question}
              onChange={(e) => handleChange(index, e)}
              placeholder="Question"
              className="form-input"
            />
            <textarea
              name="answer"
              value={faq.answer}
              onChange={(e) => handleChange(index, e)}
              placeholder="Answer"
              className="form-textarea"
            />
          </div>
        ))}
        <div className='mt-3'>
          <button type="button" onClick={addFaq} className="btn">Add FAQ</button>
          <button type="submit" className="btn">Save FAQs</button>
          <button type="button" onClick={onClose} className="btn cancel-btn">Cancel</button>
        </div>
      </form>
    </Modal>
  );
};

export default FaqModal;
