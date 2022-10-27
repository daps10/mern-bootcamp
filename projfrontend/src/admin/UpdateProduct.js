import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import Base from '../core/Base';
import { 
    getAllCategories, 
    getProduct,
    updateProduct
} from './helper/adminapicall';

const UpdateProduct = (props) => {
    const { productId } = useParams();
    
    let navigate = useNavigate();
    // call useEffect for fetch the product first
    useEffect(() => {
        preload(productId);
        // eslint-disable-next-line
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
        didRedirect: false,
        formData:""
    });

    const { 
        name, 
        description, 
        price, 
        stock, 
        // photo, 
        categories, 
        category, 
        loading, 
        error, 
        createdProduct, 
        didRedirect, 
        formData 
    } = values;

    // preload the get product
    const preload = async (productId) => {
        const response = await getProduct(productId);
        if(response.status === 200){
            preloadCategories();
            setValues({ 
                ...values,
                name: response.response.name,
                description: response.response.description,
                price: response.response.price,
                category: response.response.category,
                stock: response.response.stock,
                formData: new FormData()
            });
        } else {
            setValues({ 
                ...values, 
                error: response.message
            });
        }
    }

    const preloadCategories = async () => {
        const response = await getAllCategories();
        if(response.status === 200){
            setValues({ 
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
            loading: true,
            didRedirect: false
        });
        // Call the update product API
        const response = await updateProduct( formData );
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
                name: "",
                description: "",
                price: "",
                photo: "",
                stock: "",
                loading: false,
                didRedirect: true,
                createdProduct: response.response.name,
            })
        }
    };

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
            style={{ display: createdProduct ? "" : "none" }}
        >
            <h4> { createdProduct } product has been successfully! </h4>
        </div>
    )

    // Perform redirect once the response got.
    const performRedirect = () => {
        if( didRedirect ){
            setTimeout(() => {
                return navigate('/');
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
        const value = name === "photo" ? event.target.files[0] : event.target.value;
        // console.log("value data :: ", value)
        formData.set(name, value);
        setValues({
            ...values,
            [name]: value
        })
    };

    // Update product form
    const updateProductForm = () => (
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
                    onChange={handleChange("stock")}
                    type="number"
                    className="form-control my-3"
                    placeholder="Stock"
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

                <div 
                    className="col-md-8 offset-md-2">
                        { loadingMessage() }
                        { successMessage() }
                        { errorMessage() }
                        { performRedirect() }
                        { updateProductForm() }
                </div>
            </div>
        </Base>
    )
}

export default UpdateProduct;
