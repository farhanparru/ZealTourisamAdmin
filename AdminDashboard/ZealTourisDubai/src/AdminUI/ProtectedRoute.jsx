// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Navigate } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({children}) => {

const token = localStorage.getItem('adminToken')
// console.log(token);

 // If token is not available, redirect to login
 if(!token){
    return <Navigate to="/" />
 }

     // Otherwise, render the children (protected content)
  return children
    
}

export default ProtectedRoute
