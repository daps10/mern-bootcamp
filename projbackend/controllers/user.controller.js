const httpStatus = require('http-status');

// load services
const {
    userService
} = require("../services");

exports.listAllUser = async (req, res) => {
    try {
        const userData = await userService.findAllUsers({
            id : req.currUser._id
        });
        
        if(userData.length > 0) {
            return res.status(httpStatus.OK).json({
                status: httpStatus.OK,
                message: "User list has been found successfully!",
                response: userData 
            });
        } else {
            return res.status(httpStatus.NOT_FOUND).json({
                status: httpStatus.NOT_FOUND,
                message: "User list has been not found!"
            });
        }
    } catch (error) {
        console.log(error)
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: "Something went wrong!"
        });     
    }
};

exports.getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const userRes = await userService.findById(userId);
        
        if(!userRes || userRes === null) {
            return res.status(httpStatus.NOT_FOUND).json({
                status: httpStatus.NOT_FOUND,
                message: "No user was found in DB."
            });
        }

        res.status(200).json({ 
            status: httpStatus.OK,
            message: 'User details has been found successfully!',
            response: userRes 
        });
    } catch (error) {
        console.log(error)
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: "Something went wrong!"
        });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const userId = req.currUser._id;
        
        // Update an user
        const userResponse = await userService.updateUser(
            req.body,
            userId
        );
            
        if(!userResponse) {
            return res.status(httpStatus.BAD_REQUEST).json({
                status: httpStatus.BAD_REQUEST,
                message: "You are not allowed to update"
            });
        }

        res.status(httpStatus.OK).json({
            status: httpStatus.OK,
            message: "User has been updated successfully!",
            response: userResponse
        });
    } catch (error) {
        console.log(error)
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: "Something went wrong!"
        });
    }
};
