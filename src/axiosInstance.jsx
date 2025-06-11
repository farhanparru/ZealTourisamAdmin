import axios from 'axios';

// Function to fetch data from a protected route
const fetchProtectedData = async () => {
    const token = localStorage.getItem('adminToken'); // Retrieve the token from localStorage

    try {
        const response = await axios.get('https://zeal-tourisam-api.vercel.app/api/admin/protected', {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the header
            },
        });

 
        console.log(response.data);
    } catch (error) {
        // Handle error (e.g., unauthorized access)
        console.error('Error fetching protected data', error);
    }
};

// Call the function to fetch data
fetchProtectedData();
