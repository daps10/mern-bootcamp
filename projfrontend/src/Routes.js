import React from 'react'
import {
  BrowserRouter,
  Routes as Router,
  Route
} from "react-router-dom";
import Home from './core/Home';

const Routes = () => {
    return (
        <BrowserRouter>
            <Router>
                <Route exact path="/" element={<Home/>} />
            </Router>
        </BrowserRouter>
    )
}

export default Routes;