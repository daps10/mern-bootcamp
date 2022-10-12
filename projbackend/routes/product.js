const express = require('express')
const router = express.Router()

const{
    uploadedPhoto,
    getCategories,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");

// upload photo
router.post('/photo/:productId', uploadedPhoto)

// Get all categories
router.get('/categories', getCategories)

// create product
router.post('/create', createProduct)

// Get product
router.get('/:productId', getProduct)

// Delete product
router.delete('/:productId', deleteProduct)

// Update product
router.put('/update/:productId', updateProduct)

module.exports = router;