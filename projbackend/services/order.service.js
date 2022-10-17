const Order = require('../models/order.model')

const findAllOrders = async () => {
    const orders = await Order.find()
                                .populate("user", "_id name");
    const response= [];
    for (let order of orders) {
        // order = await order.transform();
        response.push(order)
    }

    return response;
};

const createOrder = async (orderBody) => {
    const order = await new Order(orderBody).save();
    return order;
};

const updateOrder = async (status, id) => {
    const order = await Order.findByIdAndUpdate(
        { _id: id },
        { $set: { status: status } },
        { new:true, useFindAndModify:false }
    );
    return order;
};

module.exports = {
    findAllOrders,
    createOrder,
    updateOrder
};