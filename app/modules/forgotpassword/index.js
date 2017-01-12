(function() {
    'use strict';
    angular
        .module('app')
        .service('ForgotPasswordService', ['$http', '$cookies', '$rootScope', '$timeout','GENERAL_CONFIG', require('./forgotpassword.service')])
        .controller('ForgotPasswordController', ['$scope', '$state', 'toaster','ForgotPasswordService', require('./forgotpassword.controller')]);

})();
