// eslint-disable-next-line no-unused-vars
import React,{useState} from 'react';
import logo from '../assets/Images/Logon bar.png'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AdminLogin = () => {
const [username,setUsername] = useState('')
const [password,setPassword] = useState('')
const [errorMessage,setErrorMessage] = useState('')
const navigate = useNavigate()

// handle login Submission

const handleLogin = async (e)=>{
  e.preventDefault(); // Prevent page reload on form submission
  setErrorMessage(''); // Reset error message before submitting

  try {
    const response = await axios.post('http://localhost:3002/api/admin/login', {
      username,
      password
    });
    

    console.log(response);
    
    if (response.data.success) {
      // Store the JWT token in localStorage
      localStorage.setItem('adminToken', response.data.token);
      toast.success("Admin Login Successfully")
      // Redirect to admin dashboard or any other page after successful login
      navigate('/Dashboard');
    }
  } catch (error) {
    if (error.response && error.response.data.message) {
      // Set the error message returned from the server
      setErrorMessage(error.response.data.message);
    } else {
     console.log(error);
     
    }
  }
}

  
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url(https://img.freepik.com/premium-photo/world-tourism-background_1102-5029.jpg?w=1060)' }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
      <div className="flex justify-center items-center h-full">
        <div className="relative z-10 bg-white bg-opacity-90 p-8 rounded-lg shadow-lg max-w-md w-full">
          
          {/* Company Logo */}
          <div className="flex justify-center mb-4">
            <img 
              src={logo} 
              alt="Zeal Tourism Dubai Logo" 
              className="w-20 h-20 object-contain" 
            />
          </div>

          {/* Company Name */}
          <h1 className="text-3xl font-bold text-center text-orange-500 mb-6">
            ZealTourismDubai
          </h1>

          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Login Your Account</h2>

    {/* Error Message */}
    {errorMessage && (
            <div className="mb-4 text-center text-red-500">
              {errorMessage}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-gray-700 mb-1" htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-orange-400"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)} // Update username state
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-orange-400"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update password state
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="staySignedIn"
                  className="mr-2"
                />
                <label htmlFor="staySignedIn" className="text-gray-700">Stay Signed In</label>
              </div>
              
              <Link to="/forgot"><a href="#" className="text-sm text-orange-500 hover:underline">Forgot Password?</a></Link>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition duration-300"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
