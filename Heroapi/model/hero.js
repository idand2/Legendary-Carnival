var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var hero = new Schema({
    id: Number,
    name: String    
});

module.exports = mongoose.model('Hero', hero)