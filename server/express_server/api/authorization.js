var auth_api = {};
var __logger = require('../../lib/logger');
var __db = require('../../lib/db/mongo').conn;
var encryptionHelper = require('../../lib/helpers/encryption-helper');
var crypto = require("crypto");
var async = require("async");
var nodemailer = require("nodemailer");
var jwt = require('jwt-simple');
var __config = require('../../config');
var passport = require('passport');

auth_api.register = function(req, res, next) {

    var collection = __db.collection('user');

    collection.find({ $or: [{ 'email': req.body.email }, { 'username': req.body.username }] }).toArray(function(err, data) {
        if (err) {
            __logger.error("", { err: err });
        } else {
            if (data.length == 0) {
                collection.insert(req.body, function(err, docs) {
                    if (err) {
                        __logger.error("", { err: err });
                    } else {
                        res.send({ error: false, resp: docs }, 201);

                    }
                });
            } else {
                res.send({ error: true, message: "Email or Username already exists" }, 400);
            }

        }
    });
};

auth_api.login = function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.send({ error: false, message: "Bad Password" }, 404);
        }
        console.log("User " + JSON.stringify(user));
        var token = jwt.encode(user, __config.jwtSecret);
        res.json({ error: false, token: 'JWT ' + token });
        /*req.logIn(user, function(err) {
            if (err) {
                return next(err);
            }
            console.log("req.user")
            console.log(req.user)
            res.send({ error: 0, user: user.email }, 201);
        });*/
    })(req, res, next);
};

auth_api.logout = function(req, res, next) {
    req.logout();
    res.json("logged out successfully");
}

auth_api.forgot = function(req, res, next) {
    var collection = __db.collection('user');
    async.waterfall([
        function(done) {
            crypto.randomBytes(20, function(err, buf) {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        function(token, done) {
            console.log(token)
            collection.find({ 'email': req.body.email }).toArray(function(err, user) {
                if (user.length == 0) {
                    return res.json({
                        error: false,
                        message: 'No account with that email address exists.'
                    });
                    //req.flash('error', 'No account with that email address exists.');
                    //return res.redirect('/forgot');
                }
                //console.log(user)

                /*  user.resetPasswordToken = token;
                  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour*/
                collection.findAndModify({ "email": req.body.email }, [
                    ['_id', 1]
                ], { $set: { "resetPasswordToken": token, "resetPasswordExpires": Date.now() + 3600000 } }, { new: true }, function(err, data) {
                    console.log(user[0])
                    done(err, token, user[0]);
                });
                /* user.save(function(err) {
                     done(err, token, user);
                 });*/
            });
        },
        function(token, user, done) {
            var smtpTransport = nodemailer.createTransport('SMTP', {
                service: 'Gmail',
                auth: {
                    user: __config.email,
                    pass: __config.password
                }
            });
            var mailOptions = {
                to: user.email,
                from: __config.email,
                subject: 'Node.js Password Reset',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'http://' + req.headers.host + '/' + __config.api_prefix + '/api/auth/reset?email=' + req.body.email + '&token=' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            smtpTransport.sendMail(mailOptions, function(err) {
                //req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
                done(err, 'done');
            });
        }
    ], function(err) {
        if (err) return next(err);

        res.json("An e-mail has been sent to " + req.body.email + " with further instructions.");
    });
};

auth_api.verify_token = function(req, res, next) {
    var collection = __db.collection('user');
    collection.find({ resetPasswordToken: req.query.token, resetPasswordExpires: { $gt: Date.now() } }).toArray(function(err, user) {
        if (err || user.length == 0) {
            return res.json({
                error: false,
                message: 'Password reset token is invalid or has expired.'
            });
        } else {
            res.redirect('http://localhost:3000/#!/confirmpassword?email=' + req.query.email + '&token=' + req.query.token);
        }
    });
};


auth_api.reset = function(req, res, next) {
    var collection = __db.collection('user');

    async.waterfall([
        function(done) {
            collection.find({ resetPasswordToken: req.body.token, resetPasswordExpires: { $gt: Date.now() } }).toArray(function(err, user) {
                if (user.length == 0) {
                    return res.json({
                        error: false,
                        message: 'Password reset token is invalid or has expired.'
                    });
                }

                /*collection.findAndModify({ "email": req.body.email }, [
                    ['_id', 1]
                ], { "email": req.body.email, "password": req.body.password, "resetPasswordToken": undefined, "resetPasswordExpires": undefined }, { new: true }, function(err, data) {
                    console.log(data);
                    req.logIn(data, function(err) {
                        done(err, data);
                    });
                    done(err, data);
                });*/

                collection.update({ "email": req.body.email }, { $set: { "password": req.body.password, "resetPasswordToken": undefined, "resetPasswordExpires": undefined } }, function(err, data) {
                    console.log(data);                  
                    done(err, data);
                });
            });
        },
        function(user, done) {
            var smtpTransport = nodemailer.createTransport('SMTP', {
                service: 'Gmail',
                auth: {
                    user: __config.email,
                    pass: __config.password
                }
            });

            var mailOptions = {
                to: req.body.email,
                from: __config.email,
                subject: 'Your password has been changed',
                text: 'Hello,\n\n' +
                    'This is a confirmation that the password for your account ' + req.body.email + ' has just been changed.\n'
            };
            
             smtpTransport.sendMail(mailOptions, function(err) {
                 console.log("sendMail")               
                 done(err, 'done');
             });
        }
    ], function(err) {
        if (err) return next(err);

        res.json("Success! Your password has been changed.");
    });
};

auth_api.profile = function(req, res, next) {
    var parted = req.headers.authorization.split(' ');
    console.log(parted)
    if (parted.length === 2) {
        token = parted[1];
    }

    //var token = getToken(req.body.token);
    var decoded = jwt.decode(token, __config.jwtSecret);
    res.json(decoded)
};


module.exports = auth_api;
