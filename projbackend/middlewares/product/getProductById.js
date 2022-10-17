const httpStatus = require('http-status');
const Product = require('../../models/product.model');

const getProductById = async(req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if(!product){  
            return res.status(httpStatus.NOT_FOUND).json({
                status: httpStatus.NOT_FOUND,
                message: t("text_product_not_found")
            });
        }

        product.photo = undefined;
        req.productData = (!product) ? product : await product.transform();
        next();

    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: "Something went wrong!"
        });
    }
}

module.exports = getProductById;