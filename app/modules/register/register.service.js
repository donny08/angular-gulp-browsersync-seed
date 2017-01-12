"use strict";

module.exports = function($http, $cookies, $rootScope, $timeout,GENERAL_CONFIG) {
    var service = {};

    service.Create = Create;

    return service;

    function Create(user) {
        return $http.post(GENERAL_CONFIG.BASE_URL + 'auth/register', user).then(handleSuccess, handleError('Error while logging user'));
    }

    // private functions

    function handleSuccess(res) {
        return { success: true, resp: res };
    }

    function handleError(error) {
        return { success: false, message: error };
    }
}
