(function () {
    'use strict';
    angular.module('app')
        .controller('contactsController', ['storageService','$scope','$state',ContactsController]);
    
    function ContactsController(storageService,$scope,$state) {
        $scope.people = storageService.getContacts();

        $scope.editContact = function (contact) {
            var index = $scope.people.indexOf(contact);
            $state.go('edit',{id: index})
        };

    }

})();