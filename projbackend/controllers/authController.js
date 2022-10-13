const User = require("../models/user");
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { expressjwt } = require("express-jwt");


exports.signup = async (req, res) => {
    try {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ 
                errors: errors.array()[0].msg 
            });
        }
        
        // Save user in the database
        let user = new User(req.body);
        const userRes = await user.save();

        // Send user from the response
        res.status(200).json({ 
            msg: 'User has been signed up successfully!', 
            result : {
                id: userRes._id,
                name: userRes.name,
                lastName: userRes.lastName,
                email: userRes.email,
                role: userRes.role,
                userinfo: userRes.userinfo,
                createdAt: userRes.createdAt
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
        
        // check user exist or not
        if(!userDetails) {
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
        const authToken = jwt.sign({
            _id: userDetails._id
        }, process.env.SECRET)
        
        // put token in cookie
        res.cookie(
            "authToken", 
            authToken,
            { expiry: new Date() + 9999 }
        )

        // console.log(req.cookies) =>  this way you can fetch the cookie
        
        // Send response to frontend
        // Send user from the response
        res.status(200).json({ 
            msg: 'User has been signed up successfully!', 
            result : {
                id: userDetails._id,
                name: userDetails.name,
                lastName: userDetails.lastName,
                email: userDetails.email,
                role: userDetails.role,
                userinfo: userDetails.userinfo,
                createdAt: userDetails.createdAt,
                authToken
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
    res.status(200).json({ msg: 'Signout successfully' });
};