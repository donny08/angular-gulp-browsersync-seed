

exports.ERROR = function (msg) {
    this.jsonresponse = {code: 500, msg: (msg) ? msg : 'some error occurred'};
    this.send = send;
};
exports.SUCCESS = function (msg) {
    this.jsonresponse = {code: 200, msg: (msg) ? msg : 'sucsess'};
    this.send = send;
};
exports.CREATED = function (msg) {
    this.jsonresponse = {code: 201, msg: (msg) ? msg : 'sucsess'};
    this.send = send;
};
exports.ACCEPTED = function (msg) {
    this.jsonresponse = {code: 202, msg: (msg) ? msg : 'sucsess'};
    this.send = send;
};
exports.BAD_REQUEST = function (msg) {
    this.jsonresponse = {code: 400, msg: (msg) ? msg : 'bad request'};
    this.send = send;
};
exports.AUTH_FAILED = function (msg) {
    this.jsonresponse = {code: 401, msg: (msg) ? msg : 'auth failure'};
    this.send = send;
};
exports.NO_RECORD_FOUND = function (msg) {
    this.jsonresponse = {code: 404, msg: (msg) ? msg : 'no record found'};
    this.send = send;
};
exports.NOT_FOUND = function (msg) {
    this.jsonresponse = {code: 404, msg: (msg) ? msg : 'not found'};
    this.send = send;
};
exports.SERVER_TIMEDOUT = function (msg) {
    this.jsonresponse = {code: 408, msg: (msg) ? msg : 'server timed out'};
    this.send = send;
};
exports.CONFLICT = function (msg) {
    this.jsonresponse = {code: 409, msg: (msg) ? msg : 'conflict'};
    this.send = send;
};

var send = function (res, optional_json) {
    if (optional_json)
        this.jsonresponse[optional_json.name] = optional_json.data;
    res.status(this.jsonresponse.code).json(this.jsonresponse);
};

