const User = require("../models/user");
const { validationResult } = require('express-validator');

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
    res.status(200).json({ 
        msg: 'Signin successfully' 
    });
};

exports.signout = async (req, res) => {
    res.status(200).json({ msg: 'Signout successfully' });
};