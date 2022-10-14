const express = require('express')
const { checkAuthorization } = require("../middlewares/auth/authorization");const router = express.Router()

// validations
const validate  = require("../middlewares/validate")
const categoryValidation = require('../validations/category.validation');
const isCategoryNameTaken = require('../middlewares/category/isCategoryNameTaken');
const isUpdateCategoryNameTaken = require('../middlewares/category/isUpdateCategoryNameTaken');
const checkCategoryExist = require('../middlewares/category/checkCategoryExist');

// controllers
const {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
} = require("../controllers/category.controller");


// Get all categories
router.get(
    '/', 
    checkAuthorization,
    getCategories
);

// Get category
router.get(
    '/:id', 
    checkAuthorization,
    getCategory
);

// Create category
router.post(
    '/create', 
    categoryValidation.addCategory,
    validate,
    checkAuthorization,
    isCategoryNameTaken,
    createCategory
);

// Delete category
router.delete(
    '/:id', 
    checkAuthorization,
    checkCategoryExist,
    deleteCategory
)

// Update category
router.put(
    '/update/:id',
    categoryValidation.updateCategory,
    validate, 
    checkAuthorization,
    isUpdateCategoryNameTaken,
    updateCategory
);

module.exports = router;