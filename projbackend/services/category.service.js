const Category = require('../models/category.model')

const findAllCategories = async () => {
    const categories = await Category.find();
    const response= [];
    for (let category of categories) {
        category = await category.transform();
        console.log(category)
        response.push(category)
    }

    return response;
};

const findOne = async (params) => {
    const category = await Category.findOne(params);
    return (!category) ? category : await Category.transform();
};

const findById = async (id) => {
    const category = await Category.findById(id);
    return (!category) ? category : await category.transform();
};

const createCategory = async (categoryBody) => {
    const category = await new Category(categoryBody).save();
    return (!category) ? category : await category.transform();
};

const updateCategory = async (updateBody, id) => {
    const category = await Category.findByIdAndUpdate(
        { _id: id },
        { $set: updateBody },
        { new:true, useFindAndModify:false }
    );
    return (!category) ? category : await category.transform();
};

const deleteCategory = async (id) => {
    const category = await Category.findByIdAndDelete(id);
    return category;
};

module.exports = {
    findAllCategories,
    findOne,
    findById,
    createCategory,
    updateCategory,
    deleteCategory
};