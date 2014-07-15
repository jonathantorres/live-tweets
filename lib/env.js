var habitat = require('habitat'),
    env;

habitat.load(__dirname + '/../.env');

env = new habitat('liveTweets');

module.exports = env;
