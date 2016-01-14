'use strict';

/**
 * @ngdoc overview
 * @name twikuromApp
 * @description
 * # twikuromApp
 *
 * Main module of the application.
 */
angular.module('twikuromApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
	'twikuromApp.services'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'TwitterController',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
