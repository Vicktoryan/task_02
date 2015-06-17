angular.module('main-application').directive('mainPage', function(apiCustomer, $state){
    return {
        scope: {},
        templateUrl: 'app/main-application.html',
        link: function($scope, el, at, mod){
            if (apiCustomer.isLoad){
                $scope.organization = apiCustomer.getOrganisation();
            } else {
                apiCustomer.loadOrganization().then(function(result){
                    $scope.organization = result;
                });
            }
            $scope.showOrder = function(customer){
                $state.go('detail', {id : customer._id.$oid});
            };
        }
    };
});