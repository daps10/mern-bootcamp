const {t} = require('localizify');
const httpStatus = require('http-status');
const _ = require('lodash');
const { 
    productService,
    categoryService
} = require("../services");

exports.uploadedPhoto = async (req, res) => {
    res.status(200).json({ 
        msg: 'Uploaded photo successfully' 
    });
};

// Get categories
exports.getCategories = async (req, res) => {
    try {
        const categoryData = await categoryService.findAllCategories();
        if(categoryData.length > 0) {
            return res.status(httpStatus.OK).json({
                status: httpStatus.OK,
                message: t("text_category_list_found"),
                response: categoryData
            });
        } else {
            return res.status(httpStatus.NOT_FOUND).json({
                status: httpStatus.NOT_FOUND,
                message: t("text_category_list_not_found")
            });
        }
    } catch (error) {
        console.log(error)
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: t("text_rest_something_went_wrong")
        });     
    }
};

// Get product by id
exports.getProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const productData = await productService.findById(productId);
        if(!productData || productData == null) {
            return res.status(httpStatus.NOT_FOUND).json({
                status: httpStatus.NOT_FOUND,
                message: t("text_product_not_found")
            });
            
        }
        return res.status(httpStatus.OK).json({
            status: httpStatus.OK,
            message: t("text_product_found"),
            response: productData
        });
    } catch (error) {
        console.log(error)
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: t("text_rest_something_went_wrong")
        });     
    }
};

// Get all products 
exports.getAllProduct = async (req, res) => {
    try {
        const productData = await productService.findAllProducts();
        if(_.size(productData) <= 0) {
            return res.status(httpStatus.NOT_FOUND).json({
                status: httpStatus.NOT_FOUND,
                message: t("text_product_list_not_found")
            });
        }
        return res.status(httpStatus.OK).json({
            status: httpStatus.OK,
            message: t("text_product_list_found"),
            response: productData
        });
    } catch (error) {
        console.log(error)
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: t("text_rest_something_went_wrong")
        });     
    }
};

// Product created
exports.createProduct = async (req, res) => {
    try {
        const productData = await productService.createProduct(req.body);
        if(!productData) {
            return res.status(httpStatus.BAD_REQUEST).json({
                status: httpStatus.BAD_REQUEST,
                message: t("text_product_not_created")
            });
        } 

        res.status(httpStatus.OK).json({
            status: httpStatus.OK,
            message:  t("text_product_created"),
            response: productData
        });
    } catch (error) {
        console.log(error)
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: t("text_rest_something_went_wrong")
        });     
    }
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