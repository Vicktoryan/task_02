angular.module('navbar-application', [
	]).directive('navbar', function($rootScope, $state){
	return {
		scope: true,
		templateUrl: 'app/component/navbar-component/navbar-application.html',
		link: function($scope, iElm, iAttrs, controller) {
			$scope.nn = 0;
			$scope.hideAllDirectives = function() {
return '2222';
               // $rootScope.pavelMorozovShow = !$rootScope.pavelMorozovShow;
            };
            $scope.$watch(function(){
            	return $state.current.name;
            }, function(){
				$scope.active = $state.current.name;
            });
		}
	};
});