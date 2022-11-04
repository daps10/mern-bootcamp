import React from 'react'
import "../styles.css"
import Base from './Base';
import Card from './card';


const Home = () => {
    return (
        <>
        <Base title='Home Page' description='My description'>
            <div className="row text-center">
                <div className="col-4">
                    <Card/>
                </div>
                <div className="col-4">
                    <Card/>
                </div>
                <div className="col-4">
                    <Card/>
                </div>
            </div>
        </Base>
        </>
    )
}

export default Home;
