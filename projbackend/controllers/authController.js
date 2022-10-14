const User = require("../models/user");
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const _ = require("lodash");  

exports.signup = async (req, res) => {
    try {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(httpStatus.BAD_REQUEST).json({ 
                status: httpStatus.BAD_REQUEST,
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
        res.status(httpStatus.OK).json({ 
            status: httpStatus.OK,
            message: 'User has been signed up successfully!', 
            result : {
                ...userTransformed,
                accessToken
            }
        });
    } catch (error) {
        console.log(error)
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
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
            return res.status(httpStatus.BAD_REQUEST).json({
                status: httpStatus.BAD_REQUEST, 
                errors: errors.array()[0].msg 
            });
        }
        
        const userDetails = await User.findOne({ email });
        const userTransformed = await userDetails.transform();
        
        // check user exist or not
        if(!userTransformed) {
            return res.status(httpStatus.BAD_REQUEST).json({
                status: httpStatus.BAD_REQUEST,
                error: "User doesn't exist!"
            });
        }

        // check password matched or not
        if(!userDetails.authenticate(password)) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                status: httpStatus.UNAUTHORIZED,
                error: "Email and password do not match!"
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
        console.log("Status code", httpStatus.OK)
        // Send response to frontend
        // Send user from the response
        res.status(httpStatus.OK).json({
            status: httpStatus.OK,
            message: 'User has been signed up successfully!', 
            result : {
                ...userTransformed,
                accessToken
            }
        });
    } catch (error) {
        console.log(error)
        return res.status(httpStatus.BAD_REQUEST).json({
            status: httpStatus.BAD_REQUEST,
            error: "NOT able to save user in DB"
        });
    }
};

exports.signout = async (req, res) => {
    // Update in DB
    await updateUser({
        accessToken: null
    }, req.currUser._id)
    res.status(httpStatus.OK).json({
        status: httpStatus.OK,
        message: "Signout success"
    })
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