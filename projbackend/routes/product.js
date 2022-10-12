const express = require('express')
const router = express.Router()

// upload photo
router.post('/photo/:productId', (req, res) => {
    res.send('Upload photo')
})

// Get all categories
router.get('/categories', (req, res) => {
    res.send('get all categories')
})

// create product
router.post('/create', (req, res) => {
    res.send('Product create')
})

// Get product
router.get('/:productId', (req, res) => {
    res.send('Retrieve product')
})

// Delete product
router.delete('/:productId', (req, res) => {
    res.send('Delete product')
})

// Update product
router.put('/update/:productId', (req, res) => {
    res.send('update product')
})

module.exports = router;