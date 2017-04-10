ngEnter
=======

Trigger an expression when the enter key is pressed.

Inspired from thist gist: https://gist.github.com/EpokK/5884263

install
-------

```
bower install ngEnter
```

usage
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

That simple!
