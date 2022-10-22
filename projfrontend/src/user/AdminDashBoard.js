import React from 'react'
import { Link } from 'react-router-dom';
import { getUserData } from '../auth/helper';
import Base from '../core/Base';

const AdminDashboard = ( ) => {
    const { 
        name, 
        email, 
        role 
    } = getUserData();

    // Admin left side
    const adminLeftSide = () => {
        return (
            <div className="card">
                <h4 className='card-header bg-dark text-white'> Admin Navigation </h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className='nav-link text-success' to="/admin/create/category" >Create Categories</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className='nav-link text-success' to="/admin/create/product">Create Product</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className='nav-link text-success' to="/admin/products">Manage Products</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className='nav-link text-success' to="/admin/orders">Manage Orders</Link>
                    </li>
                </ul>
            </div>
        )
    }

    // Admin right side
    const adminRightSide = () => {
        
    }

    return (
        <>
            <Base 
                title='Welcome to admin dashboard' 
                description='Manage all of your products here!'
                className='container bg-success p-4'
            >
                <div className="row">
                    <div className="col-3">
                        { adminLeftSide() }
                    </div>
                    <div className="col-9">
                        { adminRightSide() }
                    </div>
                </div>
                
            </Base>
        </>
    )
}

export default AdminDashboard;
