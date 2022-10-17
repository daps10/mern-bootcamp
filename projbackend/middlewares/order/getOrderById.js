const httpStatus = require('http-status');
const Order = require('../../models/order.model');

const getOrderById = async(req, res, next) => {
    try {
        const order = await Order
                                .findById(req.params.id)
                                .populate("products.product", "name price");
        if(!order){  
            return res.status(httpStatus.NOT_FOUND).json({
                status: httpStatus.NOT_FOUND,
                message: t("text_order_not_found")
            });
        }
        req.orderData = order;
        // req.orderData = (!order) ? order : await order.transform();
        next();

    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: "Something went wrong!"
        });
    }
}

module.exports = getOrderById;