const express = require('express')
const router = express.Router()

const{
    uploadedPhoto,
    getCategories,
    createProduct,
    getProduct,
    getAllProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/product.controller");

// upload photo
router.post('/photo/:productId', uploadedPhoto)

// Get all categories
router.get('/categories', getCategories)

// Get product
router.get('/:id', getProduct)

// Get all product
router.get('/', getAllProduct)

// create product
router.post('/create', createProduct)


// Delete product
router.delete('/:productId', deleteProduct)

// Update product
router.put('/update/:productId', updateProduct)

module.exports = router;