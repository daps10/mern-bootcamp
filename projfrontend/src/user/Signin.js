import React, { useState } from "react";
import { isAuthenticated, signin } from "../auth/helper";
import Base from '../core/Base';

const Signin = () => {
    const [values, setValues] = useState({
        email:"",
        password: "",
        error: "",
        loading: false,
        didRedirect:false
    });

    const [userdata, setUserData] = useState({});

    const { email, password, error, loading, didRedirect } = values; // desctructre the values

    const onHandleChange = name => event => {
        setValues({
            ...values,
            error: false,
            [name]: event.target.value
        })
    }

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
            setValues({ 
                ...values, 
                error: response.message, 
                loading: false 
            });
        } else {
            console.log(response)
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

    const performRedirect = () => {
        if( didRedirect ){
            if( userdata && userdata.role === 1 ) {
                return <p>Redirect to admin</p>
            } else {
                return <p>Redirect to user</p>
            }
        }

        if(didRedirect && userdata.accessToken) {
            
        }

    }

    const successMessage = () => {
        console.log("sdsdsd")
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-success" style={{display: didRedirect? "": "none"}}>
                        You have successfully logged in!
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

    return (
        <>
        <Base title="Sign in page" description="A page for user to signin">
            { successMessage() }
            { errorMessage() }
            { signINForm() }
            { performRedirect() }
            <p className="text-white text-center">HII</p>
        </Base>
        </>
    )
}

export default Signin;