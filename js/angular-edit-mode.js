/**
 * Hello, <b>stranger</b>. This module was supposed to be used with the website's "admin panel", but we decided to just edit JSON files instead.
 * Use at your own risk.
 * Supply an "admin" parameter that, when true, shows the button. When scope.saving goes true, the "action" parameter (a function) is invoked
 * with the "args" parameter and a callback function as the second argument.
 * If you EVER use it, please tell me about it!
 * <a href="http://kubukoz.github.io">http://kubukoz.github.io</a>
 * */

angular.module("editMode", []).directive("editMode", function(){
    return {
        restrict: "E",
        scope: {action: "=", args: "=", admin: "=", editMode: "=editVar"},
        template: "<button ng-show=\"admin\" ng-class=\"{\'saving\':saving}\" ng-click=\"updateEditMode()\">\
        <span ng-show=\"!editMode\">Edytuj</span><span ng-show=\"editMode && !saving\">Zapisz</span>\
        <span ng-show=\"saving\">Zapisywanie</span>\
        <i class=\"fa fa-cog\" ng-class=\"{\'red\':saving, \'green\':editMode&&!saving}\"></i></button>",
        link: function(scope, elem, attr){
            scope.updateEditMode = function(){
                if(!scope.editMode) scope.editMode = true;
                else{
                    scope.saving = true;
                    scope.action && scope.action(scope.args, function(){
                        scope.saving = false;
                        scope.editMode = false;
                    });
                }
            }
        }
    }
});
