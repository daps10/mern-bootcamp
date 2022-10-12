const express = require('express')
const router = express.Router()

// Get all categories
router.get('/', (req, res) => {
    res.send('update product')
})

// Get category
router.get('/:categoryId', (req, res) => {
    res.send('Retrieve category')
})

// Create category
router.post('/create', (req, res) => {
    res.send('Create category')
})

// Delete category
router.delete('/:categoryId', (req, res) => {
    res.send('Delete category')
})

// Update category
router.put('/update/:categoryId', (req, res) => {
    res.send('update product')
})

module.exports = router;