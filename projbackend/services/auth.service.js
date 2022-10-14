const httpStatus = require('http-status');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const createUser = async (userBody) => {
    const user = await new User(userBody).save();;
    return await user.transform();
};

const findOne = async (params) => {
    const user = await User.findOne(params);
    return (!user) ? user : await user.transform();
};

const generateAccessToken = async (id) => {
    return jwt.sign({
        _id: id
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_LIFE
    })
};

const updateUser = async (updateBody, id) => {
    const user = await User.findById(id);
    Object.assign(user, updateBody);
    await user.save();
    return user;
};

const checkPasswordMatched = async (id, plainPassword) => {
    const user = await User.findById(id);
    if(!user.authenticate(plainPassword)) {
        return false;
    }
    return true;
}


module.exports = {
  createUser,
  findOne,
  generateAccessToken,
  updateUser,
  checkPasswordMatched,
};