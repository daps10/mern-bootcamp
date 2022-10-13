const User = require("../models/user");
const { validationResult } = require('express-validator');

exports.signup = async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ 
            errors: errors.array()[0].msg 
        });
    }

    const user = new User(req.body);

    // Save user in the database
    user.save((err, user) => {
        if(err) {
            console.log(err)
            return res.status(400).json({
                err: "NOT able to save user in DB"
            });
        }

        // Send user from the response
        res.status(200).json({ 
            msg: 'User has been signed up successfully!', 
            result : {
                id: user._id,
                name: user.name,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                userinfo: user.userinfo,
                createdAt: user.createdAt
            }
        });
    });
};

exports.signin = async (req, res) => {
    res.status(200).json({ 
        msg: 'Signin successfully' 
    });
};

exports.signout = async (req, res) => {
    res.status(200).json({ msg: 'Signout successfully' });
};