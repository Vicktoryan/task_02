angular.module('main-application').directive('mainPage', function(apiCustomer){
    return {
        scope: true,
        templateUrl: 'app/main-application.html',
        link: function($scope, el, at, mod){
            $scope.organization = apiCustomer.getOrganisation();
        }
    };
})

















.directive('checkeBox', function(apiCustomer){
    return {
        // scope: {
        // 	ngM: '=ngModal'
        // },
        require: '^ngModel',
        template: '<div class="btn" ng-click="checked = !checked"><span ng-show="checked">X</span><span ng-hide="checked">V</span></div>',
        // template: '<input value="{{$scope.ngM}}" type="text"/>',
        link: function($scope, el, at, ngModel){


ngModel.$render = function(){
	$scope.checked = ngModel.$viewValue;
}

$scope.$watch('checked', function(){
	ngModel.$setViewValue($scope.checked);
});



        }
    };
}).directive('', ['', function(){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		// scope: {}, // {} = isolate, true = child, false/undefined = no change
		// controller: function($scope, $element, $attrs, $transclude) {},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		// restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		// templateUrl: '',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {
			
		}
	};
}]);