angular.module("kzIntervalUnlessHover", []).directive("kzIntervalUnlessHover", function ($interval, $window) {
    var h;
    var checkWindowSize = function () {
        h = Math.max(document.documentElement.clientHeight, $window.innerHeight || 0);
    };
    var isInViewingCenter = function (elem, padding) {
        const viewportOffset = elem[0].getBoundingClientRect();
        const top = viewportOffset.top;
        const bottom = viewportOffset.bottom;
        return (top > h * padding && top < h*(1-padding)) || (bottom > h * padding && bottom < h*(1-padding));
    }
    angular.element($window).bind('resize', checkWindowSize);
    checkWindowSize();

    return {
        scope: {kzIntervalUnlessHover: "=", interval: "=kzInterval", padding: "=kzPadding"},
        link: function (scope, elem) {
            var promise;
            var start = function () {
                if (promise == null)
                    promise = $interval(function () {
                        if (scope.padding==null || isInViewingCenter(elem, scope.padding)) {
                            scope.kzIntervalUnlessHover && scope.kzIntervalUnlessHover();
                        }
                    }, scope.interval || 1000)
            };
            var stop = function () {
                if (promise != null) {
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
