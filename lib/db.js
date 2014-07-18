var mongoose = require('mongoose'),
    env = require('./env'),
    db;

function Db () {}

Db.open = false;

Db.start = function () {
    mongoose.connect(env.get('dbHost'));

    db = mongoose.connection;

    db.on('error', function () {
        console.error('Error connecting to the database!');
    });

    db.once('open', function () {
        Db.open = true;
    });
}

module.exports = Db;
