import { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        right: 'auto',
        width: '90%',
        height: '90%',
        maxWidth: '650px',
        padding: '20px',
        borderRadius: '9px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
};

// eslint-disable-next-line react/prop-types
const ItineraryForm = ({ isOpen, onSubmit, onClose }) => {
    const [formData, setFormData] = useState([
        {
            place: 'ert',
            description: 'ddfgfg',
            ItineraryDay: 'dfgdg',
            ItineraryDate: 'dfgfg',
            HotelDetails: { Hoteltitle: 'dfgdfg', image: null, location: 'dfgdf', roomType: 'dfg', checkIn: 'dfg', checkout: 'dfg' },
            TransportDetails: { Transporttitle: 'dfgdfg', image: null, from: 'dgfdgf', to: 'dfgdg', time: { timeTitle: 'dfgdgf', time: 'dgf' } },
        },
    ]);

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        console.log(value);
        

        setFormData((prev) =>
            prev.map((item, i) =>
                i === index
                    ? name in item.HotelDetails
                        ? {
                            ...item,
                            HotelDetails: {
                                ...item.HotelDetails,
                                [name]: value,
                            },
                        }
                        : name in item.TransportDetails
                            ? {
                                ...item,
                                TransportDetails: {
                                    ...item.TransportDetails,
                                    [name]: name === 'time' || name === 'timeTitle'
                                        ? {
                                            ...item.TransportDetails.time,
                                            [name]: value,
                                        }
                                        : value,
                                },
                            }
                            : { ...item, [name]: value }
                    : item
            )
        );
    };


    const handleImageChange = (index, type, event) => {
        const file = event.target.files[0]; // Get the first selected file
        setFormData((prev) =>
            prev.map((item, i) =>
                i === index
                    ? type === 'hotel'
                        ? {
                            ...item,
                            HotelDetails: {
                                ...item.HotelDetails,
                                image: file,
                            },
                        }
                        : type === 'transport'
                            ? {
                                ...item,
                                TransportDetails: {
                                    ...item.TransportDetails,
                                    image: file,
                                },
                            }
                            : item
                    : item
            )
        );
    };
    


    const addDetail = () => {
        setFormData((prev) => [
            ...prev,
            {
                place: '',
                description: '',
                ItineraryDay: '',
                ItineraryDate: '',
                HotelDetails: { Hoteltitle: '', image: null, location: '', roomType: '', checkIn: '', checkout: '' },
                TransportDetails: { Transporttitle: '', image: null, from: '', to: '', time: { timeTitle: '', time: '' } },
            },
        ]);
    };

    const removeDetail = (index) => {
        setFormData((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);

        const formattedData = formData.map((detail) => ({
            ...detail,
            HotelDetails: {
                ...detail.HotelDetails,
                image: detail.HotelDetails.image ? detail.HotelDetails.image.name : null,
            },
            TransportDetails: {
                ...detail.TransportDetails,
                image: detail.TransportDetails.image ? detail.TransportDetails.image.name : null,
            },
        }));
        onSubmit(formattedData); // Pass the form data to the parent component
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Itinerary Modal" style={customStyles}>
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">Itinerary Information</h2>
                <form onSubmit={handleSubmit}>
                    {formData.map((detail, index) => (
                        <div key={index} className="form-card mb-6 border p-4 rounded shadow">
                            <h6 className="font-bold">Place</h6>
                            <input
                                type="text"
                                name="place"
                                value={detail.place}
                                onChange={(e) => handleChange(index, e)}
                                placeholder="Place"
                                className="form-input"
                                style={{ width: '100%', margin: '10px 0', padding: '5px' }}
                            />
                            <h6 className="font-bold">Description</h6>
                            <textarea
                                name="description"
                                value={detail.description}
                                onChange={(e) => handleChange(index, e)}
                                placeholder="Description"
                                className="form-textarea"
                                style={{ width: '100%', margin: '10px 0', padding: '5px' }}
                            />
                            <h6 className="font-bold">Day</h6>
                            <input
                                type="text"
                                name="ItineraryDay"
                                value={detail.ItineraryDay}
                                onChange={(e) => handleChange(index, e)}
                                placeholder="Day in Word"
                                className="form-input"
                                style={{ width: '100%', margin: '10px 0', padding: '5px' }}
                            />
                            <h6 className="font-bold">Date</h6>
                            <input
                                type="date"
                                name="ItineraryDate"
                                value={detail.ItineraryDate}
                                onChange={(e) => handleChange(index, e)}
                                placeholder="Date"
                                className="form-input"
                                style={{ width: '100%', margin: '10px 0', padding: '5px' }}
                            />
                            <h6 className="font-bold">Hotel Details</h6>
                            <input
                                type="text"
                                name="Hoteltitle"
                                value={detail.HotelDetails.Hoteltitle}
                                onChange={(e) => handleChange(index, e)}
                                placeholder="Hotel Title"
                                className="form-input"
                                style={{ width: '100%', margin: '10px 0', padding: '5px' }}
                            />
                            <input
                                type="file"
                                onChange={(e) => handleImageChange(index, 'hotel', e)}
                                className="form-input"
                                style={{ width: '100%', margin: '10px 0', padding: '5px' }}
                            />
                            <input
                                type="text"
                                name="location"
                                value={detail.HotelDetails.location}
                                onChange={(e) => handleChange(index, e)}
                                placeholder="Location"
                                className="form-input"
                                style={{ width: '100%', margin: '10px 0', padding: '5px' }}
                            />
                            <input
                                type="text"
                                name="roomType"
                                value={detail.HotelDetails.roomType}
                                onChange={(e) => handleChange(index, e)}
                                placeholder="Room Type"
                                className="form-input"
                                style={{ width: '100%', margin: '10px 0', padding: '5px' }}
                            />
                            <input
                                type="text"
                                name="checkIn"
                                value={detail.HotelDetails.checkIn}
                                onChange={(e) => handleChange(index, e)}
                                placeholder="Check-In"
                                className="form-input"
                                style={{ width: '100%', margin: '10px 0', padding: '5px' }}
                            />
                            <input
                                type="text"
                                name="checkout"
                                value={detail.HotelDetails.checkout}
                                onChange={(e) => handleChange(index, e)}
                                placeholder="Check-Out"
                                className="form-input"
                                style={{ width: '100%', margin: '10px 0', padding: '5px' }}
                            />

                            <h6 className="font-bold">Transport Details</h6>
                            <input
                                type="text"
                                name="Transporttitle"
                                value={detail.TransportDetails.Transporttitle}
                                onChange={(e) => handleChange(index, e)}
                                placeholder="Transport Title"
                                className="form-input"
                                style={{ width: '100%', margin: '10px 0', padding: '5px' }}
                            />
                            <input
                                type="file"
                                onChange={(e) => handleImageChange(index, 'transport', e)}
                                className="form-input"
                                style={{ width: '100%', margin: '10px 0', padding: '5px' }}
                            />
                            <input
                                type="text"
                                name="from"
                                value={detail.TransportDetails.from}
                                onChange={(e) => handleChange(index, e)}
                                placeholder="From"
                                className="form-input"
                                style={{ width: '100%', margin: '10px 0', padding: '5px' }}
                            />
                            <input
                                type="text"
                                name="to"
                                value={detail.TransportDetails.to}
                                onChange={(e) => handleChange(index, e)}
                                placeholder="To"
                                className="form-input"
                                style={{ width: '100%', margin: '10px 0', padding: '5px' }}
                            />

                            <div className="flex">
                                <input
                                    type="time"
                                    name="time"
                                    value={detail.TransportDetails.time?.time || ''}
                                    onChange={(e) => handleChange(index, e)}
                                    placeholder="Time"
                                    className="form-input"
                                    style={{ width: '70%', margin: '10px 0', padding: '5px' }}
                                />
                                <select
                                    name="timeTitle"    
                                    // value={detail?.TransportDetails?.time?.timeTitle || ''}
                                    onChange={(e) => handleChange(index, e)}
                                    className="form-select"
                                    style={{ width: '30%', margin: '10px 0', padding: '5px' }}
                                >
                                    <option value="AM">AM</option>
                                    <option value="PM">PM</option>
                                </select>
                            </div>


                            <button
                                type="button"
                                onClick={() => removeDetail(index)}
                                className="btn bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
                            >
                                Remove Detail
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addDetail}
                        className="btn bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4"
                    >
                        Add Detail
                    </button>
                    <button
                        type="submit"
                        className="btn bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4 mt-4"
                    >
                        Save Itinerary
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="btn bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-4 mt-4"
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </Modal>
    );
};

export default ItineraryForm;
