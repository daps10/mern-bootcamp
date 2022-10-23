import { isAuthenticated } from "../../auth/helper";
import { API } from "../../backend";


// Create category
export const createCategory = async ( categoryName ) => {
    try {
        const token = isAuthenticated();
        const categoryParams = {
            "name": categoryName
        };
        
        // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                "authorization" : "Bearer " + token
            },
            body: JSON.stringify( categoryParams )
        };

        const URL =  API + "category/create";
            
        const response = await fetch (URL, requestOptions);
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

// Get all categories
export const getAllCategories = async() => {
    try {
        const token = isAuthenticated();
        // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                "authorization" : "Bearer " + token
            }
        };

        const URL =  API + "category/";
            
        const response = await fetch (URL, requestOptions);
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

// Get all products
export const getAllProducts = async() => {
    try {
        const token = isAuthenticated();
        // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                "authorization" : "Bearer " + token
            }
        };

        const URL =  API + "product/";
            
        const response = await fetch (URL, requestOptions);
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

// Get Product
export const getProduct = async(productId) => {
    try {
        const token = isAuthenticated();
        // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                "authorization" : "Bearer " + token
            }
        };

        const URL =  API + "product/" + productId;
            
        const response = await fetch (URL, requestOptions);
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

// create product
export const createProduct = async ( productParams ) => {
    try {
        const token = isAuthenticated();
        // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                "authorization" : "Bearer " + token
            },
            body: productParams
        };

        const URL =  API + "product/create";
            
        const response = await fetch (URL, requestOptions);
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

// Update Product
export const updateProduct = async ( productId,productParams ) => {
    try {
        const token = isAuthenticated();
        // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                "authorization" : "Bearer " + token
            },
            body: productParams
        };

        const URL =  API + "product/update/" + productId;
            
        const response = await fetch (URL, requestOptions);
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

