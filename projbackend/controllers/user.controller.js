const httpStatus = require('http-status');

// load services
const {
    userService
} = require("../services");

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
            error: "Something went wrong!"
        });
    }
};

exports.updateUser = async (req, res) => {
    res.status(200).json({ 
        msg: 'Update user successfully' 
    });
};

exports.listAllUser = async (req, res) => {
    res.status(200).json({ 
        msg: 'List all users successfully' 
    });
};