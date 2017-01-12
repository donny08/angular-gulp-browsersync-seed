/**
 * Created by Yogendra Maurya on 6/26/2015.
 */
var lib_redis = {};
var redis = require('redis');
var __config = require('../../config');
var __logger = require('../../lib/logger');
var redis_client = null;

lib_redis.init = function (cb) {
    if (!__config.redis.init) {
        lib_redis.conn = null;
        cb(null, null);
        return;
    }
    __logger.debug('lib_redis.init, initializing redis connection ', {port: __config.redis.port, host: __config.redis.host});
    redis_client = redis.createClient(__config.redis.port, __config.redis.host, {});
    redis_client.on("error", function (err) {
        __logger.error('lib_redis.init, error in redis connection ', {port: __config.redis.port, host: __config.redis.host});
        lib_redis.conn = null;
        cb(err, null);
    });
    redis_client.on("connect", function () {
        __logger.info('lib_redis.init, success redis connection ', {port: __config.redis.port, host: __config.redis.host});
        lib_redis.conn = redis_client;
        cb(null, redis_client);
    });
};

lib_redis.add_json = function (key, value, __callback) {
    if (lib_redis.conn) {
        lib_redis.conn.hmset(key, value);
        if (__callback)
            __callback(null);
    }
    else {
        if (__callback)
            __callback(new Error('redis connection failed'));
    }
};
lib_redis.get_json = function (key, __callback) {
    if (lib_redis.conn) {
        lib_redis.conn.hgetall(key, function (err, json_object) {
            if (err) {
                __callback(err);
            }
            else {
                __callback(null, json_object);
            }
        });
    }
    else {
        __callback(new Error('redis connection failed'));
    }
};
lib_redis.update_json = function (key, value, __callback) {
    if (lib_redis.conn) {
        lib_redis.conn.exists(key, function (err, result) {
            if (err) {
                if (__callback)
                    __callback(1);
            }
            else if (result === 0) {
                if (__callback)
                    __callback(1);
            }
            else {
                lib_redis.conn.hmset(key, value);
                if (__callback)
                    __callback(null);
            }
        });


    }
    else {
        if (__callback)
            __callback(new Error('redis connection failed'));
    }
};

module.exports = lib_redis;