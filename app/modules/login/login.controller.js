"use strict";

module.exports = function($scope, $location, $state, toaster, LoginService,GENERAL_CONFIG) {
    var vm = this;
    vm.login = login;
    vm.jakob = {};
    vm.jakob.firstName = "Jakob";
    vm.jakob.lastName  = "Jenkov";

    function login() {
        vm.dataLoading = true;
        console.log(GENERAL_CONFIG)
        LoginService.Login(vm).then(function(response) {
            console.log(response)

            if (response.success) {
                vm.dataLoading = false;
                toaster.success({ title: "You have been successfully logged in" });
                 $state.go('home');
            } else {
                vm.dataLoading = false;
                toaster.error({ title: "Username and/or Password Invalid" });
            }
        });
        /*LoginService.Login(vm, function(response) {
    console.log(response)

    if (response.success) {
        vm.dataLoading = false;
        toaster.success({ title: "You have been successfully logged in" });
        //$location.path('/login');
    } else {
        vm.dataLoading = false;
        toaster.success({ title: "Username and/or Password Invalid" });
    }
});
*/
    }
};
