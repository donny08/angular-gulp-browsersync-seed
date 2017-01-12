"use strict";

module.exports = function($scope, $state,toaster, ForgotPasswordService) {
    var vm = this;
    vm.forgot = forgot;

    function forgot() {
        vm.dataLoading = true;
        //console.log(ForgotPasswordService)
        ForgotPasswordService.verification(vm.email, function(response) {
            console.log(response)
            
            if (response.success) {
                vm.dataLoading = false;
                //toaster.success({ title: "Please check your email for instructions on how to reset your password" });
                $state.go('login'); 

            } else {
                toaster.error({ title: "You cannot reset your password at this time" });
                vm.dataLoading = false;
            }
        });
    }
};
