/**
 * Created by Yogendra Maurya on 6/9/2015.
 */
var config = require('../../config');
var winston = require('winston'),
    MongoDB = require('winston-mongodb').MongoDB,
    moment = require('moment');


var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            level: config.logging.level,
            colorize: config.logging.colorize,
            'timestamp': function () {
                return moment().format('YYYY-MM-DD HH:mm:ss');
            }
        }),
        new (winston.transports.DailyRotateFile)({
            json: false,
            //filename: config.logging.log_file,
            filename:'node-auth',
            level: config.logging.level,
            datePattern: (config.logging.datePattern) ? '.' + config.logging.datePattern : '.yyyy-MM-dd',
            maxsize: (config.logging.maxsize) ? config.logging.maxsize : 104857600, // 100 MB,
            'timestamp': function () {
                return moment().format('YYYY-MM-DD HH:mm:ss');
            }
        })
    ]
});

if (!config.logging.console) {
    logger.remove(winston.transports.Console);
}

if (config.logging.mongo.enabled) {
    logger.add(MongoDB, {
        level: config.logging.level,
        host: config.logging.mongo.host,
        port: config.logging.mongo.port,
        db: config.logging.mongo.db,
        username: config.logging.mongo.username,
        password: config.logging.mongo.password
    });
}

module.exports = logger;