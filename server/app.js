var express = require('express');
var http = require('http');
var timeout = require('connect-timeout');
var bodyParser = require("body-parser");
var async = require('async');
var moment = require('moment');

var __define = require('./config/define');
var __logger = require('./lib/logger');
var __res = require('./express_server/response_handler');
var __db = require('./lib/db');
var config = require('./config');
var passport = require('passport')
var app = {};
__logger.info('loaded application with "' + process.env.NODE_ENV + '" environment, PID: ' + process.pid);

module.exports.run_express_server = function() {
    console.log(new Date() + '   >> Worker PID:', process.pid);
    app = express();
    app.use(timeout(config.default_server_response_timeout, { respond: false }));
    app.use(haltOnTimedout);
    app.use(bodyParser.json()); // to support JSON-encoded bodies
    app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
        extended: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
        next();
    });
    // Configure passport
    require('./config/passport')();
    require('./express_server/routes')(app, passport);
    app.server = http.createServer(app);
    var io = require('socket.io').listen(app.server);
    app.server.listen(config.port);
    io.sockets.on('connection', function(socket) {
        socket.on('disconnect', function() {});
    });
    
    process.__socketio = io;
    process.__express_server_status = true;
    __logger.info('express server started on ' + config.port + ', with api prefix ' + config.api_prefix);
    __logger.info('TEST URL: ' + config.base_url + '/api/hello_world');

};

module.exports.stop_express_server = function() {
    app.server.close();
};

function haltOnTimedout(req, res, next) {
    if (!req.timedout) {
        next()
    } else {
        __logger.error('haltOnTimedout, request timedout', { req_uuid: req.req_uuid });
        new __res.SERVER_TIMEDOUT("request from client timedout").send(res);
    }
    req.on('timeout', function(time, next) {
        __logger.error('haltOnTimedout, server response timedout', { req_uuid: req.req_uuid });
        new __res.SERVER_TIMEDOUT('server timed out after ' + time + ' milliseconds').send(res);
    });
}

var self = this;
__db.initialize(function(err) {
    if (err) {
        process.exit(1);
    } else {
        __logger.info('started all databases');
        self.run_express_server();
    }
});
