/**
* Directive to validate email:
*/
(function () {
    'use strict';
    angular.module('app').directive('uniqueEmail', function($state, storageService) {
        return {
        require : 'ngModel',
        link : function(scope, element, attrs, ngModel) {
          ngModel.$parsers.push(function(value) {
            if(!value || value.length == 0) return;
            ngModel.$setValidity('unique', storageService.checkEmail(value, scope.id));
            return value;
          });
        }
      };
    });
})();