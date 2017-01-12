/**
 * Created by Yogendra Maurya on 6/10/2015.
 */
var db = {};
var async = require('async');
var __logger = require('../logger');

db.mongo = require('./mongo');
db.mysql = require('./mysql');
db.redis = require('./redis');

db.initialize = function (__callback) {
    async.series(
        [
            db.mongo.init,
            db.redis.init,
            db.mysql.init,
            db.mysql.init_sms_dlr
        ],
        function (err, results) {
            if (err) {
                __logger.error('failed to run all databases', {err: err});
                __callback(err);
            } else {
                __callback(null);
            }
        }
    );
};


module.exports = db;