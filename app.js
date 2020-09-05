var express = require('express');
var mongoose = require('mongoose');
var dotenv = require('dotenv')
var dns = require('dns');
var bodyParser = require('body-parser')

const port = 3000;

var app = express();
var Schema = mongoose.Schema;
dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Database connected"))
    .catch(err => console.log(err));

var urlSchema = new Schema({
    url : { type: String }
})

var Url = mongoose.model("Url", urlSchema);

app.post('/api/shorturl/new', (req, res) => {
    var postUrl = req.body.url;

    dns.lookup(postUrl, (err) => {
        if(err) {
            return res.json({"error":"invalid URL"})
        }

        var createUrl = new Url({url: postUrl});
        createUrl
            .save()
            .then(doc => console.log(doc))
            .catch(err => console.log(err));

    })
})

app.listen(port, console.log(`Listening on port ${port}`))