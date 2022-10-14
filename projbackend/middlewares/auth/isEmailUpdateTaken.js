const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const User = require('../../models/user.model');

const isEmailUpdateTaken = async(req, res, next) => {
    try {
        const isExist = await User.isEmailTaken(req.body.email, req.currUser._id);
        if(isExist) {
            return res.status(httpStatus.BAD_REQUEST).send({
                status: httpStatus.BAD_REQUEST,
                message: "Email already taken!"
            });
        }

        next();
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: "Something went wrong!"
        });
    }
}

module.exports = isEmailUpdateTaken;