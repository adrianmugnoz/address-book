/**
 * Load states for application
 * more info on UI-Router states can be found at
 * https://github.com/angular-ui/ui-router/wiki
 */
(function () {
    angular
        .module('app')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

        // any unknown URLS go to 404
        $urlRouterProvider.otherwise('/404');
        // no route goes to index
        $urlRouterProvider.when('', '/');
        // use a state provider for routing

        $stateProvider
            .state('contacts', {
                url: '/',
                templateUrl: 'app/components/contacts/contacts.view.html',
                controller: "contactsController",
                controllerAs: 'ctrl'
            })
            .state('404', {
                url: '/404',
                templateUrl: 'app/shared/404.html'
            })
            .state('add', {
                url: '/add',
                templateUrl: 'app/components/edit/edit.view.html',
                controller: 'editController',
                controllerAs: 'ctrl'
            })
            .state('edit', {
                url: '/edit/:id',
                templateUrl: 'app/components/edit/edit.view.html',
                controller: 'editController',
                controllerAs: 'ctrl'
            });
    }]);
})();