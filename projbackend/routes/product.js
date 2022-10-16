const express = require('express')
const router = express.Router()
const { checkAuthorization } = require("../middlewares/auth/authorization");

// Validate middleware 
const validate  = require("../middlewares/validate")
const productValidation = require('../validations/product.validation');
const isAdmin = require('../middlewares/auth/isAdmin');

// Fetch controllers
const{
    uploadedPhoto,
    getCategories,
    createProduct,
    getProduct,
    getAllProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/product.controller");
const fileUpload = require('../middlewares/product/fileUpload');

// upload photo
router.post(
    '/photo', 
    checkAuthorization,
    isAdmin,
    uploadedPhoto
);

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
    '/update/:productId',
    productValidation.updateProduct,
    validate,
    checkAuthorization,
    isAdmin, 
    updateProduct
);

// Delete product
router.delete(
    '/:productId', 
    checkAuthorization,
    isAdmin,
    deleteProduct
);

module.exports = router;