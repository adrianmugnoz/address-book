/**
 * Directive to manage toolbar:
 */
(function () {
    'use strict';
    
    angular.module('app').directive('abToolbar', function($state) {
        return {
            restrict: 'E',
            replace: 'true',
            templateUrl: 'app/shared/toolbar/toolbar.view.html',
            link: function (scope, element, attrs) {
                scope.$state = $state;
    			scope.goHome = function() {
                    $state.go('contacts');
           		};
            }
        };
    });
})();