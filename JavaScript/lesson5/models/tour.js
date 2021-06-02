var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tourShema = new Schema({
    "title": String,
    "route": String,
    "days": Number,
    "price": Number
});

var Tour = mongoose.model('Tour', tourShema);
module.exports = Tour;