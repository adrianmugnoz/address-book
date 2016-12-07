(function () {
    'use strict';

    describe('app module', function() {

      beforeEach(module('app'));

      var $controller;

      beforeEach(inject(function(_$controller_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
      }));

      describe('contacts controller', function(){
        var $scope, controller;

        beforeEach(function() {
          $scope = {};
          controller = $controller('contactsController', { $scope: $scope });
        });

        it('load contacts', function() {
        	var contacts = [ 
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
          expect($scope.people).toEqual(contacts);
        });

        it('should be defined', function() {
          expect(controller).toBeDefined();
        });

      });
    });
})();