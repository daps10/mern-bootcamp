import React, { useState, useEffect } from 'react'
import "../styles.css"
import Base from './Base';
import Card from './card';
import { getAllProducts } from './helper/coreapicalls';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);

    const loadAllProducts = async () => {
        const response = await getAllProducts();
        if(response.status === 200){
            setProducts(response.response);
        } else {
            console.log("error data :: ", response.message);
            setError(response.message);
        }
    }

    useEffect(() => {
      loadAllProducts()
      // eslint-disable-next-line
    }, []);

    return (
        <>
        <Base title='Home Page' description='My description'>
            <div className="row text-center">
                <h1 className="text-white">All of tshirts</h1>

                <div className="row">
                    {
                        products.map((product, index) => {
                            return (
                                <div key={index} className="col-4 mb-4">
                                    <Card />
                                </div>
                            )
                        })
                    }
                </div>

            </div>
        </Base>
        </>
    )
}

export default Home;
