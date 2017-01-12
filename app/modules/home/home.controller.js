"use strict";

module.exports = function($scope, $state, $http, toaster, HomeService) {
    var vm = this;
    vm.logout = logout;
    HomeService.profile().then(function(response) {
        console.log(response.resp.data)
           vm.user = response.resp.data;

    });

    function logout() {
        HomeService.logout().then(function(response) {
            $http.defaults.headers.common.Authorization = 'Basic';
            $state.go('login');
        });
    }
};
