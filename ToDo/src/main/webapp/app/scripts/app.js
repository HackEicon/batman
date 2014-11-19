'use strict';

angular
  .module('app', ['ngRoute', 'app.services', 'app.controllers', 'app.directives'])
  .config(['$provide', '$routeProvider'
    , function ($provide, $routeProvider) {

    $routeProvider
      .when('/', {
        redirectTo: '/cardapio'
      })
      .when('/:menu', {
        templateUrl: function (params) {
          return 'views/' + params.menu + '.html';
        }
      });
      // .when('/cardapio', {
      //   templateUrl: 'views/cardapio.html',
      //   controller: 'RestauranteCtrl'
      // })
      // .when('/composicao', {
      //   templateUrl: 'views/composicao.html',
      //   controller: 'RestauranteCtrl'
      // })
      // .when('/alimento', {
      //   templateUrl: 'views/alimento.html',
      //   controller: 'RestauranteCtrl'
      // })
      // .when('/evento', {
      //   templateUrl: 'views/evento.html',
      //   controller: 'RestauranteCtrl'
      // });
      // .when('/tasks', {
      //   templateUrl: 'views/tasks.html'
      // })
      // .when('/tasks/:status', {
      //   templateUrl: 'views/tasks.html'
      // })
      // .when('/examples', {
      //   templateUrl: 'views/examples.html',
      //   controller: 'ExamplesCtrl'
      // })
      // .when('/examples/:id', {
      //   templateUrl: function (params) {
      //     return 'views/code-examples/example-' + params.id + '.html';
      //   }
      // })
      // .when('/interesting', {
      //   templateUrl: 'views/interesting.html',
      //   controller: 'InterestingCtrl'
      // });

  }]);

angular.bootstrap(document, ['app']);
