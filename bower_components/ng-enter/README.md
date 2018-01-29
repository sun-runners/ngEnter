ngEnter
=======

Trigger an expression when the enter key is pressed.

<br/>

DEMO
-------
https://kimsunwook.github.io/ngEnter

INSTALL
-------

```
bower install ng-enter --save
```

<br/>

USAGE
-----

Make sure you include the module 'ngEnter' in your application config

```
angular.module('myApp', [
  'ngEnter',
  ...
]);
```

```
<input
  ng-enter="message = 'enter pressed'" // Invoked when you press the Enter key
  ng-enter-model="model" // If you do not put object, $enter and $entered values ​​are stored in scope.
  ng-enter-duration="1000" // The value of $ enter lasts true and the default value is 100 (ms).
  ng-class="[
    {'enter_classes':model.$enter}, // The value of $enter becomes true on click and turns false after duration (ms).
    {'enter_classes':model.$entered} // The value of $entered is true when clicked and does not change.
  ]">
```

Once enter is pressed

```
$scope.message === 'enter pressed' // true
$scope.model.$enter === true // true
$scope.model.$entered === true // true
```

<br/>

Easy!
