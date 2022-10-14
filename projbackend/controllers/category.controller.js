exports.getCategories = async (req, res) => {
    res.status(200).json({ 
        msg: 'Get all categories successfully' 
    });
};

exports.getCategory = async (req, res) => {
    res.status(200).json({ 
        msg: 'Get category details successfully' 
    });
};

exports.createCategory = async (req, res) => {
    res.status(200).json({ 
        msg: 'Category created successfully!' 
    });
};

exports.updateCategory = async (req, res) => {
    res.status(200).json({ 
        msg: 'Category updated successfully!' 
    });
};

exports.deleteCategory = async (req, res) => {
    res.status(200).json({ 
        msg: 'Category deleted successfully!' 
    });
};
