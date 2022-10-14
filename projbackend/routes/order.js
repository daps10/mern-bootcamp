const express = require('express')
const router = express.Router()

const {
    getAllOrders,
    getOrder,
    createOrder,
    updateOrder
} = require("../controllers/order.controller")

// Get all orders
router.get('/:userId', getAllOrders)

// Get order
router.get('/:orderId', getOrder)

// Create order
router.post('/create', createOrder)

// Update order
router.put('/update/:status/:orderId', updateOrder)

module.exports = router;