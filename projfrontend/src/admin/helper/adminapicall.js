import { API } from "../../backend";

// Create category
export const createCategory = async ( token, categoryName ) => {
    try {
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

