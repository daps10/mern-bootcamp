exports.uploadedPhoto = async (req, res) => {
    res.status(200).json({ 
        msg: 'Uploaded photo successfully' 
    });
};

exports.getCategories = async (req, res) => {
    res.status(200).json({ 
        msg: 'Get all categories successfully' 
    });
};

exports.createProduct = async (req, res) => {
    res.status(200).json({ 
        msg: 'Product created successfully!' 
    });
};

exports.getProduct = async (req, res) => {
    res.status(200).json({ 
        msg: 'Product retrieved successfully!' 
    });
};

exports.deleteProduct = async (req, res) => {
    res.status(200).json({ 
        msg: 'Product deleted successfully!' 
    });
};

exports.updateProduct = async (req, res) => {
    res.status(200).json({ 
        msg: 'Product updated successfully!' 
    });
};