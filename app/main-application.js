angular.module('main-application').directive('mainPage', function(apiCustomer){
    return {
        //scope: true,
        templateUrl: 'app/main-application.html',
        link: function($scope){
            $scope.data = apiCustomer.getData();

            $scope.$watch(function(){
                return new Date().toTimeString();
            }, function(){
                console.log(111);
            });
        }
    };
});