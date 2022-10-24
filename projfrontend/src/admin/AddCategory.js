import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Base from '../core/Base';
import { createCategory } from './helper/adminapicall';

const AddCategory = () => {

    const [name, setName] = useState("");
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    // Go back
    const goBack = () => (
        <div className="mt-3">
            <Link className='btn btn-sm btn-success mb-3' to="/admin/dashboard">Admin Home</Link>
        </div>
    )

    const handleChange = (event) => {
        setError("");
        setName(event.target.value);
    }

    const onSubmit = async (event) => {
        event.preventDefault();

        setError("");
        setSuccess(false);

        // backend API call
        const response = await createCategory(name);
        if(response.status !== 200){
            setError(true);
            setSuccess(false);
        } else {
            setName("");
            setError(false);
            setSuccess(true);
        }
    }

    // success message after completion of request
    const successMessage = () => {
        if(success){
            return <div className="row">
                <div className="col-md-8">
                    <div className="alert alert-success" >
                        Product has been created successfully!
                    </div>
                </div>
            </div>
        }
    }

    // error message after completion of request
    const errorMessage = () => {
        if(error){

            return <div className="row">
                <div className="col-md-8">
                    <div className="alert alert-danger" >
                        Failed to create category!
                    </div>
                </div>
            </div>
        }
    }

    const myCategoryForm = () => (
        <form>
            <div className="form-group">
                <p className="lead">Enter the category</p>
                <input 
                    type="text" 
                    className='form-control my-3' 
                    autoFocus 
                    required 
                    onChange={handleChange}
                    value={ name }
                    placeholder='For Ex. Summer' 
                />

                <button onClick={onSubmit} className="btn-outline-info">
                    Create Category
                </button>
            </div>
        </form>
    )

    return (
        <>
            <Base 
                title='Create a category here' 
                description='Add a new category for new tshirts'
                className='container bg-info p-4'
            >
                <div className="row bg-white rounded">
                    <div className="col-md-8 offset-md-2">
                        { successMessage() }
                        { errorMessage() }
                        { myCategoryForm() } 
                        { goBack() }
                    </div>
                </div>
            </Base>
        </>
    )
}

export default AddCategory;