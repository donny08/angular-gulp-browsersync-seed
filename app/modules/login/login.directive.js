"use strict";

module.exports = {

    userinfo: function() {
        return {
            restrict: 'E',
            scope: {
                user: "=user"
            },
            template: 'User : {{user.firstName}} {{user.lastName}}',
            link: function(scope, element, attrs) {
                //console.log("input directive - scope: ", scope);
                //console.log("input directive - scope: ", element);
                //console.log("input directive - scope: ", attrs);
            }
        };
        /*var directive = {};

        directive.restrict = 'E';

        directive.template = "User : {{user.firstName}} {{user.lastName}}";

        directive.scope = {
            user: "=user"
        }

        return directive*/
    }
}
