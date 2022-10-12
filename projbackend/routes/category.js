const express = require('express')
const router = express.Router()

const {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
} = require("../controllers/categoryController")

// Get all categories
router.get('/', getCategories)

// Get category
router.get('/:categoryId', getCategory)

// Create category
router.post('/create', createCategory)

// Delete category
router.delete('/:categoryId', deleteCategory)

// Update category
router.put('/update/:categoryId', updateCategory)

module.exports = router;