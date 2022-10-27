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

    // handle change event
    const handleChange = (event) => {
        setError("");
        setName(event.target.value);
    }

    // on submit form data
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
    const successMessage = () => (
        <div 
            className="alert alert-success mt-3"
            style={{ display: success ? "" : "none" }}
        >
            <h4> Category has been successfully! </h4>

        </div>
    )

    // error message after completion of request
    const errorMessage = () => (
        <div 
            className="alert alert-danger mt-3"
            style={{ display: error ? "" : "none" }}
        >
            <h4> Failed to create category! </h4>
        </div>
    )

    // Add category form
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