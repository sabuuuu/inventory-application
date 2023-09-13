const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const bodyParser = require("body-parser");



const app = express();

app.use(express.json());
app.use(cors({ origin: true }));

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})
  


mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('connected to mongodb');
    app.listen(process.env.PORT, () => {
        console.log('listening to port', process.env.PORT);
    });
})
.catch((error) => {
    console.log(error);
})