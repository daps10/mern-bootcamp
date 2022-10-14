const { validationResult } = require('express-validator');
const httpStatus = require('http-status');

const validate= (req, res, next) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(httpStatus.BAD_REQUEST).json({ 
            status: httpStatus.BAD_REQUEST,
            message: errors.array()[0].msg 
        });
    }

    next();
};

module.exports = validate;