const Product = require('../models/product.model')

const findAllProducts = async () => {
    const products = await Product.find();
    const response= [];
    for (let product of products) {
        product = await product.transform();
        response.push(product)
    }

    return response;
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
    const product = await new Product(productBody).save();
    return (!product) ? product : await product.transform();
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