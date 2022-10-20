import React, { useState } from "react";
import Base from "../core/Base";
import { signup } from "../auth/helper";
import { Link } from "react-router-dom";

const Signup = () => {
    const [values, setValues] = useState({
        name: "",
        lastname:"",
        email:"",
        password: "",
        error: "",
        success: false
    });

    const { name,lastname, email, password, error, success } = values; // desctructre the values

    // Onchange method
    const onHandleChange = name => event => {
        setValues({
            ...values,
            error:false,
            [name]: event.target.value
        })
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        setValues({ ...values, error: false })
        const response = await signup({
            name,
            lastname,
            email,
            password
        });
        if(response.status !== 201){
            localStorage.setItem('user', {});
            localStorage.setItem('accessToken', null);
            setValues({ 
                ...values, 
                error: response.message, 
                success: false 
            });
        } else {
            localStorage.setItem('user', JSON.stringify(response.response));
            localStorage.setItem('accessToken', response.response.accessToken);
            setValues({ 
                ...values, 
                name:"",
                lastname:"",
                email:"",
                password:"",
                error: "", 
                success: true
            });
        }
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

    const signUpForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form >
                        <div className="form-group">
                            <label className="text-light">Name</label>
                            <input 
                            className="form-control" 
                            type="text" 
                            value={name}
                            onChange={onHandleChange("name")}/>
                        </div>
                        <div className="form-group">
                            <label className="text-light">Last Name</label>
                            <input 
                            className="form-control" 
                            type="text" 
                            value={lastname}
                            onChange={onHandleChange("lastname")}/>
                        </div>
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

    return (
        <>
            <Base title="Sign up page" description="A page for user to signup">
                { successMessage() }
                { errorMessage() }
                { signUpForm() }
                <p className="text-white text-center">HII</p>
            </Base>
        </>
    )
}

export default Signup;