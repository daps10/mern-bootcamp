const Product = require('../models/product.model')

const findAllProducts = async () => {
    return [];
};

const findOne = async (params) => {
    const product = await Product.findOne(params);
    return (!product) ? product : await product.transform();
};

const findById = async (id) => {
    const product = await Product.findById(id);
    return (!product) ? product : await product.transform();
};

const createProduct = async (productBody) => {
    return {}
};

const updateProduct = async (updateBody, id) => {
    return {};
};

const deleteProduct = async (id) => {
    const category = {}
    return category;
};

module.exports = {
    findAllProducts,
    findOne,
    findById,
    createProduct,
    updateProduct,
    deleteProduct
};