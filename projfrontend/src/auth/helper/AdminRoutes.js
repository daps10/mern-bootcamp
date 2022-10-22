import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { getUserData, isAuthenticated } from '.';


const AdminRoute = ({ children }) => {
    const { pathname } = useLocation();
    let userData = getUserData();
    let auth = isAuthenticated();
    
    return ( auth !== "undefined" && userData.role === 1) ? (
        children
    ) : (
        <Navigate to="/signin" state={{ from: pathname }} replace />
    );
}

export default AdminRoute;