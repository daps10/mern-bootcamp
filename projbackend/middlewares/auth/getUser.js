const httpStatus = require('http-status');
const User = require('../../models/user.model');

const getUser = async(req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user){  
            return res.status(httpStatus.NOT_FOUND).json({
                status: httpStatus.NOT_FOUND,
                message: t("text_user_not_found")
            });
        }

        req.userData = user;
        next();

    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: "Something went wrong!"
        });
    }
}

module.exports = getUser;