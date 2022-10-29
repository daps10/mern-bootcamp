import React from 'react'

const Card = () => {
    return (
      <div className="card text-white bg-dark border border-info ">
        <div className="card-header lead">A photo from pexels</div>
        <div className="card-body">
          <div className="rounded border border-success p-2">
            <img
              src="https://images.unsplash.com/photo-1597576000003-2e6487e67d20?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
              alt="photo"
              style={{ maxHeight: "100%", maxWidth: "100%" }}
              className="mb-3 rounded"
            />
          </div>
          <p className="lead bg-success font-weight-normal text-wrap">
            this photo looks great
          </p>
          <p className="btn btn-success rounded  btn-sm px-4">$ 5</p>
          <div className="row">
            <div className="col-12">
              <button
                onClick={() => {}}
                className="btn btn-block btn-outline-success mt-2 mb-2"
              >
                Add to Cart
              </button>
            </div>
            <div className="col-12">
              <button
                onClick={() => {}}
                className="btn btn-block btn-outline-danger mt-2 mb-2"
              >
                Remove from cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Card;
