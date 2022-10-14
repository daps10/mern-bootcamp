const express = require('express')
const router = express.Router()
const { checkAuthorization } = require("../middlewares/auth/authorization");
const isEmailTaken = require("../middlewares/auth/isEmailTaken");

// validations
const validate  = require("../middlewares/validate")
const authValidation = require('../validations/auth.validation');

const {
    signup,
    signin,
    signout
} = require("../controllers/auth.controller");

// signout
router.post(
    '/signup', 
    authValidation.signup,
    validate,
    isEmailTaken,
    signup
)

// signin
router.post(
    '/signin',
    authValidation.signin,
    validate,
    signin
)

// signout
router.get(
    '/signout',
    checkAuthorization, 
    signout
)

module.exports = router;