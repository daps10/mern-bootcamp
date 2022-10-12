exports.readUser = async (req, res) => {
    res.status(200).json({ 
        msg: 'Read user successfully' 
    });
};

exports.updateUser = async (req, res) => {
    res.status(200).json({ 
        msg: 'Update user successfully' 
    });
};

exports.listAllUser = async (req, res) => {
    res.status(200).json({ 
        msg: 'List all users successfully' 
    });
};