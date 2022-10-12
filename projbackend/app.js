const express = require('express')
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

// Get routes 
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const categoryRoute = require("./routes/category");
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");

const app = express();
const port = process.env.PORT || 8000;

// connect mongoose
const URL = process.env.MONGODB_URL;

mongoose.connect( URL , { 
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
})
.then(() => {
  console.log("DB CONNECTED");
})
.catch(() => {
  console.log("DB not connected");
});

// third party middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

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
app.listen(port, () => {
  console.log(`APP is running at ${port}`)
})