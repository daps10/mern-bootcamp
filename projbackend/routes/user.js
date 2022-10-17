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
    listAllUser,
    getPurchaseList
} = require("../controllers/user.controller");
const getUser = require('../middlewares/auth/getUser');

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
    getUser,
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

// Get user's purchase list
router.get(
    '/orders/:userId', 
    checkAuthorization,
    getPurchaseList
);

module.exports = router;