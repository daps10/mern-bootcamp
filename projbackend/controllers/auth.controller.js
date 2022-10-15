const httpStatus = require('http-status');
const {t} = require('localizify');

// load services
const {
    authService
} = require("../services");

exports.signup =  async (req, res) => {
    try {
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
            message: t('text_user_signup_success'), 
            response : {
                ...userRes,
                accessToken
            }
        });
    } catch (error) {
        console.log(error)
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: t("text_not_able_to_save_user")
        });
    }
};

exports.signin = async (req, res) => {
    const { email, password } = req.body
    try {
        const userDetails = await authService.findOne({
            email
        });
        
        // check user exist or not
        if(!userDetails) {
            return res.status(httpStatus.BAD_REQUEST).json({
                status: httpStatus.BAD_REQUEST,
                message: t("text_user_not_found")
            });
        }

        // check password matched or not
        if(!await authService.checkPasswordMatched(userDetails._id,password)) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                status: httpStatus.UNAUTHORIZED,
                message: t("text_user_login_fail")
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
            message: t('text_user_login_success'), 
            response : {
                ...userDetails,
                accessToken
            }
        });
    } catch (error) {
        console.log(error)
        return res.status(httpStatus.BAD_REQUEST).json({
            status: httpStatus.BAD_REQUEST,
            message: t("text_rest_something_went_wrong")
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
        message: t("text_user_logout")
    })
};