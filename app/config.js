var config_module = angular.module('config', []);

var config_data = {
  'GENERAL_CONFIG': {
    'APP_NAME': 'angular-gulp',
    'APP_VERSION': '0.1',
    'BASE_URL': 'http://localhost:8003/node-auth/api/'
  }
};

angular.forEach(config_data,function(key,value) {
  config_module.constant(value,key);
});