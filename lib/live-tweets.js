var twitter = require('twitter'),
    util = require('util'),
    config = require('../config'),
    app = require('../app'),
    env = require('./env'),
    db = require('./db'),
    Tweet = require('./models/Tweet'),
    hashtags,
    twitterAPI;

function LiveTweets (socket) {
    this.socket = socket;

    twitterAPI = new twitter({
        consumer_key : env.get('consumerKey'),
        consumer_secret : env.get('consumerSecret'),
        access_token_key : env.get('tokenKey'),
        access_token_secret : env.get('tokenSecret'),
    });
}

LiveTweets.prototype.init = function () {
    self = this;
    hashtags = config.HASHTAGS.join(',');

    twitterAPI.stream('statuses/filter', { track : hashtags }, function (stream) {
        stream.on('data', function (data) {
            var tweetData = {
                username : '@' + data.user.screen_name,
                text : data.text,
                profileImage : data.user.profile_image_url
            };

            var tweet = new Tweet({
                username : data.user.screen_name,
                text : tweetData.text,
                profileImage : tweetData.profileImage,
                date : new Date()
            });

            if (db.open) {
                tweet.save();
            } else {
                console.error('Db is not open, couldnt save tweet.');
            }

            console.log(tweetData.username + ': ' + tweetData.text);

            self.socket.emit('tweet', { tweet : tweetData });
        });
    });
};

module.exports = LiveTweets;
