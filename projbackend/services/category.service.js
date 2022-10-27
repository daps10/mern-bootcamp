const Category = require('../models/category.model')

const findAllCategories = async () => {
    const categories = await Category.find();
    const response= [];
    for (let category of categories) {
        category = await category.transform();
        response.push(category)
    }

    return response;
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
    createCategory,
    updateCategory,
    deleteCategory
};