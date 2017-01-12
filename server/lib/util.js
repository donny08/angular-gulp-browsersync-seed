var util = {};

var async = require('async');

var __logger = require('./logger');
var __config = require('../config');
var __define = require('../config/define');
var __db = require('../lib/db');

util.remove_duplicates = function remove_duplicates(duplicate_array) {
    var no_duplicates = {};
    var unique_array = new Array();
    for (var i = 0; i < duplicate_array.length; i++) {
        if (!no_duplicates[duplicate_array[i]]) {
            no_duplicates[duplicate_array[i]] = true;
            unique_array.push(duplicate_array[i]);
        }
    }
    return unique_array;
};

util.get_circle_operator = function (mobile_number, __callback) {
    var method_name = "util.get_circle_operator";
    var circle = "UNKNOWN";
    var operator = "UNKNOWN";
    __logger.debug('got request', {method: method_name, mobile_number: mobile_number});
    mobile_number = mobile_number.substr(-10);
    var msc_code = 0;
    try {
        msc_code = parseInt(mobile_number.substr(0, 5));
    } catch (e) {
    }

    __db.mongo.__findOne(__define.MONGO_COLLECTIONS.HP_MSC_CODES, {series: msc_code}, function (err, result) {
        if (err) {
            __callback(circle, operator);
            __logger.error('error in getting msc code', {method: method_name, msc_code: msc_code});
        }
        else if (result) {
            circle = result.circle;
            operator = result.operator;
            __logger.debug('found msc code', {method: method_name, msc_code: msc_code, result: result});
            __callback(circle, operator);
        }
        else {
            __logger.warn('no such msc code', {method: method_name, msc_code: msc_code});
            __callback(circle, operator);
        }
    });

};

util.get_circle_operator_of_array = function (arr_mobile_number, __callback) {
    console.log(arr_mobile_number);
    var arr_func_async_get_circle_operator = new Array();
    for (var i = 0; i < arr_mobile_number.length; i++) {
        arr_func_async_get_circle_operator.push(async_get_circle_operator(arr_mobile_number[i].toString()));
    }
    async.series(arr_func_async_get_circle_operator,
        function (err, results) {
            try {
                var arr_mobile_number_with_circle_operator = new Array();
                for (var i = 0; i < arr_mobile_number.length; i++) {
                    var mobile_number_with_circle_operator = {
                        mobile_number: arr_mobile_number[i],
                        circle: results[i][0],
                        operator: results[i][1]
                    };
                    arr_mobile_number_with_circle_operator.push(mobile_number_with_circle_operator);
                }

                __callback(null, arr_mobile_number_with_circle_operator);
            } catch (e) {
                __callback(1);
            }
        });
};

var async_get_circle_operator = function (mobile_number, __callback) {
    return function (__callback) {
        var method_name = "util.get_circle_operator";
        var circle = "UNKNOWN";
        var operator = "UNKNOWN";
        __logger.debug('got request', {method: method_name, mobile_number: mobile_number});

        var msc_code = 0;
        try {
            msc_code = parseInt(mobile_number.substr(0, 5));
        } catch (e) {
        }

        __db.mongo.__findOne(__define.MONGO_COLLECTIONS.HP_MSC_CODES, {series: msc_code}, function (err, result) {
            if (err) {
                __callback(null, circle, operator);
                __logger.error('error in getting msc code', {method: method_name, msc_code: msc_code});
            }
            else if (result) {
                circle = result.circle;
                operator = result.operator;
                __logger.debug('found msc code', {method: method_name, msc_code: msc_code, result: result});
                __callback(null, circle, operator);
            }
            else {
                __logger.warn('no such msc code', {method: method_name, msc_code: msc_code});
                __callback(null, circle, operator);
            }
        });
    };


};

module.exports = util;