import React from 'react'
import {
  BrowserRouter,
  Routes as Router,
  Route
} from "react-router-dom";
import Home from './core/Home';
import Signin from './user/Signin';
import Signup from './user/Signup';
import UserDashBoard from './user/UserDashBoard';
import AdminDashBoard from './user/AdminDashBoard';
import PrivateRoute from './auth/helper/PrivateRoutes';
import AdminRoute from './auth/helper/AdminRoutes';
import AddCategory from './admin/AddCategory';
import ManageCategories from './admin/ManageCategories';


const Routes = () => {
    return (
        <BrowserRouter>
            <Router>
                <Route exact path="/" element={<Home/>} />
                <Route exact path="/signup" element={<Signup/>} />
                <Route exact path="/signin" element={<Signin/>} />
            
                <Route path="/user/dashboard" element={
                    <PrivateRoute>
                        <UserDashBoard />
                    </PrivateRoute>
                }/>
                
                
                <Route path="/admin/dashboard" element={
                    <AdminRoute>
                        <AdminDashBoard/>
                    </AdminRoute>
                }/>

                <Route path="/admin/create/category" element={
                    <AdminRoute>
                        <AddCategory/>      
                    </AdminRoute>
                }/>

                <Route path="/admin/categories" element={
                    <AdminRoute>
                        <ManageCategories/>      
                    </AdminRoute>
                }/>
            </Router>
        </BrowserRouter>
    )
}

export default Routes;