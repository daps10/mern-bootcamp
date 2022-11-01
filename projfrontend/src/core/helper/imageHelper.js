import React from 'react'

// Image helper which can display as cards.
const ImageHelper = ({ product }) => {
    return (
        <div className="rounded border border-success p-2">
            <img
              src="https://images.unsplash.com/photo-1597576000003-2e6487e67d20?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
              alt="photo"
              style={{ maxHeight: "100%", maxWidth: "100%" }}
              className="mb-3 rounded"
            />
        </div>
    )
}

export default ImageHelper;
