const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Book = require('./Book.model');
const port = 8080;
const MONDODB_URI = 'mongodb://localhost/example';  // Using a database called example


app.use(bodyParser.json())      // in order to use body parser and parse json or url we need to 
app.use(bodyParser.urlencoded({        // state that thats how we wana use body parser
    extended: true
}))

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

app.get('/books/:id', function (req, res) {  //take request response object as a callback
    console.log('getting one book');
    Book.findOne({   //findOne method from mongoose
        _id: req.params.id  // we are passing the same parameter as the path
    })
        .exec(function (err, book) {  // executing it so we can get an error or the book back
            if (err) {
                res.send('error occured');  // if err respond with error
            } else {
                console.log(book);      // show me my book
                res.json(book);
            }
        })
})


mongoose.connect(MONDODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log("Connected to DB")
    app.listen(8080)
}).catch(err => console.log(err))

