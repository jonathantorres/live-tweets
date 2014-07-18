var express = require('express'),
    Tweet = require('../lib/models/Tweet'),
    env = require('../lib/env'),
    router = express.Router(),
    viewData = {};

/* GET home page. */
router.get('/', function(req, res) {
    viewData.title = 'Live Tweets';
    viewData.ioHost = env.get('ioServer');

    Tweet.find({}, null, { sort : { date : 'desc' } }, function (err, tweets) {
        viewData.tweets = tweets;
        res.render('index', viewData);
    });
});

module.exports = router;
