import React from 'react'
import { Route, Redirect, Navigate } from 'react-router-dom';
import { isAuthenticated } from '.';


const AdminRoute = ({ component: Component, ...rest }) => {
    let auth = isAuthenticated();
    return (
        <Route
            {...rest}
            render = { 
                props =>
                auth && auth.role == 1 ? 
                (<Component {...props}/>) : 
                (
                    <Navigate to="/signin" />
                )
            }
        />
    );
}

export default AdminRoute;