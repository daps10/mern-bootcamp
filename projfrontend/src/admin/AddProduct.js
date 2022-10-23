import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Base from '../core/Base';
import { 
    getAllCategories, 
    createProduct
} from './helper/adminapicall';

const AddProduct = () => {
    // call useEffect
    useEffect(async () => {
        await preload();
    }, [])
    
    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        photo: "",
        categories:[],
        category:"",
        loading: false,
        error:"",
        createdProduct:"",
        getRedirect: false,
        formData:""
    });

    const { 
        name, 
        description, 
        price, 
        stock, 
        photo, 
        categories, 
        category, 
        loading, 
        error, 
        createdProduct, 
        getRedirect, 
        formData 
    } = values;

    // preload the categories
    const preload = async () => {
        const response = await getAllCategories();
        if(response.status === 200){
            setValues({ 
                ...values,  
                categories: response.response, 
                formData: new FormData()
            });
        } else {
            setValues({ 
                ...values, 
                error: response.message
            });
        }
    }

    const onSubmit = async ( event ) => {
        event.preventDefault();

        setValues({ 
            ...values, 
            error: "", 
            loading: true 
        });
        
        // backend API call
        const response = await createProduct( formData );
        if(response.status !== 200){
            setValues({
                ...values,
                error: response.message,
                loading: false
            });
        } else {
            setValues({
                ...values,
                name: "",
                description: "",
                price: "",
                photo: "",
                stock: "",
                loading: false,
                createdProduct: response.response.name,
            })
        }
    };

    // success message handler
    const successMessage = () => {

    }

    // error message handler
    const errorMessage = () => {
        
    }

    const handleChange = name => event => {
        const value = name === "photo" ? event.target.file[0] : event.target.value;
        formData.set(name, value);
        setValues({
            ...values,
            [name]: value
        })
    };

    // create product form
    const createProductForm = () => (
        <form>
            <span>Post photo</span>
            <input
                onChange={handleChange("photo")}
                className="form-control my-3 btn btn-block btn-success"
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
            />
            
            <input
                onChange={handleChange("name")}
                name="photo"
                className="form-control my-3"
                placeholder="Name"
                value={name}
            />
            <div className="form-group">
                <textarea
                    onChange={handleChange("description")}
                    name="photo"
                    className="form-control my-3"
                    placeholder="Description"
                    value={description}
                />
            </div>
            <div className="form-group">
                <input
                    onChange={handleChange("price")}
                    type="number"
                    className="form-control my-3"
                    placeholder="Price"
                    value={price}
                />
            </div>
            <div className="form-group">
                <select
                    onChange={handleChange("category")}
                    className="form-control my-3"
                    placeholder="Category"
                >
                    <option>Select</option>
                    {
                        categories && 
                        categories.map((cate, index) => (
                            <option key={index} value= { cate._id }> { cate.name } </option>
                        ))
                    }
                </select>
            </div>
            <div className="form-group">
                <input
                    onChange={handleChange("quantity")}
                    type="number"
                    className="form-control my-3"
                    placeholder="Quantity"
                    value={stock}
                />
            </div>

            <button
                type="submit"
                onClick={onSubmit}
                className="btn btn-outline-success mb-3"
            >
                Create Product
            </button>
        </form>
    );

    return (
        <Base title='Add a product here!' description='Welcome to product creation section' className='container bg-info p-4'>
            <Link 
                to="/admin/dashboard" 
                className='btn btn-md btn-dark mb-3'
            >  Admin Home </Link>

            <div className="row bg-dark text-white rounded">
                <div className="col-md-8 offset-md-2">{createProductForm()}</div>
            </div>
        </Base>
    )
}

export default AddProduct;
