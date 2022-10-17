const {t} = require('localizify');
const httpStatus = require('http-status');
const { orderService } = require("../services");

exports.getAllOrders = async (req, res) => {
    try {
        const orderData = await orderService.findAllOrders();
        if(orderData.length > 0) {
            return res.status(httpStatus.OK).json({
                status: httpStatus.OK,
                message: t("text_order_list_found"),
                response: orderData
            });
        } else {
            return res.status(httpStatus.NOT_FOUND).json({
                status: httpStatus.NOT_FOUND,
                message: t("text_order_list_not_found")
            });
        }
    } catch (error) {
        console.log(error)
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: t("text_rest_something_went_wrong")
        });     
    }
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
    try {
        req.body.order.user = req.userData;
        const orderResponse = await orderService.createOrder(req.body);
        if(!orderResponse) {
            return res.status(httpStatus.BAD_REQUEST).json({
                status: httpStatus.BAD_REQUEST,
                message: t("text_order_not_created")
            });
        } 

        res.status(httpStatus.OK).json({
            status: httpStatus.OK,
            message:  t("text_order_created"),
            response: orderResponse
        });
    } catch (error) {
        console.log(error)
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: t("text_rest_something_went_wrong")
        });   
    }
};

exports.updateOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const status = req.params.status;
        const orderResponse = await orderService.updateOrder(status, orderId);
        if(!orderResponse) {
            return res.status(httpStatus.BAD_REQUEST).json({
                status: httpStatus.BAD_REQUEST,
                message: t("text_order_not_updated")
            });
        } 

        res.status(httpStatus.OK).json({
            status: httpStatus.OK,
            message:  t("text_order_updated"),
            response: orderResponse
        });
    } catch (error) {
        console.log(error)
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: t("text_rest_something_went_wrong")
        });   
    }
};