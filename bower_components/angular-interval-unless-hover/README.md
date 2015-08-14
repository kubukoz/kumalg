# angular-interval-on-no-hover
Directive for firing events in intervals if not hovered.

# Installation

Bower
```bash
bower install angular-interval-unless-hover
```
index.html
```html
<script src="angular.js"></script>
<!--other modules-->
<script src="{{repositoryRoot}}/angular-interval-unless-hover.js"></script>
<!--other modules-->
<script src="app/main.js"></script>
```
main.js
```javascript
var app = angular.module("myApp", ["kzIntervalUnlessHover"]);
```
#Usage
main.js
```javascript
app.run(['$rootScope', function($rootScope){
  //...
  $rootScope.someFunction = function(){
    console.log("triggered click");
  };
  //...
}])
```

template.html
```html
<ANY kz-interval-unless-hover="someFunction" kz-interval="2000"></ANY>
```
#Attributes
* __kz-interval-unless-hover__ - required, specifies the function called in intervals if the user is not hovering the element it's used on
* __kz-interval__ - optional, specifies the timeout between function calls. 1000 by default.
* __kz-padding__ - optional, set to a float (e.g. 0.1) to disable function calls if the element's not in the (1-2*padding) central part of the screen - in this case, 80%. If not specified, the calls will be made even if the element's completely invisible.
