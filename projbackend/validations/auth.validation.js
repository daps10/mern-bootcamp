const { check, validationResult } = require('express-validator');

const signup = [
    check('name', "Name field is required")
        .not().isEmpty()
        .withMessage('Name should not be empty')    
        .isLength({ min: 3 })
        .withMessage('Name should be at least 3 chars long'),
    check('lastname')
        .not().isEmpty()
        .withMessage('Last name should not be empty')    
        .isLength({ min: 3 })
        .withMessage('Last name should be at least 3 chars long'),
    check('email')
        .not().isEmpty()
        .withMessage('Email should not be empty')    
        .isEmail()
        .withMessage('Email does not in valid format'),
    check('password')
        .not().isEmpty()
        .withMessage('Password should not be empty')
        .isLength({ min: 3 })
        .withMessage('Password should be at least 3 chars long'),
];

const signin = [
    check('email')
        .not().isEmpty()
        .withMessage('Email should not be empty')    
        .isEmail()
        .withMessage('Email does not in valid format'),
    check('password')
        .not().isEmpty()
        .withMessage('Password should not be empty')
        .isLength({ min: 1 })
        .withMessage('Password should be at least 1 chars long'),
]; 

module.exports = {
  signup,
  signin
};