const { check, validationResult } = require('express-validator');

const addCategory = [
    check('name', "Name field is required")
        .not().isEmpty()
        .withMessage('Name should not be empty')    
        .isLength({ min: 2 })
        .withMessage('Name should be at least 2 chars long')
];

const updateCategory = [
    check('name', "Name field is required")
        .not().isEmpty()
        .withMessage('Name should not be empty')    
        .isLength({ min: 1 })
        .withMessage('Name should be at least 1 chars long')
];

module.exports = {
    addCategory,
    updateCategory
};