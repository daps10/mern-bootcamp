import { isAuthenticated } from "../../auth/helper";
import { API } from "../../backend";

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
