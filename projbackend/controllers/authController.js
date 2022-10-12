exports.signup = async (req, res) => {
    res.status(200).json({ 
        msg: 'Signup successfully' 
    });
};

exports.signin = async (req, res) => {
    res.status(200).json({ 
        msg: 'Signin successfully' 
    });
};

exports.signout = async (req, res) => {
    res.status(200).json({ msg: 'Signout successfully' });
};