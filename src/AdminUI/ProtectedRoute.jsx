import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import baseUrl from '../../contants/baseUrl';

const ProtectedRoute = ({ children }) => {
   const [isAuthenticated, setIsAuthenticated] = useState(null);
   const token = localStorage.getItem('adminToken');

   useEffect(() => {
      const checkAuth = async () => {
         try {
            const response = await axios.get(baseUrl + '/admin/protected', {
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
      return <Navigate to="/login" />;
   }

   return children;
};

export default ProtectedRoute;