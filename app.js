var express = require('express');
var mongoose = require('mongoose');
var dotenv = require('dotenv')
const port = 3000;

var app = express();
dotenv.config();

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Database connected"))
    .catch(err => console.log(err));

app.listen(port, console.log(`Listening on port ${port}`))