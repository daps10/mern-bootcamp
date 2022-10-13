const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator');

const {
    signup,
    signin,
    signout
} = require("../controllers/authController");

// signout
router.post(
    '/signup',
    [
        check('name', "Name field is required")
            .isLength({ min: 3 })
            .withMessage('Name should be at least 3 chars long')
            .isLength({ min: 32 })
            .withMessage('Name should be at least 32 chars long'),
        check('lastName', "Last name field must be required!")
            .isLength({ min: 3 })
            .withMessage('Last name should be at least 3 chars long')
            .isLength({ min: 32 })
            .withMessage('Last name should be at least 32 chars long'),
        check('email', "Email should be atleast 5 characters").isEmail(),
        check('password', "Password field must be required!")
            .isLength({ min: 3 })
            .withMessage('Name should be at least 3 chars long')
            .isLength({ min: 16 })
            .withMessage('Password should be at least 16 chars long'),
    ], 
    signup
)

// signin
router.post('/signin', signin)

// signout
router.get('/signout', signout)

module.exports = router;