import React from 'react'
import "../styles.css"
import { API } from "../backend";
import Base from './Base';
import Menu from './Menu';

const Home = () => {
    console.log("API IS ", API)
    return (
        <>
        
        <Menu history="/" />
        <Base title='Home Page' description='My description'>
            <div className="row">
                <div className="col-4">
                    <button className="btn-success">Test</button>
                </div>
                <div className="col-4">
                    <button className="btn-success">Test</button>
                </div>
                <div className="col-4">
                    <button className="btn-success">Test</button>
                </div>
            </div>
            <h1 className='text-white'>Home is available</h1>
        </Base>
        </>
    )
}

export default Home;
