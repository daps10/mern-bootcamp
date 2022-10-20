import React from 'react'
import {
  BrowserRouter,
  Routes as Router,
  Route
} from "react-router-dom";
import Home from './core/Home';
import Signin from './user/Signin';
import Signup from './user/Signup';

const Routes = () => {
    return (
        <BrowserRouter>
            <Router>
                <Route exact path="/" element={<Home/>} />
            </Router>
            <Router>
                <Route exact path="/signup" element={<Signup/>} />
            </Router>
            <Router>
                <Route exact path="/signin" element={<Signin/>} />
            </Router>
        </BrowserRouter>
    )
}

export default Routes;