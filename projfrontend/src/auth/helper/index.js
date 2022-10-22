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
                    "authorization" : "Bearer " + localStorage.getItem("accessToken") 
                }
            };
            
            const URL =  API + "auth/signout";
            const response = await fetch (URL, requestOptions);
            await response.json();
            localStorage.setItem('user', undefined);
            localStorage.setItem('accessToken', undefined);
            next();
        }
    } catch (error) {
        console.log(error);
    }
}


export const getUserData = (data, next) => {
    if(typeof window == "undefined") {
        return false;
    }
    
    if(localStorage.getItem("user") === "undefined") {
        return undefined;
    } else {
        return JSON.parse(localStorage.getItem("user"))
    }
}

export const isAuthenticated = () => {
    if(typeof window == "undefined") {
        return false;
    }

    if(localStorage.getItem("accessToken")) {
        return localStorage.getItem("accessToken")
    } else {
        return undefined;
    }
}