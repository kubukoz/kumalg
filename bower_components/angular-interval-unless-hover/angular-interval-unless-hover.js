angular.module("kzIntervalUnlessHover", []).directive("kzIntervalUnlessHover", function($interval){
    return {
        scope: {kzIntervalUnlessHover: "=", interval: "=kzInterval"},
        link: function(scope, elem){
            var promise;
            var start = function(){
                if(promise == null) promise = $interval(function(){
                    scope.kzIntervalUnlessHover && scope.kzIntervalUnlessHover();
                }, scope.interval || 1000)
            };
            var stop = function(){
                if(promise!=null){
                    $interval.cancel(promise);
                    promise = null;
                }
            };
            elem.on("mouseout", start);
            elem.on("mouseover", stop);
            start();
        }
    }
})
