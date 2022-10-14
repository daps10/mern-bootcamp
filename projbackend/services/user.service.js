const User = require('../models/user.model');

const findAllUsers = async (params) => {
    const userResponse = await User.find({
        _id: { $ne: params.id }
    });

    const response= [];
    for (let user of userResponse) {
        user = await user.transform();
        response.push(user)
    }
    // console.log("user data", userResponse)
    return response;
};

const findOne = async (params) => {
    const user = await User.findOne(params);
    return (!user) ? user : await user.transform();
};

const findById = async (id) => {
    const user = await User.findById(id);
    return (!user) ? user : await user.transform();
};

const updateUser = async (updateBody, id) => {
    const user = await User.findByIdAndUpdate(
        { _id: id },
        { $set: updateBody },
        { new:true, useFindAndModify:false }
    );

    return (!user) ? user : await user.transform();
};

module.exports = {
    findAllUsers,
    findOne,
    findById,
    updateUser
};