(function() {
    'use strict';
    angular
        .module('app', ['ui.router', 'ngCookies', 'toaster','ngStorage','config'])
        .config(config)
        .run(run);

    config.$inject = ['$stateProvider', '$locationProvider', '$httpProvider', '$urlRouterProvider'];
    require('./modules/login');
    require('./modules/register');
    require('./modules/forgotpassword');
    require('./modules/confirmpassword');
    require('./modules/home');

    function config($stateProvider, $locationProvider, $httpProvider, $urlRouterProvider) {

        $httpProvider.interceptors.push(['$q', '$location','$localStorage', function($q, $location,$localStorage) {
            return {
                'request': function(config) {
                    config.headers = config.headers || {};
                    
                    config.headers.Authorization = $localStorage.token;

                    return config;
                },
                'responseError': function(response) {
                    console.log(response)
                    if (response.status === 401) {
                        $location.path('/login');
                    }
                    return $q.reject(response);
                }
            };
        }]);
        // Set the following to true to enable the HTML5 Mode
        // You may have to set <base> tag in index and a routing configuration in your server
        $locationProvider.html5Mode(false);
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: '/modules/login/login.view.html',
                controller: 'LoginController',
                controllerAs: 'vm'
            })
            .state('home', {
                url: '/home',
                templateUrl: '/modules/home/home.view.html',
                controller: 'HomeController',
                controllerAs: 'vm'
            })
            .state('register', {
                url: '/register',
                templateUrl: '/modules/register/register.view.html',
                controller: 'RegisterController',
                controllerAs: 'vm'
            })
            .state('confirmpassword', {
                url: '/confirmpassword',
                templateUrl: '/modules/confirmpassword/confirmpassword.view.html',
                controller: 'ConfirmPasswordController',
                controllerAs: 'vm'
            })
            .state('forgotpassword', {
                url: '/forgotpassword',
                templateUrl: '/modules/forgotpassword/forgotpassword.view.html',
                controller: 'ForgotPasswordController',
                controllerAs: 'vm'
            });
        $urlRouterProvider
            .otherwise('/login');
    }

    run.$inject = ['$rootScope', '$location', '$cookies', '$http'];

    function run($rootScope, $location, $cookies, $http) {

        $rootScope.$on('$locationChangeStart', function(event, next, current) {

        });
    }

})();
