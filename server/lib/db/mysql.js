var lib_mysql = {};
var mysql = require('mysql');
var config = require('../../config');
var __logger = require('../../lib/logger');

lib_mysql.init = function (__callback) {
    var __m = 'lib_mysql.init';
    if (!config.mysql.init) {
        lib_mysql.conn = null;
        __callback(null);
        return;
    }
    var pool = mysql.createPool({
        connectionLimit: config.mysql.options.connection_limit,
        host: config.mysql.options.host,
        user: config.mysql.options.user,
        password: config.mysql.options.password,
        database: config.mysql.options.database
    });
    setTimeout(function () {
        __logger.info('connecting with mysql', {method: __m, host: config.mysql.options.host});
        pool.getConnection(function (err, connection) {
            if (err) {
                __logger.error('connection failed with mysql', {method: __m, host: config.mysql.options.host});
                __callback({message: 'mysql connection failed', err: err, mysql: config.mysql});
            }
            else {
                __logger.info('connection established with mysql', {method: __m, host: config.mysql.options.host});
                connection.release();
                lib_mysql.conn = pool;
                __callback(null);
            }
        });
    }, 1000);
};
lib_mysql.init_sms_dlr = function (__callback) {
    var __m = 'lib_mysql.init_sms_dlr';
    if (!config.mysql_sms_dlr.init) {
        lib_mysql.conn_sms_dlr = null;
        __callback(null);
        return;
    }
    var pool = mysql.createPool({
        connectionLimit: config.mysql_sms_dlr.options.connection_limit,
        host: config.mysql_sms_dlr.options.host,
        user: config.mysql_sms_dlr.options.user,
        password: config.mysql_sms_dlr.options.password,
        database: config.mysql_sms_dlr.options.database
    });
    setTimeout(function () {
        __logger.info('connecting with mysql', {method: __m, host: config.mysql_sms_dlr.options.host});
        pool.getConnection(function (err, connection) {
            if (err) {
                __logger.error('connection failed with mysql', {method: __m, host: config.mysql_sms_dlr.options.host});
                __callback({message: 'mysql connection failed', err: err, mysql: config.mysql_sms_dlr});
            }
            else {
                __logger.info('connection established with mysql', {method: __m, host: config.mysql_sms_dlr.options.host});
                connection.release();
                lib_mysql.conn_sms_dlr = pool;
                __callback(null);
            }
        });
    }, 1000);
};
module.exports = lib_mysql;