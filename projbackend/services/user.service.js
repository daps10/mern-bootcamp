const User = require('../models/user.model');

const findOne = async (params) => {
    const user = await User.findOne(params);
    return (!user) ? user : await user.transform();
};

const findById = async (id) => {
    const user = await User.findById(id);
    return (!user) ? user : await user.transform();
};

const updateUser = async (updateBody, id) => {
    const user = await User.findById(id);
    Object.assign(user, updateBody);
    await user.save();
    return user;
};

module.exports = {
  findOne,
  findById,
  updateUser
};