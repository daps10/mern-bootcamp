const express = require('express')
const { checkAuthorization } = require("../middlewares/auth/authorization");
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
    updateUser
);

// list user
router.get(
    '/', 
    listAllUser
);

module.exports = router;