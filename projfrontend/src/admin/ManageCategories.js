import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Base from '../core/Base';
import { deleteCategory, getAllCategories } from './helper/adminapicall';

const ManageCategories = () => {
    // run the preload function to fetch all the categories
    useEffect(() => {
      preload();
    }, []);

    const [categories, setCategories] = useState([]);
    
    // Fetch all categories
    const preload = async () => {
        const response = await getAllCategories();
        if(response.status === 200){
            setCategories(response.response);
        } else {
            console.log("error data :: ", response.message);
        }    
    }

    // delete category by id
    const deleteThisCategory = async ( id ) => {
        const response = await deleteCategory(id);
        if(response.status === 200){
            preload();
        } else {
            console.log("error data :: ", response.message);
        }
    }

    return (
        <Base title="Welcome admin" description="Manage products here">
            <h2 className="mb-4">All products:</h2>
            <Link className="btn btn-info" to={`/admin/dashboard`}>
                <span className="">Admin Home</span>
            </Link>
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center text-white my-3">Total {categories.length} categories</h2>

                    { categories.map((res, index) => {
                        return  (
                            <div key={ index } className="row text-center mb-2 ">
                                <div className="col-4">
                                    <h3 className="text-white text-left">{ res.name }</h3>
                                </div>
                                <div className="col-4">
                                    <Link
                                        className="btn btn-success"
                                        to={`/admin/category/${res._id}`}
                                    >
                                        <span className="">Update</span>
                                    </Link>
                                </div>
                                <div className="col-4">
                                    <button onClick={() => {  
                                        deleteThisCategory(res._id);
                                    }} className="btn btn-danger">
                                        Delete 
                                    </button>
                                </div>
                            </div>
                        )
                    }) }

                </div>
            </div>
        </Base>
    )
}

export default ManageCategories;
