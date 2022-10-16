const { check, validationResult } = require('express-validator');

const addProduct = [
    check('name', "Name field is required")
        .not().isEmpty()
        .withMessage('Name should not be empty')    
        .isLength({ min: 3 })
        .withMessage('Name should be at least 3 chars long')
        .isLength({ max: 32 })
        .withMessage('Name should not be more than 32 chars long'),
    check('description', "Description field is required")
        .not().isEmpty()
        .withMessage('Description should not be empty')    
        .isLength({ min: 3 })
        .withMessage('Description should be at least 3 chars long')
        .isLength({ max: 2000 })
        .withMessage('Description should not be more than 2000 chars long'),
    check('price', "Price field is required")
        .not().isEmpty()
        .withMessage('Price should not be empty')    
        .isDecimal()
        .withMessage('Price must be numeric.'),
    check('stock', "Stock field is required")
        .not().isEmpty()
        .withMessage('Stock should not be empty')    
        .isDecimal()
        .withMessage('Stock must be numeric.')
];

const updateProduct = [
    check('name', "Name field is required")
        .not().isEmpty()
        .withMessage('Name should not be empty')    
        .isLength({ min: 3 })
        .withMessage('Name should be at least 3 chars long')
        .isLength({ max: 32 })
        .withMessage('Name should not be more than 32 chars long'),
    check('description', "Description field is required")
        .not().isEmpty()
        .withMessage('Description should not be empty')    
        .isLength({ min: 3 })
        .withMessage('Description should be at least 3 chars long')
        .isLength({ max: 2000 })
        .withMessage('Description should not be more than 2000 chars long'),
    check('price', "Price field is required")
        .not().isEmpty()
        .withMessage('Price should not be empty')    
        .isDecimal()
        .withMessage('Price must be numeric.'),
    check('stock', "Stock field is required")
        .not().isEmpty()
        .withMessage('Stock should not be empty')    
        .isDecimal()
        .withMessage('Stock must be numeric.')
];

module.exports = {
    addProduct,
    updateProduct
};