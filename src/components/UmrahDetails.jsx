import { useState } from 'react';
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


const UmrahPackageDetails = ({ isOpen, onClose, onSubmit, umrahData }) => {
    const [packageDetails, setPackageDetails] = useState({
        Days: umrahData?.packageDetails?.Days || '2',
        Nights: umrahData?.packageDetails?.Nights || '1',
        Country: umrahData?.packageDetails?.Country || '1',
        Cities: umrahData?.packageDetails?.Cities || '3',
        TravelFrom: umrahData?.packageDetails?.TravelFrom || '',
        TravelTo: umrahData?.packageDetails?.TravelTo || '',
        TravelDate: umrahData?.packageDetails?.TravelDate || '',
        TravelTime: {
            time: umrahData?.packageDetails?.TravelTime?.time || '',
            timeTitle: umrahData?.packageDetails?.TravelTime?.timeTitle || 'AM',
        },
    });

    // Handle changes for title, description, and totalAmount

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'time' || name === 'timeTitle') {
            // Update nested TravelTime object
            setPackageDetails((prevDetails) => ({
                ...prevDetails,
                TravelTime: {
                    ...prevDetails.TravelTime,
                    [name]: value,
                },
            }));
        } else {
            // Update other fields
            setPackageDetails((prevDetails) => ({
                ...prevDetails,
                [name]: value,
            }));
        }
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(packageDetails); // Pass data to parent component
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="packageDetails Modal" style={customStyles}>
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">Policy Details</h2>
                <form onSubmit={handleSubmit}>
                    <h6 className='font-bold mb-4 mt-4'>Travel Starting Place</h6>
                    <input
                        name="TravelFrom"
                        type='text'
                        value={packageDetails.TravelFrom || ""}
                        onChange={(e) => handleChange(e)}
                        placeholder="Enter Place"
                        style={{ width: "100%" }}
                    />
                    <h6 className='font-bold mb-4 mt-4'>Travel Ending Place</h6>
                    <input
                        name="TravelTo"
                        type='text'
                        value={packageDetails.TravelTo || ""}
                        onChange={(e) => handleChange(e)}
                        placeholder="Enter Ending Place"
                        style={{ width: "100%" }}
                    />
                    <h6 className='font-bold mb-4 mt-4'>Travel Date</h6>
                    <input
                        name="TravelDate"
                        type='date'
                        value={packageDetails.TravelDate || ""}
                        onChange={(e) => handleChange(e)}
                        placeholder="Enter Traveling Date"
                        style={{ width: "100%" }}
                    />
                    <h6 className='font-bold mb-4 mt-4'>Travel Time</h6>
                    <div className="flex">

                        <input
                            name="time"
                            type='time'
                            value={packageDetails.TravelTime.time || ""}
                            onChange={(e) => handleChange(e)}
                            placeholder="How Many Country"
                            style={{ width: '70%', margin: '10px 0', padding: '5px' }}
                        />
                        <select
                            name="timeTitle"
                            onChange={(e) => handleChange(e)}
                            className="form-select"
                            style={{ width: '30%', margin: '10px 0', padding: '5px' }}
                        >
                            <option value="AM">AM</option>
                            <option value="PM">PM</option>
                        </select>                        
                        </div>

                    <h6 className='font-bold mb-4 mt-4'>How Many Days</h6>
                    <input
                        name="Days"
                        type='number'
                        value={packageDetails.Days || ""}
                        onChange={(e) => handleChange(e)}
                        placeholder="How Many Days"
                        style={{ width: "100%" }}
                    />
                    <h6 className='font-bold mb-4 mt-4'>How Many Night</h6>
                    <input
                        name="Nights"
                        type='number'
                        value={packageDetails.Nights || ""}
                        onChange={(e) => handleChange(e)}
                        placeholder="How Many Night"
                        style={{ width: "100%" }}
                    />
                    <h6 className='font-bold mb-4 mt-4'>How Many Cities</h6>
                    <input
                        name="Cities"
                        type='number'
                        value={packageDetails.Cities || ""}
                        onChange={(e) => handleChange(e)}
                        placeholder="How Many Cities"
                        style={{ width: "100%" }}
                    />
                    <h6 className='font-bold mb-4 mt-4'>How Many Country</h6>
                    <input
                        name="Country"
                        type='number'
                        value={packageDetails.Country || ""}
                        onChange={(e) => handleChange(e)}
                        placeholder="How Many Country"
                        style={{ width: "100%" }}
                    />

                    <div className="mt-3 flex justify-end space-x-2">
                        <button type="submit" className="btn bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                            Save Package Details
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

export default UmrahPackageDetails;