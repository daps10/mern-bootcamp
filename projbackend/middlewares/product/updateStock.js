const {t} = require('localizify');
const httpStatus = require('http-status');
const Product = require('../../models/product.model')

const updateStock = async(req, res, next) => {
    try {
        // my operations
        let myOperations = req.body.order.products.map( prod => {
            return {
                updateOne: {
                    filter: { _id: prod._id },
                    update: { $inc: { stock: -prod.count, sold: +prod.count }}
                }
            }
        });

        Product.bulkWrite(myOperations, {} , (err, products) => {
            if(err) {
                return res.status(httpStatus.BAD_REQUEST).send({
                    status: httpStatus.BAD_REQUEST,
                    message: t("text_bulk_request_not_work")
                });            
            }
            next();
        })
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: t("text_not_able_to_save_user")
        });
    }
}

module.exports = updateStock;