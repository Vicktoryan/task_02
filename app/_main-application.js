angular.module('main-application.templates', []);
angular.module('main-application', [
    'component.ajax-error',
    'component.app-version',
    'pavlickMorozov-application',
    'api-customer-application',
    'main-application.templates',
    'ui.router',
    'ui.bootstrap'
])
.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/:filter',
      template: '<main-page></main-page>',
    });

  $urlRouterProvider.otherwise('/');
})
.value('_rootScopeArrayPavelMorozov', [])
.value('_pavelMorozovShow', false)
.constant('PAVLICK_MOROZOV_IS_LIFE', true)
.run(function($rootScope, _rootScopeArrayPavelMorozov, _pavelMorozovShow){
	$rootScope.pavelMorozovShow = _pavelMorozovShow;
    for(method in $rootScope) _rootScopeArrayPavelMorozov.push(method);
});