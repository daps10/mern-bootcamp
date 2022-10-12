const express = require('express')
const router = express.Router()

// getUser
router.get('/read', (req, res) => {
    res.send('Read user')
})

// update user
router.put('/update/:userId', (req, res) => {
    res.send('Update User')
})

// list user
router.get('/', (req, res) => {
    res.send('Get all User')
})

module.exports = router;