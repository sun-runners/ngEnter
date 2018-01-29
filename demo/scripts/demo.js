'use strict';

angular.module('app')
	.controller('DemoCtrl', function ($scope, $rootScope, $timeout) {
		$scope.messages = [
	    'Thank you for pressing the enter key!1',
	    'Thank you for pressing the enter key!2',
	    'Thank you for pressing the enter key!3'
	  ];
		$scope.message_index = 0;

		var granimInstance = new Granim({
		   element: '#granim-canvas',
			 direction: 'radial',
		   name: 'granim',
		   opacity: [1, 1],
		   states : {
					"default-state": {
						gradients: [
							['#80D8FF', '#40C4FF'],
							['#00B0FF', '#0091EA'],
							['#0091EA', '#00B0FF'],
							['#40C4FF', '#80D8FF']
						]
					}
		   }
		});
});
