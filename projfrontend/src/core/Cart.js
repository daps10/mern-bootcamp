import React, { useState, useEffect } from 'react'
import "../styles.css"
import Base from './Base';
import Card from './card';
import { loadCart } from './helper/CardHelper';
import { getAllProducts } from './helper/coreapicalls';

const Cart = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        setProducts(loadCart());
        // eslint-disable-next-line
    }, [])
    

    const loadAllProducts = () => {
        return (
            <div>
                <h2>This section is to load products</h2>
                { 
                    products.map((product, index) => (
                        <Card
                            key={index}
                            product={ product }
                            removeFromCart={true}
                            addToCart={false}
                        />
                    ))
                }
            </div>
        )
    }

    const loadCheckout = () => {
        return (
            <div>
                <h2>This section for checkout</h2>
            </div>
        )
    }

    return (
        <>
        <Base title='Cart Page' description='Ready to checkout'>
            <div className="row text-center">
                <div className="col-6">
                    {
                        loadAllProducts()
                    }
                </div>
                <div className="col-6">
                    {
                        loadCheckout()
                    }
                </div>
            </div>
        </Base>
        </>
    )
}

export default Cart;
