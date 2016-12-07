(function () {
    'use strict';
    
    angular.module('app')
        .service('storageService', [StorageService]);

    
    function StorageService() {
        var saved = localStorage.getItem('people');
        var contacts = (saved) ? JSON.parse(saved) : [
                {
                    firstName: "Adrián",
                    lastName: "Muñoz Mateo",
                    email: "adrianmugnoz@gmail.com",
                    country: "Spain",
                    gravatar: md5("adrianmugnoz@gmail.com")
                },
                {
                    firstName: "Contact 2",
                    lastName: "Last Name",
                    email: "contact2@gmail.com",
                    country: "Malta",
                    gravatar: md5("contact2@gmail.com")
                }
            ];

        return {
            getContacts: getContacts,
            addContact: addContact,
            editContact: editContact,
            deleteContact: deleteContact,
            checkEmail: checkEmail 
        };
        
        function getContacts() {
           return contacts;
        }

        function addContact(contact) {
            contacts.push(contact);
            save();
        }

        function editContact(contact, id){
            contacts[id] = contact;
            save();
        }

        function deleteContact(id) {
            contacts.splice(id,1);
            save();
        }

        function checkEmail(email, id){
            var registered = contacts.some(function (el, index) {
                return el.email === email && index != id;
            });
            return !registered;
        }

        function save(){
            localStorage.setItem('people', JSON.stringify(contacts));
        }
    }
})();