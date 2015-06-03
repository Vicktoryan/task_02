angular.module('customer-application', []).filter('totalSum', function(){
	return function(customer){
		if (typeof customer === 'undefined')  return;
		var sum = 0;
		customer.forEach(function(_o){
			sum = sum + (_o.unitPrice * _o.quantity);
		});
		return sum;
	};
})
.filter('orderByT', function(){
	return function(customer, sortType, order){
		if (typeof customer === 'undefined') return;
		if (sortType === 'total')
			for(var i=0; i <customer.length; i++)
				for(var i1=0; i1 <customer.length; i1++){
					var iTotal = customer[i].quantity * customer[i].unitPrice;
					var i1Total = customer[i1].quantity * customer[i1].unitPrice;
					if ((order === true && (iTotal >= i1Total)) || (order === false && (iTotal <= i1Total))){
							var max = customer[i];
							customer[i] = customer[i1];
							customer[i1] = max;
						}
				}
		return customer;
	};
})
.directive('customerDetail',  function(apiCustomer, $state, $stateParams){
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
});