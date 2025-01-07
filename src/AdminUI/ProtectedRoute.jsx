// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';


// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
   const [isAuthenticated, setIsAuthenticated] = useState(null);
   const token = localStorage.getItem('adminToken');

   useEffect(() => {
      const checkAuth = async () => {
         try {
            const response = await axios.get('https://api.zealtourism.com/admin/protected', {
               headers: {
                  'x-access-token': token,
               },
            });
            if (response.status === 200) {
               setIsAuthenticated(true);
            } else {
               setIsAuthenticated(false);
            }
         } catch (error) {
            console.log(error);
            
            setIsAuthenticated(false);
         }
      };

      if (token) {
         checkAuth();
      } else {
         setIsAuthenticated(false);
      }
   }, [token]);

   if (isAuthenticated === null) {
      // You can return a loading spinner or null while the authentication check is in progress
      return <div>Loading...</div>;
   }

   if (!isAuthenticated) {
      return <Navigate to="/" />;
   }

   return children;
};

export default ProtectedRoute;