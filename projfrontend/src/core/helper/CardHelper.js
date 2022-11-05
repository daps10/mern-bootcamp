export const addItemToCart = ( item, next ) => {
    let cart = [];

    if (typeof window !== undefined) {
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
        }

        cart.push({
            ...item,
            count: 1
        });

        localStorage.setItem("cart", JSON.stringify(cart))

        next();
    }
};

// Load a cart
export const loadCart = () => {
    if (typeof window !== undefined) {
        if (localStorage.getItem("cart")) {
            return JSON.parse(localStorage.getItem("cart"));
        }
    }
}

// remove item from cart
export const removeItemFromCart = (productId) => {
    let cart = [];

    if (typeof window !== undefined) {
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
        }

        // remove from cart
        cart.map((product, i) => {
            if(product._id === productId) {
                cart.splice(i, 1);
            }
            return cart
        })

        localStorage.setItem("cart", JSON.stringify(cart))
    }

    return cart;   
}