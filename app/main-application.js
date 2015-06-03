angular.module('main-application').directive('mainPage', function(apiCustomer, $state){
    return {
        scope: true,
        templateUrl: 'app/main-application.html',
        link: function($scope, el, at, mod){
            //$scope.organization = apiCustomer.getOrganisation();
            if (apiCustomer.isLoad){
                $scope.organization = apiCustomer.getOrganisation();
            } else {
                apiCustomer.loadOrganization().then(function(result){
                    $scope.organization = result;
                    console.log($scope.organization);
                });
            }

            $scope.showOrder = function(customer){
                $state.go('detail', {id : customer._id.$oid});
            };
        }
    };
});