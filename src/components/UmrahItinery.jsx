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
const ItineraryForm = ({ isOpen, onSubmit, onClose, setItineraryImages, itineraryData }) => {
    const [formData, setFormData] = useState({
        // eslint-disable-next-line react/prop-types
        title: itineraryData?.title || '',
        // eslint-disable-next-line react/prop-types
        description: itineraryData?.description || '',
        // eslint-disable-next-line react/prop-types
        place: itineraryData?.place || '',
        // eslint-disable-next-line react/prop-types
        dayDetails: itineraryData?.dayDetails || '',
        // eslint-disable-next-line react/prop-types
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
        <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="BookingPolicy Modal" style={customStyles}>
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">Itinerary Information</h2>
                <form onSubmit={handleSubmit} className="itinerary-form">
                    {/* <div className="form-card"> */}
                    {/* <div className="form-content"> */}
                    <h6 className='font-bold'>Title</h6>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Title"
                        className="form-input"
                        style={{ width: "100%", margin:"10px 10px 10px 0px" , padding:"5px 5px 5px 5px"}}
                    />
                    <h6 className='font-bold'>Description</h6>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Description"
                        className="form-textarea"
                        style={{ width: "100%", margin:"10px 10px 10px 0px" , padding:"5px 5px 5px 5px"}}
                        />
                    <h6 className='font-bold'>Place</h6>

                    <input
                        type="text"
                        name="place"
                        value={formData.place}
                        onChange={handleChange}
                        placeholder="Place"
                        className="form-input"
                        style={{ width: "100%", margin:"10px 10px 10px 0px" , padding:"5px 5px 5px 5px"}}
                    />
                    <h6 className='font-bold'>Day Details</h6>
                    <textarea
                        type="text"
                        name="dayDetails"
                        value={formData.dayDetails}
                        onChange={handleChange}
                        placeholder="Day Details"
                        className="form-input"
                        style={{ width: "100%", margin:"10px 10px 10px 0px" , padding:"5px 5px 5px 5px"}}
                        />
                    {/* </div> */}
                    {/* </div> */}

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
                                    style={{ width: "100%", margin:"10px 10px 10px 0px" , padding:"5px 5px 5px 5px"}}
                                />
                                <input
                                    type="file"
                                    onChange={(e) => handleImageChange(index, e)}
                                    className="form-input"
                                    style={{ width: "100%" }}
                                />
                                <input
                                    type="text"
                                    name="category"
                                    value={detail.category}
                                    onChange={(e) => handleChange(e, index)}
                                    placeholder="Category"
                                    className="form-input"
                                    style={{ margin:"10px 10px 10px 0px" , padding:"5px 5px 5px 5px"}}
                                />
                                <input
                                    type="text"
                                    name="location"
                                    value={detail.location}
                                    onChange={(e) => handleChange(e, index)}
                                    placeholder="Location"
                                    className="form-input"
                                    style={{ margin:"10px 10px 10px 0px" , padding:"5px 5px 5px 5px"}}
                                />
                                <input
                                    type="text"
                                    name="room"
                                    value={detail.room}
                                    onChange={(e) => handleChange(e, index)}
                                    placeholder="Room"
                                    className="form-input"
                                    style={{ margin:"10px 10px 10px 0px" , padding:"5px 5px 5px 5px"}}
                                />
                                <input
                                    type="text"
                                    name="checkIn"
                                    value={detail.checkIn}
                                    onChange={(e) => handleChange(e, index)}
                                    placeholder="Check-in"
                                    className="form-input"
                                    style={{ margin:"10px 10px 10px 0px" , padding:"5px 5px 5px 5px"}}
                                />
                                <input
                                    type="text"
                                    name="checkout"
                                    value={detail.checkout}
                                    onChange={(e) => handleChange(e, index)}
                                    placeholder="Check-out"
                                    className="form-input"
                                    style={{ margin:"10px 10px 10px 0px" , padding:"5px 5px 5px 5px"}}
                                />
                                <button
                                    type="button"
                                    onClick={() => removeDetail(index)}
                                    className="btn bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-6 mb-4">
                                    Remove Detail
                                </button>
                            </div>
                        </div>
                    ))}

                    <button type="button" onClick={addDetail} className="btn bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                        Add Detail
                    </button>
                    <button type="submit" className="btn bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4">
                        Save Itinerary
                    </button>
                    <button type="button" onClick={onClose} className="btn bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-4">
                        Cancel
                    </button>
                </form>
            </div>
        </Modal>
    );
};

export default ItineraryForm;