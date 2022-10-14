const httpStatus = require('http-status');

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
            message: 'User has been signed up successfully!', 
            response : {
                ...userRes,
                accessToken
            }
        });
    } catch (error) {
        console.log(error)
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: "NOT able to save user in DB"
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
                message: "User doesn't exist!"
            });
        }

        // check password matched or not
        if(!await authService.checkPasswordMatched(userDetails._id,password)) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                status: httpStatus.UNAUTHORIZED,
                message: "Email and password do not match!"
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
            response : {
                ...userDetails,
                accessToken
            }
        });
    } catch (error) {
        console.log(error)
        return res.status(httpStatus.BAD_REQUEST).json({
            status: httpStatus.BAD_REQUEST,
            message: "Something went wrong!"
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