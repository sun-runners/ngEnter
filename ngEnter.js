(function(angular) {
  angular.module('ngEnter', ['ng'])
  .directive("ngEnter", function ($rootScope, $timeout) {
		return {
      link: function (scope, element, attrs) {
        // Listen to keypress event
         var timeout_enter;
         angular.element(element).bind("keydown keypress", function(event) {
           // Set model
           var model
           if(scope.$eval(attrs.ngEnterModel)) model = scope.$eval(attrs.ngEnterModel);
           else model = scope;

           // When Enter key is pressed
           if (event.which === 13) {
             // $enter 가 false 나 undefined 일때만 작동
             // ( 연속해서 true 로 멈춰있는 경우 방지 )
             if(!model.$enter){
               if(timeout_enter) $timeout.cancel(timeout_enter);
               // Set $enter true and execute ng-enter
               scope.$apply(function() {
                 model.$enter = true;
                 model.$entered = true;
                 scope.$eval(attrs.ngEnter);
               });

               // Set $enter false after duration
               var duration = Number(attrs.ngEnterDuration);
               if(!(duration>=0)) duration = 100;
               timeout_enter = $timeout(function(){
                 model.$enter = false;
               }, duration);
             }
             event.preventDefault();
           }
         });
      },
			scope:false,
			restrict:"EA"
		};
	});
})(angular);

// (function(angular) {
//   angular.module('ngEnter', ['ng'])
//   .directive("ngEnter", function ($rootScope, $timeout) {
// 		return {
//       transclude:'element',
//       terminal: true,
//       $$tlb: true,
//       priority: 1000,
//       compile: function(tElement, tAttrs, transclude) {
//         return {
//            pre: function(scope, iElement, iAttrs, controller) {
//              // Create new scope
//              var _scope = scope.$new(false);
//
//              // Link element with new scope
//              element = transclude(_scope, angular.noop);
//
//              // Listen to keypress event
//              var timeout_enter;
//              angular.element(element).bind("keydown keypress", function(event) {
//                // When Enter key is pressed
//                if (event.which === 13) {
//                  // $enter 가 false 나 undefined 일때만 작동
//                  // ( 연속해서 true 로 멈춰있는 경우 방지 )
//                  if(!_scope.$enter){
//                    if(timeout_enter) $timeout.cancel(timeout_enter);
//                    // Set $enter true and execute ng-enter
//                    _scope.$apply(function() {
//                      _scope.$enter = true;
//                      _scope.$entered = true;
//                      _scope.$eval(iAttrs.ngEnter);
//                    });
//
//                    // Set $enter false after duration
//                    var duration = Number(iAttrs.ngEnterDuration);
//                    if(!(duration>=0)) duration = 100;
//                    timeout_enter = $timeout(function(){
//                      _scope.$enter = false;
//                    }, duration);
//                  }
//                  event.preventDefault();
//                }
//              });
//
//              var frag = document.createDocumentFragment();
//              frag.appendChild(element[0]);
//              iElement.after(frag);
//            }
//         }
//       },
// 			restrict:"EA"
// 		};
// 	});
// })(angular);
