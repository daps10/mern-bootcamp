const User = require("../models/user");
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
// const { expressjwt } = require("express-jwt");
const _ = require("lodash");  

exports.signup = async (req, res) => {
    try {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ 
                message: errors.array()[0].msg 
            });
        }
        
        // Save user in the database
        const user = await new User(req.body).save();
        const userTransformed = await user.transform();
        
        // Create token 
        const accessToken = await generateAccessToken(userTransformed._id);
        
        // Update in DB
        await updateUser(
            {
                accessToken: accessToken
            },
            userTransformed._id
        )

        // Send user from the response
        res.status(200).json({ 
            message: 'User has been signed up successfully!', 
            result : {
                ...userTransformed,
                accessToken
            }
        });
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            err: "NOT able to save user in DB"
        });
    }
};

exports.signin = async (req, res) => {
    const { email, password } = req.body
    try {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ 
                errors: errors.array()[0].msg 
            });
        }
        
        const userDetails = await User.findOne({ email });
        const userTransformed = await userDetails.transform();
        
        // check user exist or not
        if(!userTransformed) {
            return res.status(400).json({
                err: "User doesn't exist!"
            });
        }

        // check password matched or not
        if(!userDetails.authenticate(password)) {
            return res.status(401).json({
                err: "Email and password do not match!"
            });
        }

        // Create token 
        const accessToken = await generateAccessToken(userTransformed._id);
        
        // Update in DB
        await updateUser(
            {
                accessToken: accessToken
            },
            userTransformed._id
        )

        // Send response to frontend
        // Send user from the response
        res.status(200).json({ 
            message: 'User has been signed up successfully!', 
            result : {
                ...userTransformed,
                accessToken
            }
        });
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            err: "NOT able to save user in DB"
        });
    }
};

exports.signout = async (req, res) => {
    res.clearCookie("authToken");
    res.status(200).json({
        message: "Signout success"
    })
    // const bearerHeader = req.headers.authorization;
    // if(typeof bearerHeader !== "undefined") {
    //     res.status(200).json({ message: 'Signout successfully' });
    // } else {
    //     res.status(403).json({
    //         msg : "No token provided!"
    //     })
    // }
};

const updateUser = async(updateBody, id) => {
    const user = await User.findById(id);
    Object.assign(user, updateBody);
    await user.save();
    return user;
}

const generateAccessToken = async(id) => {
    return jwt.sign({
        _id: id
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_LIFE
    })
}