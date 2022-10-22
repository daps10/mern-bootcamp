import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from './index';


const PrivateRoute = ({ children }) => {
    const { pathname } = useLocation();
    let auth = isAuthenticated();
    
    return (  auth !== "undefined")  ? (
        children
    ) : (
        <Navigate to="/signin" state={{ from: pathname }} replace />
    );
}

export default PrivateRoute;