"use strict";
var removeDiacr = function(str){
    var original = ["ą", "ć", "ę", "ń", "ł", "ż", "ź", "ó", "ś"];
    var resultin = ["a", "c", "e", "n", "l", "z", "z", "o", "s"];
    var s = str;
    for (var i = 0; i < original.length; i++)
        s = s.split(original[i]).join(resultin[i]);
    return s;
}
var nameToUrl = function(name){
    return removeDiacr(name.split(" ").join("-").split("/").join("-").toLowerCase().split("\"").join(""));
}

var app = angular.module("kumalg", ["ngScrollSpy", "duScroll", "textAngular", "ngSilent", "ngRoute", "fitVids"]);
app.run(function($rootScope, $templateCache){
    $templateCache.put("templates/home.html", angular.element(document.getElementById("site")).html())
});
app.config(function (scrollspyConfigProvider, $httpProvider, $locationProvider, $routeProvider) {
    $httpProvider.defaults.withCredentials = true;
    $httpProvider.defaults.headers.delete = { "Content-Type": "application/json;charset=utf-8" };
    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix("!");
    $routeProvider
        .when("/", {
            templateUrl: "templates/home.html"
        })
        .when("/index.html", {redirectTo: "/"})
        .when("/login", {templateUrl: "templates/login.html", controller: "LoginController"})
        .when("/:category", {templateUrl: "templates/home.html"})
        .when("/:category/:selectedItem", {templateUrl: "templates/home.html"})
        .otherwise({redirectTo: "/"})
;
});
app.controller("OsiagnieciaController", function($scope, $http){
    var ac = $scope.achievements = {items: [], slideCount: 0, active: 0};
    $http.get("api/osiagniecia.json").success(function(result){
        ac.items = result;
        ac.slideCount = Math.round(ac.items.length/3);
    });
    ac.next = function(){
        ac.active+=(ac.active<ac.slideCount-1)?1:-ac.active;
    };
    ac.previous = function(){
        ac.active-=(ac.active>0)?1:-(ac.slideCount-1);
    };
});
app.controller("KlienciOMnieController", function($scope, $http){
    var op = $scope.opinions = {items: [], selected: 0};
    $http.get("api/klienci-o-mnie.json").success(function(result){
        op.items = result;
    })
});
app.controller("OfertaController", function($scope, $http){
    $http.get("api/oferta.json").success(function(result){
        $scope.proposals = result;
    })
})
app.controller("ClientController", function($scope, $http){
    $http.get("api/klienci.json").success(function(result){
        $scope.clients = result;
    })
})
app.controller("PortfolioController", function($scope, $routeParams, $document, $timeout, $location, $ngSilentLocation, $http){
    $scope.portfolio = {cats: [], selected: 0, selectedItem: null};

    $http.get("api/portfolio.json").success(function(result){
        $scope.portfolio.cats = result;
    })
    $scope.selectCategory = function(category){
        $ngSilentLocation.silent("/"+nameToUrl(category.name));
        angular.extend($scope.portfolio, {selected: category.id, selectedItem: null})
    }
    $scope.selectItem = function(item){
        $scope.portfolio.selectedItem = item;
        $document.scrollToElement(angular.element(document.getElementsByClassName("display")[0]), 100, 500);
    }
    if($routeParams.category){
        for (var i = 0; i < $scope.portfolio.cats.length; i++) {
            var cat = $scope.portfolio.cats[i];
            if (nameToUrl(cat.name) == $routeParams.category) {
                $scope.portfolio.selected = cat.id;
                if ($routeParams.selectedItem) {
                    for (var j = 0; j < cat.items.length; j++) {
                        var item = cat.items[j];
                        if (nameToUrl(item.name) == $routeParams.selectedItem) {
                            $scope.portfolio.selectedItem = item;
                            break;
                        }
                    }
                    if($scope.portfolio.selectedItem==null) $ngSilentLocation.silent("/"+$routeParams.category);
                }
                $timeout(function(){
                    $document.scrollToElement(angular.element(document.getElementById("portfolio")), 70, 1000);
                }, 100);
                break;
            }
        }
        if($scope.portfolio.selected<0) $ngSilentLocation.silent("/")
    } else $scope.portfolio.selected=0;
});
app.filter("trustAsHtml", function($sce){
    return function(input){
        return $sce.trustAsHtml(input);
    }
})
app.controller("FooterController", function($scope){
    $scope.currentYear = new Date().getUTCFullYear();
});
app.filter("range", function(){
    return function(input, total){
        for(var i = 0; i < total; i++)
            input.push(i);
        return input;
    }
});
app.directive("kzScroll", function($window){
    return {
        scope: false,
        link: function(scope,elem){
            var h;
            var resize = function(){
                h = Math.max(document.documentElement.clientHeight, $window.innerHeight || 0) - 70;
            };
            resize();
            $window.onresize = function(){
                resize();
            }
            $window.onscroll = function(){
                var x = Math.min($window.scrollY/h, 1);
                elem.attr("style", "background-color: rgba(20,20,20,%x)".replace("%x", x));
                var pstart = 255;
                var pend = 96;
                var delta = pstart-pend;
                var p = Math.round(pstart - Math.min(1,x)*delta);
                angular.element(elem[0].children[0].children[1]).attr("style", "color: rgb(%x, %x, %x)".split("%x").join(""+p));
            };
        }
    }
});
