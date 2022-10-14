const express = require('express')
const { checkAuthorization } = require("../middlewares/auth/authorization");
const isEmailUpdateTaken = require("../middlewares/auth/isEmailUpdateTaken");
const router = express.Router()

// validations
const validate  = require("../middlewares/validate")
const userValidation = require('../validations/user.validation');

// User routes
const { 
    getUserById,
    updateUser,
    listAllUser
} = require("../controllers/user.controller")

// list user
router.get(
    '/',
    checkAuthorization,
    listAllUser
);


// getUser
router.get(
    '/:id', 
    checkAuthorization,
    getUserById
);

// update user
router.put(
    '/update', 
    userValidation.updateUser,
    validate,
    checkAuthorization,
    isEmailUpdateTaken,
    updateUser
);

module.exports = router;