(function () {
    'use strict';

    angular.module('app')
        .controller('editController', ['storageService','browserifyService','$stateParams','$scope','$state', EditController]);
    
    function EditController(storageService,browserifyService,$stateParams,$scope,$state) {
        var id = ($stateParams.id) ? $stateParams.id : -1;
        $scope.id = id;
        $scope.countries = browserifyService.countries.getNames();
        if(id >= 0) populateFields(id);

        $scope.submitForm = function(isValid) {
            if(!isValid) return;
            var contact = {
                firstName: $scope.formData.firstName,
                lastName: $scope.formData.lastName,
                email: $scope.formData.email,
                country: $scope.formData.country,
                gravatar: md5($scope.formData.email)
            }
            var form = (id >= 0) ? storageService.editContact(contact, id) : storageService.addContact(contact);
            $state.go('contacts');
        }

        $scope.delete = function() {
            storageService.deleteContact(id);
            $state.go('contacts');
        }

        //----------------------
        // Internal functions 
        //----------------------
        function populateFields(id){   
            var contacts = storageService.getContacts();
            var contact = (contacts[id]) ? contacts[id] : $state.go('404');
            var formData = {
                firstName: contact.firstName,
                lastName: contact.lastName,
                email: contact.email,
                country: contact.country
            };
            $scope.formData = formData;
        };

    }

})();