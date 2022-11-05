import React, { useState, useEffect } from 'react'
import { addItemToCart } from './helper/CardHelper';
import  { useNavigate } from 'react-router-dom'
import ImageHelper from './helper/imageHelper';

const Card = ({  
  product,
  addToCart= true,
  removeFromCart= false
}) => {
  let navigate = useNavigate();
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const cardTitle = product ? product.name : "A photo from pexels"; 
  const cardDescription = product ? product.description : "Default description"; 
  const cardPrice = product ? product.price : "DEFAULT"; 

  const addToTheCart = () => {
    addItemToCart( product , () => setRedirect(true) );
  }

  const getARedirect = (redirect) => {
    if(redirect) {
      navigate('/cart');
    }
  }

  // show add to cart
  const showAddToCart = () => {
    return (
      addToCart && (
        <button
          onClick={ () => addToTheCart() }
          className="btn btn-block btn-outline-success mt-2 mb-2"
          >
            Add to Cart
        </button>
      )
    )
  }

  // show remove from cart
  const showRemoveFromCart = () => {
    return (
      removeFromCart && (
        <button
          onClick={() => {}}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
          >
            Remove from cart
        </button>
      )
    ) 
  }
  
  return (
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead">{ cardTitle }</div>
      <div className="card-body">
        { getARedirect(redirect) }
        <ImageHelper product={ product } />
        <p className="lead bg-success font-weight-normal text-wrap">
          { cardDescription }
        </p>
        <p className="btn btn-success rounded  btn-sm px-4"> $ { cardPrice }</p>
        <div className="row">
          <div className="col-12">
            {
              showAddToCart(addToCart)
            }
          </div>
          <div className="col-12">
            {
              showRemoveFromCart(removeFromCart)
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
