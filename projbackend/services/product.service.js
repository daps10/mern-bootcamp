const Product = require('../models/product.model')

const findAllProducts = async (
    limit,
    page
) => {
    const products = await Product
                            .find()
                            .select("-photo")
                            .skip((page * limit) - limit)
                            .limit(limit);
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
    const product = await Product.findByIdAndUpdate(
        { _id: id },
        { $set: updateBody },
        { new:true, useFindAndModify:false }
    );
    return (!product) ? product : await product.transform();
};

const deleteProduct = async (id) => {
    const product = await Product.findByIdAndDelete(id);
    return product;
};

module.exports = {
    findAllProducts,
    findOne,
    findById,
    createProduct,
    updateProduct,
    deleteProduct
};