ngEnter
=======

ngEnter is an angularjs library that triggers an expression when the enter key is pressed.

<br/>

DEMO
-------
https://kimsunwook.github.io/ngEnter

<br/>

INSTALL
-------

```
bower install ng-enter --save
```

<br/>

Quick start
-------
Copy-paste the ```<script>``` into your ```<body>```.

<br/>

### ngEnter.js

```
<script src=".bower_components/ng-enter/ngEnter.js"></script>
```
or
```
<script src="https://cdn.rawgit.com/KimSunWook/ngEnter/v1.1.2/ngEnter.js"></script>
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
  <!-- Invoked when you press the ENTER key -->
  ng-enter="message = 'ENTER is pressed.'"

  <!-- Called after duration (ms) after pressing the ENTER key. -->
  ng-enter-after="message = 'ENTER was pressed 1 second ago.'"

  <!-- If you do not put object, $enter and $entered values ​​are stored in scope. -->
  ng-enter-model="model"

  <!-- The value of $enter lasts true and the default value is 700 (ms). -->
  ng-enter-duration="1000"

  ng-class="[

    <!-- The value of $enter becomes true on click and turns false after duration (ms). -->
    {'enter_classes':model.$enter},

    <!-- The value of $entered is true when clicked and does not change. -->
    {'entered_classes':model.$entered}

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
