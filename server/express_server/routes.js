var serveStatic = require('serve-static');
var __config = require('../config');
var __logger = require('../lib/logger');
var __res = require('./response_handler');
var api = require('./api');
var ivr = require('./api/ivr');
var jwt = require('jwt-simple');
//var passport = require('passport');

// var passport = require('passport'),
//     LocalStrategy = require('passport-local').Strategy,
//     __db = require('../lib/db/mongo').conn;

module.exports = function(app, passport) {
    app.use('/' + __config.api_prefix + '/api', api);
    app.use('/' + __config.api_prefix + '/api/ivr', ivr);
    app.use('/' + __config.api_prefix + '/sc', serveStatic('public'));
    app.use('/' + __config.api_prefix + '/apidocs', serveStatic('docs/html/api'));
    app.use('/' + __config.api_prefix + '/demo', serveStatic('public'));
    app.use('/favicon.ico', serveStatic('public'));
    app.route('/*').get(function(req, res, next) {
        __logger.warn('got invalid request format', { remote_host: req.clientAddress, uri: req.url });
        new __res.ERROR().send(res);
    });
};
