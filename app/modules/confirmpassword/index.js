(function() {
    'use strict';
    angular
        .module('app')
        .service('ConfirmPasswordService', ['$http', '$cookies', '$rootScope', '$timeout','GENERAL_CONFIG', require('./confirmpassword.service')])
        .controller('ConfirmPasswordController', ['$scope', '$location', '$state', 'toaster', 'ConfirmPasswordService', require('./confirmpassword.controller')]);

})();
