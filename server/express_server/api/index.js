var express = require('express');
var router = express.Router();

var __res = require('../response_handler');
var __logger = require('../../lib/logger');
var __define = require('../../config/define');
var util = require('../../lib/util');
var authorization = require('./authorization');
var passport = require('passport');

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('http://localhost:3000/');
}
router.get('/hello_world', function(req, res, next) {
    __logger.debug('GET /hello_world', { uri: req.url });
    new __res.SUCCESS('Hello..!!').send(res);
});

router.get('/user/:username', function(req, res, next) {
    __logger.debug('GET /user', { uri: req.url });
    if (true) {
        new __res.ERROR('not implemented').send(res);
    } else {
        new __res.SUCCESS('success').send(res, { name: 'user' });
    }
});

router.post('/user', function(req, res, next) {
    __logger.debug('POST /user', { uri: req.url });
    var new_user = req.body;
    new __res.SUCCESS('success').send(res, { name: 'user' });
});

router.post('/auth/login', authorization.login);
router.get('/auth/logout', authorization.logout);
router.post('/auth/register', authorization.register);
router.post('/auth/forgot', authorization.forgot);
// router.get('/auth/reset/:token', authorization.reset);
router.get('/profile', passport.authenticate('jwt', { session: false }), isLoggedIn, authorization.profile);
router.post('/auth/reset', authorization.reset);
router.get('/auth/reset', authorization.verify_token);

module.exports = router;
