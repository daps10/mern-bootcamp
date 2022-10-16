const {t} = require('localizify');
const httpStatus = require('http-status');
const { productService } = require('../../services');

const getPhoto = async(req, res, next) => {
    try {
        const productData = await productService.findById(req.params.id);
        if(!productData || productData == null) {
            return res.status(httpStatus.NOT_FOUND).json({
                status: httpStatus.NOT_FOUND,
                message: t("text_product_not_found")
            });
        }

        if(productData.photo.data){
            res.set("Content-Type", productData.photo.contentType);
            req.productData = req.productData.photo.data;
            next();    
        } else {
            next();    
        }
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: t("text_not_able_to_save_user")
        });
    }
}

module.exports = getPhoto;