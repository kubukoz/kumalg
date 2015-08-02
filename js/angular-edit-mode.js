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
