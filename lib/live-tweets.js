var twitter = require('twitter'),
    util = require('util'),
    app = require('../app'),
    env = require('./env'),
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

LiveTweets.prototype.init = function() {
    self = this;

    twitterAPI.stream('statuses/filter', { track : 'NodeJS' }, function(stream) {
        stream.on('data', function(data) {
            var tweetData = {
                username : '@' + data.user.screen_name,
                text : data.text,
                profileImage : data.user.profile_image_url
            };

            console.log(tweetData.username + ': ' + tweetData.text);

            self.socket.emit('tweet', { tweet : tweetData });
        });
    });
};

module.exports = LiveTweets;
