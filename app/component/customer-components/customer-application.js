angular.module('customer-application', []).filter('totalSum', function(){
    return function(customer){
        if (typeof customer === 'undefined')  return;
        var sum = 0;
        customer.forEach(function(_o){
            sum = sum + ((_o.unitPrice || 0) * (_o.quantity || 0));
        });
        return sum;
    };
}).directive('customerDetail',  function(apiCustomer, $state, $stateParams){
	return {
		scope: true,
		templateUrl: 'app/component/customer-components/customer-detail.html',
		link: function($scope, iElm, iAttrs, controller) {
            if (apiCustomer.isLoad){
                var data = apiCustomer.getOrganisation();
                $scope.customer = data.getCustomerById($stateParams.id);
            } else {
                apiCustomer.loadOrganization().then(function(result){
                    var data = result;
                    $scope.customer = data.getCustomerById($stateParams.id);
                });
            }
		}
	};
}).directive('customerOrder', function($state){
	return {
		scope: true,
		templateUrl: 'app/component/customer-components/customer-order.html',
		link: function($scope){
			$scope.active = $state.current.name;
		}
	};
}).directive('customerList', function(apiCustomer){
	return {
		scope: true,
		templateUrl: 'app/component/customer-components/customer-list.html',
		link: function($scope){
			if (apiCustomer.isLoad){
                $scope.organization = apiCustomer.getOrganisation();
            } else {
                apiCustomer.loadOrganization().then(function(result){
                    $scope.organization = result;
                });
            }
		}
	};
});