import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import Base from '../core/Base';
import { signin, authenticate, isAuthenticated } from "../auth/helper/index"; 

const Signin = () => {
    const [values, setValues] = useState({
        email:"",
        password:"",
        error: "",
        loading: false,
        didRedirect: false
    });

    // destructure 
    const [email, password, error, loading, didRedirect] = values;
    const { user } = isAuthenticated();

    // Onchange method
    const onHandleChange = name => event => {
        setValues({
            ...values,
            error:false,
            [name]: event.target.value
        })
    }

    const successMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-success" style={{display: success? "": "none"}}>
                        New Account was created successfully. Please <Link to="/signin"> Login Here </Link>
                    </div>
                </div>
            </div>
        )
    }

    const errorMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-danger" style={{display: error ? "": "none"}}>
                        { error }
                    </div>
                </div>
            </div>
        )
    }

    const onSubmit = async(event) => {
        event.preventDefault();

        setValues({
            ...values,
            error:false,
            loading: true
        });

        const response = await signup({
            email,
            password
        });
        console.log("response found === ", response);
        if(response.status !== 200){
            setValues({ 
                ...values, 
                error: response.message, 
                loading: false 
            });
        } else {
            setValues({ 
                ...values, 
                email:"",
                password:"",
                error: "", 
                loading: false,
                didRedirect:true
            });
        }
    }
    
    const signInForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form >
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input className="form-control" type="email" value={email} onChange={ onHandleChange }/>
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input className="form-control" type="password" value={password} onChange={ onHandleChange }/>
                        </div>
                        <button className="form-control btn btn-success btn-block mt-2" onClick={onSubmit}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        )
    }

    return (
    <>
        <Base title="Sign in page" description="A page for user to signin">
            { successMessage() }
            { errorMessage() }
            { signInForm() }
        </Base>
    </>
    )
}

export default Signin;