import { API } from "../../backend" // API url we can get 

export const signup = async (user) => {
    try {
        const signupParams = {
            "name": user.name,
            "lastname": user.lastname,
            "email": user.email,
            "password": user.password
        };

        // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify( signupParams )
        };
        const URL =  API + "auth/signup";
        const response = await fetch (URL, requestOptions);
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

export const signin = async (user) => {
    try {
        const signupParams = {
            "email": user.email,
            "password": user.password
        };
        
        // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify( signupParams )
        };
        const URL =  API + "auth/signin";
            
        const response = await fetch (URL, requestOptions);
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

export const signout = async (next) => {
    try {
        if(typeof window !== "undefined"){
            // Simple POST request with a JSON body using fetch
            const requestOptions = {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json',
                    "authorization" : localStorage.getItem("authToken") 
                }
            };
            
            const URL =  API + "auth/signout";
            const response = await fetch (URL, requestOptions);
            await response.json();
            localStorage.removeItem("authToken");
            next();
        }
    } catch (error) {
        console.log(error);
    }
}


export const authenticate = (data, next) => {
    if(typeof window !== "undefined") {
        localStorage.setItem("authToken", data.response.accessToken)
        next();
    }
}

export const isAuthenticated = () => {
    if(typeof window === "undefined") {
        return false;
    }

    if(localStorage.getItem("authToken")) {
        return JSON.parse(localStorage.getItem("authToken"))
    } else {
        return false;
    }
}