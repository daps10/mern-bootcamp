const express = require('express')
const router = express.Router()

// signout
router.post('/signup', (req, res) => {
    res.send('User Signup')
})

// signin
router.post('/signin', (req, res) => {
    res.send('User Signup')
})

// signout
router.get('/signout', (req, res) => {
    res.send('User signout')
})

module.exports = router;