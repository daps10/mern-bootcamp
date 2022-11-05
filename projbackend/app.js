const express = require('express')
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const xss = require('xss-clean');

/* Language File Load */
const {default: localizify} = require('localizify');
const helmet = require('helmet');

// Get routes 
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const categoryRoute = require("./routes/category");
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");

// config 
const config = require('./config/config');

// loggers
const logger = require('./config/logger');
const morgan = require('./config/morgan');

const app = express();

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

/* set localization */
const en = require('./locales/en.json');
localizify
  .add('en', en)
  .setLocale("en");

// connect mongoose
const URL = config.mongoose.url;

mongoose.connect( URL , config.mongoose.options)
.then(() => {
    logger.info('Connected to MongoDB');
})
.catch(() => {
  console.log("DB not connected");
});

// third party middlewares
app.use(bodyParser.json());
app.use(cookieParser());

// set security HTTP headers
app.use(helmet({
  crossOriginResourcePolicy: false,
}));


// sanitize request data
app.use(xss());

// enable cors
app.use(cors());
app.options('*', cors());

// Initial route
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// My routes
app.use("/api/auth", authRoute)
app.use("/api/user", userRoute)
app.use("/api/product", productRoute)
app.use("/api/category", categoryRoute)
app.use("/api/order", orderRoute)

// Listned on the port 
let server =app.listen(config.port, () => {
  logger.info(`Listening to port : ${config.port || 8000}`);
})


const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});