"use strict";

module.exports = function($location, $state, $rootScope, RegisterService) {
    var vm = this;
    //alert("hello")
    vm.register = register;

    function register() {
        vm.dataLoading = true;
        console.log(vm.user)
        RegisterService.Create(vm.user)
            .then(function(response) {
                console.log("response");
                console.log(response);

                if (response.success) {
                    //FlashService.Success('Registration successful', true);
                     $state.go('login');
                } else {
                    //FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
    }
};
