var mongoose = require('mongoose');

var tweetSchema = mongoose.Schema({
    username : String,
    profileImage : String,
    text : String,
    date : Date
},

{ collection : 'tweets' });

module.exports = mongoose.model('Tweet', tweetSchema);
