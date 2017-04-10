(function(angular) {
    angular.module('ngEnter', ['ng'])
        .directive('ngEnter', function() {
            return function(scope, element, attrs) {
                angular.element(element).bind("keydown keypress", function(event) {
                    if (event.which === 13) {
                        scope.$apply(function() {
                            scope.$eval(attrs.ngEnter);
                        });

                        event.preventDefault();
                    }
                });
            };
        });
})(angular);
