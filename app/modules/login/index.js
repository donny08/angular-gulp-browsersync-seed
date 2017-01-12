(function() {
    'use strict';
    angular
        .module('app')
        .service('LoginService', ['$http', '$cookies', '$rootScope', '$localStorage', '$timeout', 'GENERAL_CONFIG', require('./login.service')])
        .controller('LoginController', ['$scope', '$location', '$state', 'toaster', 'LoginService', 'GENERAL_CONFIG', require('./login.controller')]);

})();
