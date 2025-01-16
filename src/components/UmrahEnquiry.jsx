import { useEffect, useState } from 'react';
import axios from 'axios';
import user from '../assets/Images/user.png'

const UmrahEnquiry = () => {
  const [enquiries, setEnquiries] = useState([]);
  console.log(enquiries);
  

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await axios.get('https://zeal-tourisam-backend.vercel.app/api/enquire/umrahEnquire');
        // Extract the `data` array from the response
        setEnquiries(response.data.results);
        console.log(response.data.results);
        
      } catch (error) {
        console.error('Error fetching enquiries:', error);
      }
    };

    fetchEnquiries();
  }, []);

  

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Enquiries
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {enquiries.map((enquiry) => (
          <div
            key={enquiry._id}
            className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center text-center"
          >
            <img
              src={user}
              alt="User Avatar"
              className="w-24 h-24 rounded-full mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-700">{enquiry.name}</h2>
            <p className="text-gray-500">{enquiry.Email}</p>
            <p className="text-gray-500">{enquiry.mobile}</p>
            <p className="text-gray-600 font-medium mt-2">{enquiry.Category}</p>
            <p className="text-gray-600">
              Date of Travel:{' '}
              <span className="text-gray-800 font-semibold">
                {new Date(enquiry.date).toLocaleDateString()}
              </span>
            </p>
            <p className="text-gray-600">Nationality: {enquiry.nationality}</p>
            <p className="text-gray-600 italic mt-2">{enquiry.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UmrahEnquiry;
