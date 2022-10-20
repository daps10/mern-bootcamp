import React from 'react'
import Base from '../core/Base';

const Signin = () => {
    const signInForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form >
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input className="form-control" type="email"/>
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input className="form-control" type="password"/>
                        </div>
                        <button className="form-control btn btn-success btn-block mt-2">
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
            { signInForm() }
        </Base>
    </>
    )
}

export default Signin;