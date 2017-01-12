(function() {
    "use strict";
    angular
        .module('app')
        .service('RegisterService', ['$http', '$cookies', '$rootScope', '$timeout','GENERAL_CONFIG', require('./register.service')])
        .controller('RegisterController', ['$location','$state', '$rootScope','RegisterService', require('./register.controller')]);
})();
