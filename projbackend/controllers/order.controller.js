const {t} = require('localizify');
const httpStatus = require('http-status');
const { orderService } = require("../services");

exports.getAllOrders = async (req, res) => {
    res.status(200).json({ 
        msg: 'Retrieved all orders successfully' 
    });
};

exports.getOrder = async (req, res) => {
    try {
        const orderData = req.orderData;
        
        if(!orderData) {
            return res.status(httpStatus.NOT_FOUND).json({
                status: httpStatus.NOT_FOUND,
                message:  t("text_order_not_found"),
            });
        } 

        res.status(httpStatus.OK).json({
            status: httpStatus.OK,
            message: t("text_order_found"),
            response: orderData
        });
    } catch (error) {
        console.log(error)
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: t("text_rest_something_went_wrong")
        });     
    }
};

exports.createOrder = async (req, res) => {
    res.status(200).json({ 
        msg: 'Order created successfully!' 
    });
};

exports.updateOrder = async (req, res) => {
    res.status(200).json({ 
        msg: 'Order updated successfully!' 
    });
};