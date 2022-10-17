const express = require('express')
const router = express.Router()

const {
    getAllOrders,
    getOrder,
    createOrder,
    updateOrder
} = require("../controllers/order.controller")

const isAdmin = require('../middlewares/auth/isAdmin');
const pushOrderInPurchaseList = require('../middlewares/pushOrderInPurchaseList');
const updateStock = require('../middlewares/product/updateStock');
const getOrderById = require('../middlewares/order/getOrderById');

// Get all orders
router.get(
    '/:userId', 
    getAllOrders
)

// Get order
router.get(
    '/:id',
    getOrderById, 
    getOrder
);

// Create order
router.post(
    '/create', 
    createOrder
)

// Update order
router.put(
    '/update/:status/:orderId', 
    updateOrder
)

module.exports = router;