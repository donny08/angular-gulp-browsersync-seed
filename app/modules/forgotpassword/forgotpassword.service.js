"use strict";

module.exports = function($http, $cookies, $rootScope, $timeout,GENERAL_CONFIG) {

    var service = {};

    service.verification = verification;

    return service;


    function verification(email, callback) {
        var payload = { "email": email };

        $http.post(GENERAL_CONFIG.BASE_URL + 'auth/forgot', payload).then(function handleSuccess(res) {
            callback({ success: true, resp: res });
        }, function handleError(error) {
            console.log(error)
            callback({ success: false, messObj: error });
        });
    }
}
