const express = require('express')
const router = express.Router()

const {
    signup,
    signin,
    signout
} = require("../controllers/authController");

// signout
router.post('/signup', signup)

// signin
router.post('/signin', signin)

// signout
router.get('/signout', signout)

module.exports = router;