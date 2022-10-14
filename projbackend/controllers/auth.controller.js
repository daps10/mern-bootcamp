const User = require("../models/user.model");
const { validationResult } = require('express-validator');
const httpStatus = require('http-status');

// load services
const {
    authService
} = require("../services");

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
        const userRes = await authService.createUser(req.body);
        
        // Create token 
        const accessToken = await authService.generateAccessToken(userRes._id);
        
        // Update in DB
        await authService.updateUser(
            {
                accessToken: accessToken
            },
            userRes._id
        );

        // Send user from the response
        res.status(httpStatus.CREATED).json({ 
            status: httpStatus.CREATED,
            message: 'User has been signed up successfully!', 
            result : {
                ...userRes,
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
        
        const userDetails = await authService.findOne({
            email
        });
        
        // check user exist or not
        if(!userDetails) {
            return res.status(httpStatus.BAD_REQUEST).json({
                status: httpStatus.BAD_REQUEST,
                error: "User doesn't exist!"
            });
        }

        // check password matched or not
        if(!await authService.checkPasswordMatched(userDetails._id,password)) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                status: httpStatus.UNAUTHORIZED,
                error: "Email and password do not match!"
            });
        }

        // Create token 
        const accessToken = await authService.generateAccessToken(userDetails._id);

        // Update in DB
        await authService.updateUser(
            {
                accessToken: accessToken
            },
            userDetails._id
        )
        
        // Send response to frontend
        // Send user from the response
        res.status(httpStatus.OK).json({
            status: httpStatus.OK,
            message: 'User has been signed up successfully!', 
            result : {
                ...userDetails,
                accessToken
            }
        });
    } catch (error) {
        console.log(error)
        return res.status(httpStatus.BAD_REQUEST).json({
            status: httpStatus.BAD_REQUEST,
            error: "Something went wrong!"
        });
    }
};

exports.signout = async (req, res) => {
    // Update in DB
    await authService.updateUser({
        accessToken: null
    }, req.currUser._id)
    res.status(httpStatus.OK).json({
        status: httpStatus.OK,
        message: "Signout success"
    })
};