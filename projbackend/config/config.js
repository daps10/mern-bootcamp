require("dotenv").config();

module.exports = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    mongoose: {
        url: process.env.MONGODB_URL + (process.env.NODE_ENV === 'test' ? '-test' : ''),
        options: { 
            useCreateIndex: true,
            useUnifiedTopology: true,
            useNewUrlParser: true
        },
    },
    jwt: {
        secret: process.env.ACCESS_TOKEN_SECRET,
        accessExpirationMinutes: process.env.ACCESS_TOKEN_LIFE
    },
    fileMaxSize : 4 * 1024 * 1024,
    allowedTypes : ["jpg", "jpeg", "png", "pdf"],
    perPage: 10,
    defaultPage: 1
};