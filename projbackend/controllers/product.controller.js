const {t} = require('localizify');
const httpStatus = require('http-status');
const { productService } = require("../services");

exports.uploadedPhoto = async (req, res) => {
    res.status(200).json({ 
        msg: 'Uploaded photo successfully' 
    });
};

exports.getCategories = async (req, res) => {
    res.status(200).json({ 
        msg: 'Get all categories successfully' 
    });
};

exports.createProduct = async (req, res) => {
    res.status(200).json({ 
        msg: 'Product created successfully!' 
    });
};

exports.getProduct = async (req, res) => {
    res.status(200).json({ 
        msg: 'Product retrieved successfully!' 
    });
};

exports.getAllProduct = async (req, res) => {
    res.status(200).json({ 
        msg: 'Product retrieved successfully!' 
    });
};

exports.deleteProduct = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const categoryData = await categoryService.findById(categoryId);
        if(!categoryData) {
            return res.status(httpStatus.NOT_FOUND).json({
                status: httpStatus.NOT_FOUND,
                message:  t("text_category_not_found"),
            });
        } 

        res.status(httpStatus.OK).json({
            status: httpStatus.OK,
            message: t("text_category_found"),
            response: categoryData
        });
    } catch (error) {
        console.log(error)
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: t("text_rest_something_went_wrong")
        });     
    }
};

exports.updateProduct = async (req, res) => {
    res.status(200).json({ 
        msg: 'Product updated successfully!' 
    });
};