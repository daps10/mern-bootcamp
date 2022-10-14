const httpStatus = require('http-status');
const categoryModel = require('../../models/category.model');

const checkCategoryExist = async(req, res, next) => {
    try {
        const categoryData = await categoryModel.findById(req.params.id);
        if(!categoryData || categoryData === null) {
            return res.status(httpStatus.NOT_FOUND).send({
                status: httpStatus.NOT_FOUND,
                message: "Category does not exist!"
            });
        }

        next();
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: "Something went wrong!"
        });
    }
}

module.exports = checkCategoryExist;