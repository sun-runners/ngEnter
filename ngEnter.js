(function(angular) {
  angular.module('ngEnter', ['ng'])
  .directive("ngEnter", ['$rootScope', '$timeout' function ($rootScope, $timeout) {
		return {
      link: function (scope, element, attrs) {

        var getModel = function(){
          // Set model
          var model;
          if(scope.$eval(attrs.ngEnterModel)){
            model = scope.$eval(attrs.ngEnterModel);
          }
          else{
            if(attrs.ngEnterModel){
              scope[attrs.ngEnterModel] = {};
              model = scope[attrs.ngEnterModel];
            }
            else{
              model = scope;
            }
          }
          return model;
        };

        // Listen to keypress event
         var timeout_enter;
         angular.element(element).bind("keydown keypress", function(event) {
           // Set model
           var model = getModel();

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
               if(!(duration>=0)) duration = 700;
               timeout_enter = $timeout(function(){
                 model.$enter = false;
                 scope.$eval(attrs.ngEnterAfter);
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
}])(angular);
