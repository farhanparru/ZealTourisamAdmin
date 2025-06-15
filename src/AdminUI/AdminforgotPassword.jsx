// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import forgotlogo from '../assets/Images/forgotpassword.jpg';
import dubaiSkyline from '../assets/Images/Dubai-Skyline.jpg'; // Add this image
import uaeFlag from '../assets/Images/image.png'; // Add this image

const AdminForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 2000);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden">
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${dubaiSkyline})` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
      </motion.div>

      {/* Floating UAE Flag Elements */}
      <motion.div
        className="absolute top-20 left-10 opacity-20"
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <img src={uaeFlag} alt="UAE Flag" className="w-16 h-16" />
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-10 opacity-20"
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      >
        <img src={uaeFlag} alt="UAE Flag" className="w-20 h-20" />
      </motion.div>

      <motion.main
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="mt-7 bg-white bg-opacity-90 backdrop-blur-sm rounded-xl shadow-2xl dark:bg-gray-800 border-2 border-yellow-400 overflow-hidden">
          {/* Header with Dubai-themed gradient */}
          <div className="h-3 bg-gradient-to-r from-yellow-400 via-red-500 to-green-600"></div>
          
          <div className="p-6 sm:p-8 text-center">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <img
                src={forgotlogo}
                alt="Forgot Password"
                className="mx-auto mb-4 w-32 h-32 rounded-full border-4 border-white shadow-lg"
              />
            </motion.div>

            <motion.h1 
              className="block text-3xl font-bold text-gray-800 dark:text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Forgot password?
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Link to="/">
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Remember your password?{' '}
                  <span className="text-yellow-600 decoration-2 hover:underline font-medium transition-colors duration-200">
                    Login here
                  </span>
                </p>
              </Link>
            </motion.div>

            {isSubmitted ? (
              <motion.div
                className="mt-6 p-4 bg-green-50 text-green-700 rounded-lg"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring" }}
              >
                <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <p>Password reset link sent to your email!</p>
                <p className="text-sm mt-2">Check your inbox and follow the instructions.</p>
              </motion.div>
            ) : (
              <motion.div
                className="mt-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-y-4">
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <label
                        htmlFor="email"
                        className="block text-sm font-bold ml-1 mb-2 dark:text-white text-left"
                      >
                        Email address
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-yellow-500 focus:ring-yellow-500 shadow-sm transition duration-200"
                          required
                          aria-describedby="email-error"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                        </div>
                      </div>
                      <p
                        className="hidden text-xs text-red-600 mt-2"
                        id="email-error"
                      >
                        Please include a valid email address so we can get back to you
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-gradient-to-r from-yellow-500 to-red-500 text-white hover:from-yellow-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-all duration-300 shadow-md"
                      >
                        {isLoading ? (
                          <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          'Reset password'
                        )}
                      </button>
                    </motion.div>
                  </div>
                </form>
              </motion.div>
            )}
          </div>
        </div>

        <motion.div 
          className="mt-6 flex justify-center items-center text-center divide-x divide-gray-300 dark:divide-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <a
            className="pr-3.5 inline-flex items-center gap-x-2 text-sm text-gray-600 decoration-2 hover:underline hover:text-yellow-600 dark:text-gray-500 dark:hover:text-gray-200 transition-colors duration-200"
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              className="w-3.5 h-3.5"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>
            View Github
          </a>
          <a
            className="pl-3 inline-flex items-center gap-x-2 text-sm text-gray-600 decoration-2 hover:underline hover:text-yellow-600 dark:text-gray-500 dark:hover:text-gray-200 transition-colors duration-200"
            href="#"
          >
            Contact us!
          </a>
        </motion.div>
      </motion.main>
    </div>
  );
};

export default AdminForgotPassword;