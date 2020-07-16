const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Book = require('./Book.model');
const port = 8080;
const db = 'mongodb://localhost/example';  // Using a database called example

mongoose.mongo.connect(db,
    { useUnifiedTopology: true }            // I defined that on connect cause of some type of error with the mongodb constructor 
);

app.get('/', function (req, res) {
    res.send('happy to be here')            //Simple response from the database just to check if it all work
});

app.get('/books', function (req, res) {
    console.log('getting all books');
    Book.find({})
        .exec(function (err, books) {
            if (err) {
                res.send('error occured')
            } else {
                console.log(books);
                res.json(books);
            }
        });
});




app.listen(port, function () {
    console.log('app listening on port: ' + port);
});

