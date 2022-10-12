const express = require('express')
const router = express.Router()

// Get all orders
router.get('/:userId', (req, res) => {
    res.send('Get all orders')
})

// Get order
router.get('/:orderId', (req, res) => {
    res.send('Retrieve order')
})

// Create order
router.post('/create', (req, res) => {
    res.send('Create order')
})

// Update order
router.put('/update/:status/:orderId', (req, res) => {
    res.send('update order')
})

module.exports = router;