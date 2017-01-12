var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    __db = require('../lib/db/mongo').conn;
var __config = require('../config');
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var ObjectId = require('mongodb').ObjectID;
module.exports = function() {
    var collection = __db.collection('user');
    // serialize sessions
    passport.serializeUser(function(user, done) {
        done(null, user.email);
    });

    passport.deserializeUser(function(email, done) {
        collection.find({ email: email }).toArray(function(err, user) {
            done(err, user[0]);
        });
    });

    // Use Local Strategy
    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, function(username, password, done) {
        collection.find({ $or: [{ 'email': username }, { 'username': username }] }).toArray(function(err, user) {
            console.log(user)
            if (err) {
                return done(err);
            }
            if (user.length == 0) {
                return done(null, false, { message: 'Unknown user' });
            }
            if (user[0].password != password) {
                console.log(user[0].email + " failed to log in (invalid password)");
                return done(null, false, { message: 'Invalid password' });
            }
            console.log(user[0].email + " logged in OK");
            return done(null, user[0]);
        });
    }));

    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = __config.jwtSecret;

    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        console.log("jwt_payload")

        collection.findOne({ _id: ObjectId(jwt_payload._id) }, function(err, user) {
            console.log("user")
            console.log(user)
                //User.findOne({ id: jwt_payload.id }, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }));
};
