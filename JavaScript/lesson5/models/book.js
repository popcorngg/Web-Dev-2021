var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookShema = new Schema({
    "author": String,
    "title": String,
    "isPresent": Boolean
});

var Book = mongoose.model('Book', bookShema);
module.exports = Book;