const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Book = require('./Book.model');
const port = 8080;
const MONDODB_URI = 'mongodb://localhost/example';  // Using a database called example


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


mongoose.connect(MONDODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log("Connected to DB")
    app.listen(8080)
}).catch(err => console.log(err))

