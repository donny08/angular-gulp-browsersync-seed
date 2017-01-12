"use strict";

module.exports = function($http, $cookies, $rootScope,$localStorage, $timeout,GENERAL_CONFIG) {
    var service = {};
    service.Login = Login;
    service.ClearCredentials = ClearCredentials;
    return service;

    function Login(user) {
        var payload = { "username": user.username, "password": user.password };
        // var response = { success: true };
        //response = { success: false, message: 'Username or password is incorrect' };
        return $http.post(GENERAL_CONFIG.BASE_URL + 'auth/login', payload).then(handleSuccess, handleError);
    }

    function ClearCredentials() {
        //$http.defaults.headers.common.Authorization = 'JWT';
        $localStorage = 'JWT';
    }

    function handleSuccess(res) {
        //$http.defaults.headers.common['Authorization'] = res.token;
        $localStorage.token = res.data.token;
        console.log("$localStorage.token")
        console.log($localStorage.token)
        return { success: true, resp: res };
    }

    function handleError(error) {
        console.log(error)
        return { success: false, messObj: error };
    }
}
