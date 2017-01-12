"use strict";

module.exports = function($scope, $location, $state, toaster, ConfirmPasswordService) {
    var vm = this;
    vm.confirmpassword = confirmpassword;

    function confirmpassword() {
        vm.dataLoading = true;
        console.log(vm)
        console.log($location.search().email)
        console.log($location.search().token)
        if (vm.password == vm.cpassword) {

            ConfirmPasswordService.confirm(vm.password, $location.search().email, $location.search().token).then(function(response) {
                console.log(response)

                if (response.success) {
                    vm.dataLoading = false;
                    toaster.success({ title: "Your password has been changed successfully" });
                    $state.go('login');
                } else {
                    toaster.error({ title: "You cannot reset your password at this time" });
                    vm.dataLoading = false;
                }
            });
        } else {
            vm.dataLoading = false;
            toaster.error({ title: "Your New Password and Confirm Password do not match" });
        }
    }
};
