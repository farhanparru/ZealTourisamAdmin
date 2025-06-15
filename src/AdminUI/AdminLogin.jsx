// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logoImage from '../assets/Images/image.png';
import { motion, AnimatePresence } from 'framer-motion';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();

  const backgroundImages = [
    'https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    'https://images.unsplash.com/photo-1517825738774-7de9363ef735?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % backgroundImages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      const response = await axios.post('https://zeal-tourisam-api.vercel.app/api/admin/login', {
        username,
        password
      });

      if (response.data.success) {
        localStorage.setItem('adminToken', response.data.token);
        toast.success("Login successful");
        navigate('/Dashboard');
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden relative">
      {/* Animated background images */}
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentImage}
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${backgroundImages[currentImage]})`,
            backgroundAttachment: 'fixed'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </motion.div>
      </AnimatePresence>
      
      {/* Floating UAE elements */}
      <motion.div 
        className="absolute top-10 left-10 opacity-20"
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#E30A17"/>
          <path d="M12 2C6.47715 2 2 6.47715 2 12H12V2Z" fill="#00732F"/>
          <path d="M12 2V12H22C22 6.47715 17.5228 2 12 2Z" fill="black"/>
        </svg>
      </motion.div>
      
      <motion.div 
        className="absolute bottom-20 right-20 opacity-20"
        animate={{
          y: [0, 20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      >
        <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#E30A17"/>
          <path d="M12 2C6.47715 2 2 6.47715 2 12H12V2Z" fill="#00732F"/>
          <path d="M12 2V12H22C22 6.47715 17.5228 2 12 2Z" fill="black"/>
        </svg>
      </motion.div>

      <div className="relative z-10 w-full max-w-md px-4">
        {/* Login Card */}
        <motion.div 
          className="bg-white bg-opacity-90 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Card header with image */}
          <div className="h-40 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-red-500 opacity-90"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                className="text-white text-4xl font-bold tracking-wider"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                DUBAI
              </motion.div>
            </div>
            <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black to-transparent">
              <div className="flex justify-center -mt-16">
                <motion.div 
                  className="h-24 w-24 rounded-full border-4 border-white bg-white shadow-lg flex items-center justify-center overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img 
                    src={logoImage} 
                    alt="Zeal Tourism Logo" 
                    className="h-full w-full object-contain p-1" 
                  />
                </motion.div>
              </div>
              <h2 className="mt-2 text-center text-2xl font-bold text-white">
                Zeal Tourism Dubai
              </h2>
              <p className="text-center text-sm text-blue-100">
                Admin Portal
              </p>
            </div>
          </div>

          {/* Card body */}
          <div className="p-6 sm:p-8">
            <AnimatePresence>
              {errorMessage && (
                <motion.div 
                  className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-center text-sm"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {errorMessage}
                </motion.div>
              )}
            </AnimatePresence>

            <form className="space-y-5" onSubmit={handleLogin}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm transition duration-200"
                    placeholder="admin.username"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm transition duration-200"
                    placeholder="••••••••"
                  />
                </div>
              </motion.div>

              <motion.div 
                className="flex items-center justify-between"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link to="/forgot" className="font-medium text-yellow-600 hover:text-yellow-500 transition duration-200">
                    Forgot password?
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-300"
                >
                  {isLoading ? (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : 'Sign in'}
                </button>
              </motion.div>
            </form>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div 
          className="mt-6 text-center text-sm text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          &copy; {new Date().getFullYear()} Zeal Tourism Dubai. All rights reserved.
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLogin;