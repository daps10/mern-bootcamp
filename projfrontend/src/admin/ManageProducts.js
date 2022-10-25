import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Base from '../core/Base';
import { getAllProducts,deleteProduct } from './helper/adminapicall';

const ManageProducts = () => {
    // run the preload function to fetch all the products
    useEffect(() => {
      preload();
    }, []);

    const [products, setProducts] = useState([]);
    
    // Fetch all products
    const preload = async () => {
        const response = await getAllProducts();
        if(response.status === 200){
            setProducts(response.response);
        } else {
            console.log("error data :: ", response.message);
        }    
    }

    // delete products
    const deleteThisProduct = async ( id ) => {
        const response = await deleteProduct(id);
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
                    <h2 className="text-center text-white my-3">Total 3 products</h2>

                    { products.map((res, index) => {
                        return  (
                            <div key={ index } className="row text-center mb-2 ">
                                <div className="col-4">
                                    <h3 className="text-white text-left">{ res.name }</h3>
                                </div>
                                <div className="col-4">
                                    <Link
                                        className="btn btn-success"
                                        to={`/admin/product/${res._id}`}
                                    >
                                        <span className="">Update</span>
                                    </Link>
                                </div>
                                <div className="col-4">
                                    <button onClick={() => {  
                                        deleteThisProduct(res._id);
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

export default ManageProducts;