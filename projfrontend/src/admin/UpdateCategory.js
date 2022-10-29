import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Base from '../core/Base';
import { getCategory, updateCategory } from './helper/adminapicall';

const UpdateCategory = () => {
  const { categoryId } = useParams();
  let navigate = useNavigate();

  // call useEffect for fetch the category first
  useEffect(() => {
      preload(categoryId);
      // eslint-disable-next-line
  }, [])
  
  const [values, setValues] = useState({
    name: "",
    loading: false,
    error:"",
    updatedCategory:"",
    didRedirect: false,
    formData:""
  });

  const { 
    name, 
    loading, 
    error, 
    updatedCategory, 
    didRedirect, 
  } = values;

  // preload the get category
  const preload = async ( categoryId ) => {
    const response = await getCategory(categoryId);
    if(response.status === 200){ 
        setValues({ 
          ...values,
          name: response.response.name,
        });
    } else {
        setValues({ 
          ...values, 
          error: response.message
        });
    }
  }

  // loading message appear while the page load
  const loadingMessage = () => {
      return (
          loading && (
              <div 
                  className="alert alert-info mt-3"
              >
                  <h4> Loading... </h4>
              </div>
          )
      );
  }

  // success message handler
  const successMessage = () => (
      <div 
          className="alert alert-success mt-3"
          style={{ display: updatedCategory ? "" : "none" }}
      >
          <h4> { updatedCategory } category has been successfully! </h4>
      </div>
  )

  // Perform redirect once the response got.
  const performRedirect = () => {
    if( didRedirect ){
      setTimeout(() => {
          return navigate('/admin/categories');
      }, 3000);
    }
  }
  
  // error message handler
  const errorMessage = () => (
    <div 
        className="alert alert-danger mt-3"
        style={{ display: error ? "" : "none" }}
    >
        <h4> category has not been successfully! </h4>
    </div>
  )
  
  // Handle once change
  const handleChange = name => event => {
      setValues({
        ...values,
        [name]: event.target.value
      })
  };

  const onSubmit = async ( event ) => {
    event.preventDefault();

    setValues({ 
        ...values, 
        error: "", 
        loading: true,
        didRedirect: false
    });
    
    // Call the update category API
    const response = await updateCategory( categoryId, {
      name: name
    });
    if(response.status !== 200){
        setValues({
            ...values,
            error: response.message,
            loading: false,
            didRedirect: false
        });
    } else {
        setValues({
            ...values,
            name: response.response.name,
            loading: false,
            didRedirect: true,
            updatedCategory: response.response.name,
        })
    }
  };

  // Update category form
  const updateCategoryForm = () => (
    <form>
      <input
        onChange={handleChange("name")}
        name="name"
        className="form-control my-3"
        placeholder="Name"
        value={name}
      />
      <button
          type="submit"
          onClick={onSubmit}
          className="btn btn-outline-success mb-3"
      >
        Update Category
      </button>
    </form>
  );

  return (
    <Base title='Update a category here!' description='Welcome to category updating section' className='container bg-info p-4'>
      <Link 
          to="/admin/dashboard" 
          className='btn btn-md btn-dark mb-3'
      >  Admin Home </Link>

      <div className="row bg-dark text-white rounded">
          <div 
              className="col-md-8 offset-md-2">
                  { loadingMessage() }
                  { successMessage() }
                  { errorMessage() }
                  { performRedirect() }
                  { updateCategoryForm() }
          </div>
      </div>
  </Base>
  )
}


export default UpdateCategory;