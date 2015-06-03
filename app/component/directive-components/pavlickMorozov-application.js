/**
 * Alexandr Kaznacheiskiy
 * skype: counturyan or alien000@mail.ru
 *
 * using
 *
 * base angular module should have
 * angular.module('......', [ 'directive-pavlick-marozov-application' ]
 * .value('_rootScopeArrayPavelMorozov', [])  - scope object name array
 * .value('_pavelMorozovShow', false)         - show directive
 * .constant('PAVLICK_MOROZOV_IS_LIFE', true) - create directive
 * .run(function($rootScope, _rootScopeArrayPavelMorozov, _pavelMorozovShow){
 *      $rootScope.pavelMorozovShow = _pavelMorozovShow;
 *      for(method in $rootScope) _rootScopeArrayPavelMorozov.push(method);
 * });
 *
 * in template
 * <div pavlick-morozov="name scope"></div>
 * <{directive name} pavlick-morozov="name scope"></{directive name}>
 * But directive don't have replace: true, may be you have problem ui.router
 * if you have show/ hide add
 * function ...() {
 *   $rootScope.pavelMorozovShow = !$rootScope.pavelMorozovShow;
 * };
 *
 */
angular.module('pavlickMorozov-application',[]).directive('pavlickMorozov', function($rootScope, _rootScopeArrayPavelMorozov, PAVLICK_MOROZOV_IS_LIFE){
    return {
        transclude: true,
        scope: true,
        rectric: 'A',
        templateUrl: 'app/component/directive-components/pavlickMorozov.html',
        link: function($scope, iElm, attr){
            $scope.createDerective = PAVLICK_MOROZOV_IS_LIFE;
            if (PAVLICK_MOROZOV_IS_LIFE === false) return;

            $scope.nameScope = attr.pavlickMorozov;

            $rootScope.$watch(function() {
                    return new Date().toTimeString();
                }, function(newValue, oldValue, scope) {
                $scope.pavelMorozovShow = $rootScope.pavelMorozovShow;
            });

            $scope.$parent.$watch(
                function() {
                    return new Date().toTimeString();
                },
                function(newValue, oldValue, scope) {

                    var changed = [];
                    var typeOfChange = '';
                    var enableChange = false;
                    var rootObjectName;
                    var isRootScope = scope.$parent ? false : true;

                    if (isRootScope){
                        enableChange = false;
                        for(rootObjectName in $rootScope) {
                            if (_rootScopeArrayPavelMorozov.indexOf(rootObjectName) === -1 && rootObjectName[0] != '$'){
                                typeOfChange = (typeof $rootScope[rootObjectName]);
                                if (typeOfChange === 'string' || typeOfChange === 'number') typeOfChange += ' (' + $rootScope[rootObjectName] +')';
                                changed.push({name : rootObjectName,  type: typeOfChange});
                            }
                        }
                        if (!$scope.countChangeName){
                            $scope.nameScope += ' - SCOPE ROOT';
                            $scope.countChangeName = true;
                        }
                    } else {
                        if (!$scope.countChangeName){
                            $scope.nameScope = 'scope - ' + $scope.nameScope;
                            $scope.countChangeName = true;
                        }
                        for(var objectName in scope){
                            for(rootObjectName in $rootScope) if (objectName === rootObjectName) enableChange = true;

                            if (enableChange === false){
                                typeOfChange = (typeof scope[objectName]);
                                var isParent;

                                for(var parentObjectName in scope.$parent)
                                    if (parentObjectName === objectName && parentObjectName !== '$$transcluded') isParent = true;

                                if (typeOfChange === 'string' || typeOfChange === 'number') typeOfChange += ' (' + scope[objectName] +')';
                                if (objectName !== '$$transcluded') changed.push({name: objectName, type: typeOfChange, isParent: isParent});
                            }
                        }
                    }
                    $scope.newObjectsScope = changed;
            });
        }
    };
});