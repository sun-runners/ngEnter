'use strict';

angular.module("app")
	.directive("subheaderDir", function () {
		return {
			link: function (scope, element, attrs) {
			},
			replace: true,
			scope:{
      },
			restrict:"EA",
			templateUrl: 'demo/views/subheaderDir.html'
		};
	});
