const express = require('express')
const router = express.Router()

const { 
    readUser,
    updateUser,
    listAllUser
} = require("../controllers/user.controller")

// getUser
router.get('/read', readUser)

// update user
router.put('/update', updateUser)

// list user
router.get('/', listAllUser)

module.exports = router;