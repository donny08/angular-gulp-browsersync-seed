"use strict";

module.exports = function($http, $cookies, $rootScope, $timeout, GENERAL_CONFIG) {
    var service = {};
    service.confirm = confirm;
    return service;

    function confirm(pass, email, token) {
        var payload = { "password": pass, "email": email, "token": token };
        // var response = { success: true };
        //response = { success: false, message: 'Username or password is incorrect' };
        return $http.post(GENERAL_CONFIG.BASE_URL + 'auth/reset', payload).then(handleSuccess, handleError);
    }

    function handleSuccess(res) {
        return { success: true, resp: res };
    }

    function handleError(error) {
        console.log(error)
        return { success: false, messObj: error };
    }
}
