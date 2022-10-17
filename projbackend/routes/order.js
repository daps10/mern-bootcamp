const express = require('express')
const router = express.Router()

const {
    getAllOrders,
    getOrder,
    createOrder,
    updateOrder
} = require("../controllers/order.controller")

const { checkAuthorization } = require("../middlewares/auth/authorization");
const isAdmin = require('../middlewares/auth/isAdmin');
const pushOrderInPurchaseList = require('../middlewares/pushOrderInPurchaseList');
const updateStock = require('../middlewares/product/updateStock');
const getOrderById = require('../middlewares/order/getOrderById');
const getUser = require('../middlewares/auth/getUser');

// Get all orders
router.get(
    '/:userId', 
    checkAuthorization,
    isAdmin,
    getAllOrders
)

// Get order
router.get(
    '/:id',
    checkAuthorization,
    getOrderById, 
    getOrder
);

// Create order
router.post(
    '/create', 
    checkAuthorization,
    pushOrderInPurchaseList,
    updateStock,
    getUser,
    createOrder
)

// Update order
router.put(
    '/update/:status/:orderId', 
    checkAuthorization,
    pushOrderInPurchaseList,
    updateStock,
    getUser,
    updateOrder
)

module.exports = router;