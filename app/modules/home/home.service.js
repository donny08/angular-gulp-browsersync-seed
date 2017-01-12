"use strict";

module.exports = function($http, $cookies, $rootScope, $localStorage, $timeout,GENERAL_CONFIG) {
    var service = {};
    service.profile = profile;
    service.logout = logout;
    return service;

    function profile() {

        // var response = { success: true };
        //response = { success: false, message: 'Username or password is incorrect' };
        return $http.get(GENERAL_CONFIG.BASE_URL + 'profile').then(handleSuccess, handleError);
    }

    function logout() {
        return $http.get(GENERAL_CONFIG.BASE_URL + 'auth/logout').then(handlelogoutSuccess, handleError);
    }
    
    function handleSuccess(res) {
        return { success: true, resp: res };
    }

    function handlelogoutSuccess(res) {
        $localStorage.token = '';
        return { success: true, resp: res };
    }

    function handleError(error) {
        console.log(error)
        return { success: false, messObj: error };
    }
}
