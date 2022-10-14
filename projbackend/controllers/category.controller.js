const httpStatus = require('http-status');
const { categoryService } = require("../services");

exports.getCategories = async (req, res) => {
    try {
        const categoryData = await categoryService.findAllCategories();
        if(categoryData.length > 0) {
            return res.status(httpStatus.OK).json({
                status: httpStatus.OK,
                message: "Category list has been found successfully!",
                response: categoryData
            });
        } else {
            return res.status(httpStatus.NOT_FOUND).json({
                status: httpStatus.NOT_FOUND,
                message: "Category list has been not found!"
            });
        }
    } catch (error) {
        console.log(error)
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: "Something went wrong!"
        });     
    }
};

exports.getCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const categoryData = await categoryService.findById(categoryId);
        if(!categoryData) {
            return res.status(httpStatus.NOT_FOUND).json({
                status: httpStatus.NOT_FOUND,
                message: "Category details has not been found!"
            });
        } 

        res.status(httpStatus.OK).json({
            status: httpStatus.OK,
            message: "Category details has been found successfully!",
            response: categoryData
        });
    } catch (error) {
        console.log(error)
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: "Something went wrong!"
        });     
    }
};

exports.createCategory = async (req, res) => {
    try {
        const categoryData = await categoryService.createCategory(req.body);
        if(!categoryData) {
            return res.status(httpStatus.BAD_REQUEST).json({
                status: httpStatus.BAD_REQUEST,
                message: "Category has not been created!"
            });
        } 

        res.status(httpStatus.OK).json({
            status: httpStatus.OK,
            message: "Category details has been created successfully!",
            response: categoryData
        });
    } catch (error) {
        console.log(error)
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: "Something went wrong!"
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
                message: "Category has not been updated!"
            });
        }

        res.status(httpStatus.OK).json({
            status: httpStatus.OK,
            message: "Category has been updated successfully!",
            response: categoryResponse
        });
    } catch (error) {
        console.log(error)
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: "Something went wrong!"
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
                message: "Category has not been deleted!"
            });
        }

        res.status(httpStatus.OK).json({
            status: httpStatus.OK,
            message: "Category has been deleted successfully!"
        });
    } catch (error) {
        console.log(error)
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: "Something went wrong!"
        });
    }
};
