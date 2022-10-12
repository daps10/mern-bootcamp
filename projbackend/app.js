const express = require('express')
const mongoose = require("mongoose");

const app = express();
const port = 3000

// connect mongoose
const URL = "mongodb+srv://daps:ZZoT4SPbypaXc5fd@cluster0.nrn2f.mongodb.net/mern-bootcamp";

mongoose.connect( URL , { 
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
})
.then(() => {
    console.log("DB CONNECTED");
});

// Initial route
app.get('/', (req, res) => {
  res.send('Hello World!')
})


// Listned on the port 
app.listen(port, () => {
  console.log(`APP is running at ${port}`)
})