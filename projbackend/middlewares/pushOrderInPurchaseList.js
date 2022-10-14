const { validationResult } = require('express-validator');
const httpStatus = require('http-status');
const { userService } = require('../services');

const pushOrderInPurchaseList= async (req, res, next) => {
    let purchases = [];
    req.body.order.products.forEach(element => {
        purchases.push({
            _id: product._id,
            name: product.name,
            description:product.description,
            category:product.category,
            quantity:product.quantity,
            amount:req.body.order.amount,
            transactionId:req.body.order.transactionId
        }) 
    });

    // Update in DB
    await userService.updateUser(
        { _id: req.currUser._id },
        { $push: { purchases: purchases }},
        { new: true }
    );
    
    next();
};

module.exports = pushOrderInPurchaseList;