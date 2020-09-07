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
    var splitUrl = postUrl.split('//').pop()

    dns.lookup(splitUrl, (err) => {
        if(err) {
            return res.json({"error":"invalid URL"})
        }

        var createUrl = new Url({url: postUrl});
        createUrl
            .save()
            .then((doc) => {
                res.json({"original_url": doc.url, "short_url": doc._id});
            })
            .catch(err => console.log(err));
    })
})

app.get('/api/shorturl/:identifier', (req, res) => {
    var identifier = req.params.identifier;

    var findUrl = Url.findById(identifier);
    findUrl
        .then((doc) => {
            if(!doc) return res.sendStatus(404);

            res.redirect(doc.url);  
        })
        .catch(err => console.log(err));
})

app.listen(port, console.log(`Listening on port ${port}`))