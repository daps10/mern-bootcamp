const httpStatus = require('http-status');
const Category = require('../../models/category.model');

const getCategoryById = async(req, res, next) => {
    try {
        const category = await Category.findById(req.params.id);
        if(!category){  
            return res.status(httpStatus.NOT_FOUND).json({
                status: httpStatus.NOT_FOUND,
                message: t("text_category_not_found")
            });
        }

        req.categoryData = category;
        next();

    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: "Something went wrong!"
        });
    }
}

module.exports = getCategoryById;