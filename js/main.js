"use strict";
var removeDiacr = function(str){
    var original = ["ą", "ć", "ę", "ń", "ł", "ż", "ź", "ó", "ś"];
    var resultin = ["a", "c", "e", "n", "l", "z", "z", "o", "s"];
    var s = str;
    for (var i = 0; i < original.length; i++)
        s = s.split(original[i]).join(resultin[i]);
    return s;
};
var nameToUrl = function(name){
    return removeDiacr(name.split(" ").join("-").split("/").join("-").toLowerCase().split("\"").join(""));
};

var app = angular.module("kumalg", ["ngScrollSpy", "duScroll", "textAngular", "ngRoute", "fitVids", "kzIntervalUnlessHover", "ngCookies"]);
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
    op.next = function(){
        op.selected+=(op.selected<op.items.length-1)?1:-op.selected;
    }
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
app.controller("PortfolioController", function($scope, $routeParams, $document, $timeout, $location, $http){
    $scope.portfolio = {cats: [], selected: 0, selectedItem: null, display: false};

    $http.get("api/portfolio.json").success(function(result){
        $scope.portfolio.cats = result;
    });
    $scope.selectCategory = function(index){
        angular.extend($scope.portfolio, {selected: index, display: false})
        $timeout(function(){
            $scope.portfolio.selectedItem = null;
        }, 500);
    };
    $scope.selectItem = function(item){
        $scope.portfolio.display = true;
        $scope.portfolio.selectedItem = item;
        $document.scrollToElement(angular.element(document.getElementsByClassName("display")[0]), 100, 500);
    };
    $scope.unselectItem = function(){
        $scope.portfolio.display = false;
        $timeout(function(){
            $scope.portfolio.selectedItem = null;
        }, 500);
    };
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
app.filter("stripProtocol", function(){
    return function(url){
        return url?url.split("://").slice(1).join("://"):"";
    }
})
app.directive("cookieConsent", function($cookies){
    return {
        scope: false,
        link: function(scope){
            scope.cookiesAccepted = $cookies.get("acceptCookies");
            scope.acceptCookies = function(){
                var expires = new Date();
                expires.setFullYear(expires.getFullYear()+1);
                $cookies.put("acceptCookies", "true", {expires: expires});
                scope.cookiesAccepted = true;
            }
        }
    }
})
