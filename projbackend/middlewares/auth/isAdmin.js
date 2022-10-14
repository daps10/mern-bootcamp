const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const User = require('../../models/user.model');

const isAdmin = async(req, res, next) => {
    try {
        if(req.currUser.role === 0) {
            return res.status(httpStatus.FORBIDDEN).send({
                status: httpStatus.FORBIDDEN,
                message: "You are not an admin, Access Denied!"
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

module.exports = isAdmin;