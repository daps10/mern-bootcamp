import React, { useState } from "react";
import  { useNavigate } from 'react-router-dom'
import { signin } from "../auth/helper";
import Base from '../core/Base';


const Signin = () => {
    let navigate = useNavigate();

    const [values, setValues] = useState({
        email:"",
        password: "",
        error: "",
        loading: false,
        didRedirect:false
    });

    const [userdata, setUserData] = useState({});

    const { email, password, error, loading, didRedirect } = values; // desctructre the values

    // handle onchange form data
    const onHandleChange = name => event => {
        setValues({
            ...values,
            error: false,
            [name]: event.target.value
        })
    }

    // on submit form data
    const onSubmit = async (event) => {
        event.preventDefault();

        setValues({
            ...values,
            error: false,
            loading: true
        });

        const response = await signin({
            email, 
            password
        });
        if(response.status !== 200){
            localStorage.setItem('user', undefined);
            localStorage.setItem('accessToken', undefined);
            setValues({ 
                ...values, 
                error: response.message, 
                loading: false 
            });
        } else {
            localStorage.setItem('user', JSON.stringify(response.response));
            localStorage.setItem('accessToken', response.response.accessToken);

            setUserData(response.response);
            setValues({ 
                ...values, 
                email:"",
                password:"",
                error: "", 
                loading: false,
                didRedirect: true
            });
        }
    }

    // perform signin event
    const signINForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form >
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input 
                            className="form-control" 
                            type="email"
                            value={email}
                            onChange={onHandleChange("email")}/>
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input 
                            className="form-control" 
                            type="password"
                            value={password}
                            onChange={onHandleChange("password")}/>
                        </div>
                        <button className="form-control btn btn-success btn-block mt-2" onClick={ onSubmit }>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        )
    }

    // perform redirection after logged in
    const performRedirect = () => {
        if( didRedirect ){
            if( userdata && userdata.role === 1 ) {
                return navigate('/admin/dashboard');
            } else {
                return navigate("/user/dashboard");
            }
        }
    }

    // loading message
    const loadingMessage = () => {
        return (
            loading && (
                <div className="alert alert-info">
                    <h3>Loading ....</h3>
                </div>
            )
        );
    }

    // error message once got error
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

    return (
        <>
        <Base title="Sign in page" description="A page for user to signin">
            { loadingMessage() }
            { errorMessage() }
            { signINForm() }
            { performRedirect() }
            <p className="text-white text-center">HII</p>
        </Base>
        </>
    )
}

export default Signin;