const express = require('express')
const router = express.Router()
const { checkAuthorization } = require("../middlewares/auth/authorization");

// Validate middleware 
const validate  = require("../middlewares/validate")
const productValidation = require('../validations/product.validation');
const isAdmin = require('../middlewares/auth/isAdmin');
const getProductById = require('../middlewares/product/getProductById');

// Fetch controllers
const{
    getCategories,
    createProduct,
    getProduct,
    getAllProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/product.controller");
const fileUpload = require('../middlewares/product/fileUpload');

// Get all categories
router.get(
    '/categories',
    checkAuthorization, 
    getCategories
);

// Get product
router.get(
    '/:id', 
    checkAuthorization,
    getProductById,
    getProduct
);

// Get all product
router.get(
    '/', 
    checkAuthorization,
    getAllProduct
);

// create product
router.post(
    '/create', 
    checkAuthorization,
    isAdmin,
    fileUpload,
    productValidation.addProduct,
    validate,
    createProduct
);

// Update product
router.put(
    '/update/:id',
    checkAuthorization,
    isAdmin,
    fileUpload,
    productValidation.updateProduct,
    validate,
    updateProduct
);

// Delete product
router.delete(
    '/:id', 
    checkAuthorization,
    isAdmin,
    deleteProduct
);

module.exports = router;