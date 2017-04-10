ngEnter
=======

Trigger an expression when the enter key is pressed.

INSTALL
-------

```
bower install ng-enter --save
```

USAGE
-----

Make sure you include the module in your application config

```
angular.module('myApp', [
  'ngEnter',
  ...
]);
```

```
<input ng-enter="modelValue = 'enter pressed'"></input>
```

Once enter is pressed

```
$scope.modelValue === 'enter pressed' // true
```

Easy!
