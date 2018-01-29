'use strict';

angular.module('app')
	.controller('DemoCtrl', function ($scope, $rootScope, $timeout) {
		$scope.messages = [
	    'Thank you for pressing the enter key!1',
	    'Thank you for pressing the enter key!2',
	    'Thank you for pressing the enter key!3'
	  ];
		$scope.message_index = 0;
});
