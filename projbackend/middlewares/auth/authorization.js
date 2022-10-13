const jwt = require('jsonwebtoken');

exports.checkAuthorization = (req, res, next) => {
    let token = req.headers["authorization"];
    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    const bearerToken = token.split(" ")[1];
    
    // verify jwt
    jwt.verify(bearerToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }

        console.log(decoded);
        next();

    });
}