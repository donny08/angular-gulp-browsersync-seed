var _ = require('lodash');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app_name = "authorization"; //remember to rename this variable with new name(without spaces), it will also act as default mongodb database name and logging file name
var db_name = app_name; //change if you want to have different database name than the application name.
var all = {
    env: process.env.NODE_ENV,
    path: __dirname,
    app_name: app_name,
    api_prefix: "node-auth", //added to work with apache and passenger, acts as in general api prefix as well
    base_url: "http://localhost:8000/",
    port: 8003,
    socket_io_port: 8004,
    jwtSecret: 'devdacticIsAwesome',
    jwtSession: {
        session: false
    },
    email:'example@gmail.com',// Your email id
    password:'password',// Your password
    default_server_response_timeout: 60000, // requests received will be timedout if not responded within the specified time
    logging: {
        log_file: __dirname,
        //log_file: '/var/log/node_apps/',
        console: true,
        json: false,
        level: 'silly', //[silly,debug,verbose,info,warn,error]
        datePattern: 'yyyy-MM-dd', //log rotation
        maxsize: 104857600, //log rotates after specified size of file in bytes
        colorize: 'true'
    },
    mongo: {
        init: true,
        uri: 'mongodb://localhost:27017/',
        options: {
            db: { native_parser: true },
            server: { poolSize: 5 },
            user: 'dev',
            pass: 'dev'
        }
    },
    redis: {
        init: false,
        host: "localhost",
        db: "0",
        port: 6379
    },
    mysql: {
        init: false,
        options: {
            connection_limit: 10,
            host: 'localhost',
            user: 'root',
            password: '',
            database: ''
        }
    },
    mysql_sms_dlr: {
        init: false,
        options: {
            connection_limit: 10,
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'test'
        }
    },
    app_settings: {}
};
all = _.merge(all, require('./' + process.env.NODE_ENV + '.js') || {});
//all = _.merge(all, require('./define') || {});
all.base_url = "http://localhost:" + all.port + "/" + all.api_prefix;

all.logging.log_file += app_name;
all.mongo.uri += db_name;
all.mysql.options.database = db_name;

module.exports = all;
