import React from 'react'
import { Route, Redirect, Navigate } from 'react-router-dom';
import { isAuthenticated } from '.';


const PrivateRoute = ({ component: Component, ...rest }) => {
    let auth = isAuthenticated();
    return (
        <Route
            {...rest}
            render={ 
                props =>
                auth ? 
                (<Component {...props}/>) : 
                (
                    <Navigate to="/signin" />
                    // <Redirect 
                    //     to = {{
                    //         pathname: "/signin",
                    //         state: { from: props.location }
                    //     }}
                    // />
                )
            }
        />
    );
}

export default PrivateRoute;