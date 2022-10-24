const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const user = require('../../models/user.model');
const _ = require('lodash');
exports.checkAuthorization = async(req, res, next) => {
    console.log("coming here")
    let token = req.headers["authorization"];
    try {
        if (!token) {
            return res.status(httpStatus.UNAUTHORIZED).send({
                status: httpStatus.UNAUTHORIZED,
                message: "No token provided!"
            });
        }

        const bearerToken = _.split(token, ' ')[1];
        // verify jwt
        jwt.verify(
            bearerToken, 
            process.env.ACCESS_TOKEN_SECRET, 
            async (err, decoded) => {
            if (err) {
                return res.status(httpStatus.UNAUTHORIZED).send({
                    status: httpStatus.UNAUTHORIZED,
                    message: "Unauthorized!"
                });
            }

            const userId = decoded._id;
            const userData = await user.findById(userId);
            if (!userData || _.isNull(userData.accessToken)) {
                return res.status(404).send({
                    status: httpStatus.NOT_FOUND,
                    message: "User details not found"
                });
            }

            req.currUser = userData;
            next();
        });    
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: "Something went wrong!"
        });
    }
}