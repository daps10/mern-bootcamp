const httpStatus = require('http-status');
const categoryModel = require('../../models/category.model');

const isCategoryNameTaken = async(req, res, next) => {
    try {
        const categoryId = req.params.id;

        if(await categoryModel.isNameTaken(req.body.name, categoryId)) {
            return res.status(httpStatus.BAD_REQUEST).send({
                status: httpStatus.BAD_REQUEST,
                message: "Category name already taken!"
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

module.exports = isCategoryNameTaken;