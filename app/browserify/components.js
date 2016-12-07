(function () {
    'use strict';
    var countries = require('country-list')();
    angular.module('app')
        .service('browserifyService', [BrowserifyService]);

    
    function BrowserifyService() {
        return {
            countries: countries
        };   
    }
})();
