'use strict';

angular.module("app")
	.directive("headerDir", function ($rootScope, $timeout) {
		return {
			link: function (scope, element, attrs) {

				var timeline_logo = anime.timeline({
				  autoplay: false
				});

				timeline_logo.add({
				  targets: '#bar',
				  height: '+=50%',
				  delay: 500,
				  duration: 500,
					easing: 'easeInOutQuad'
				}).add({
				  targets: '#text',
				  translateX: ['-100%', '0%'],
				  duration: 1000,
					easing: 'easeInOutQuad'
				});
				timeline_logo.play();

				// var timeout_toggle = $timeout(function () {
				// 	timeline_logo.played = true;
				// 	scope.toggle();
				// }, 5000);

				scope.toggle = function(){
					// if(timeout_toggle) $timeout.cancel(timeout_toggle);
					timeline_logo.play();
					if(timeline_logo.played) timeline_logo.reverse();
					timeline_logo.played = true;
				};

				scope.goLink = function(){
					$rootScope.window.location.href = scope.link;
				};

			},
			replace: true,
			scope:{
        project:"=project",
        writer:"=writer",
        link:"=link"
      },
			restrict:"EA",
			templateUrl: 'demo/views/headerDir.html'
		};
	});
