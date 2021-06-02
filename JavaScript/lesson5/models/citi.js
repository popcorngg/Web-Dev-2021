var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cityShema = new Schema({
    "name": String,
    "country": String,
    "subscountry": String,
    "geonameid": String
});

var City = mongoose.model('City', cityShema);
module.exports = City;