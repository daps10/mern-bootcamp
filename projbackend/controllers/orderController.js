exports.getAllOrders = async (req, res) => {
    res.status(200).json({ 
        msg: 'Retrieved all orders successfully' 
    });
};

exports.getOrder = async (req, res) => {
    res.status(200).json({ 
        msg: 'Get order details successfully' 
    });
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