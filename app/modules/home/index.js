(function() {
    'use strict';
    angular
        .module('app')
        .service('HomeService', ['$http', '$cookies', '$rootScope', '$localStorage','$timeout','GENERAL_CONFIG', require('./home.service')])
        .controller('HomeController', ['$scope', '$state','$http','toaster','HomeService', require('./home.controller')]);

})();
