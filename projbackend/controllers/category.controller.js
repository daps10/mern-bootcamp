const {t} = require('localizify');
const httpStatus = require('http-status');
const { categoryService } = require("../services");

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

exports.getCategory = async (req, res) => {
    try {
        const categoryData = req.categoryData;
        
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

exports.createCategory = async (req, res) => {
    try {
        const categoryData = await categoryService.createCategory(req.body);
        if(!categoryData) {
            return res.status(httpStatus.BAD_REQUEST).json({
                status: httpStatus.BAD_REQUEST,
                message: t("text_category_not_created")
            });
        } 

        res.status(httpStatus.OK).json({
            status: httpStatus.OK,
            message:  t("text_category_created"),
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

exports.updateCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        // Update an user
        const categoryResponse = await categoryService.updateCategory(
            req.body,
            categoryId
        );
            
        if(!categoryResponse) {
            return res.status(httpStatus.BAD_REQUEST).json({
                status: httpStatus.BAD_REQUEST,
                message:  t("text_category_not_updated")
            });
        }

        res.status(httpStatus.OK).json({
            status: httpStatus.OK,
            message:  t("text_category_updated"),
            response: categoryResponse
        });
    } catch (error) {
        console.log(error)
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: t("text_rest_something_went_wrong")
        });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        
        // Update an user
        const categoryResponse = await categoryService.deleteCategory(
            categoryId
        );
            
        if(!categoryResponse) {
            return res.status(httpStatus.BAD_REQUEST).json({
                status: httpStatus.BAD_REQUEST,
                message: t("text_category_not_deleted")
            });
        }

        res.status(httpStatus.OK).json({
            status: httpStatus.OK,
            message: t("text_category_deleted")
        });
    } catch (error) {
        console.log(error)
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: t("text_rest_something_went_wrong")
        });
    }
};
