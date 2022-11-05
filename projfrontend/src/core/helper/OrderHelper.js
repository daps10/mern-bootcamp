import { isAuthenticated } from "../../auth/helper";

export const createOrder = async ( orderParams ) => {
    try {
        const token = isAuthenticated();
        // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                "authorization" : "Bearer " + token
            },
            body: JSON.stringify({ order: orderParams })
        };
        const URL =  API + "order/create";
        const response = await fetch (URL, requestOptions);
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}