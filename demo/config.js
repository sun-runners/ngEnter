'use strict';

angular.module('app')
  .config(function ($httpProvider, $resourceProvider, $stateProvider, $urlRouterProvider, $locationProvider) {

    $resourceProvider.defaults.stripTrailingSlashes = false;

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $stateProvider
      .state('demo', { url: '/', templateUrl: 'demo/views/demo.html', controller: 'DemoCtrl', params:{data:null} })
      .state('code', { url: '/', templateUrl: 'demo/views/code.html', controller: 'CodeCtrl', params:{data:null} });

    $urlRouterProvider.otherwise('/');

  });
