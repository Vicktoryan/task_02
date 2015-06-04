angular.module('main-application.templates', []);
angular.module('main-application', [
    'component.ajax-error',
    'component.app-version',
    'navbar-application',
    'pavlickMorozov-application',
    'api-customer-application',
    'main-application.templates',
    'customer-application',
    'ui.router',
    'ui.bootstrap'
])
.config(function ($stateProvider, $urlRouterProvider, mongolabFactoryProvider) {
  mongolabFactoryProvider.setConfigs({
      dataBase: 'task2',
      apiKey: 'uevXim_7kDAhbcOeRDEvuU9KY_k-ZeK8'
  });

  $stateProvider
    .state('home', {
      url: '/',
      template: '<main-page></main-page>',
    })
    .state('detail', {
      url: '/detail/:id',
      template: '<customer-detail></customer-detail>'
    })
    .state('list', {
      url: '/list',
      template: '<customer-list></customer-list>'
    });

  $urlRouterProvider.otherwise('/');
})
.value('_rootScopeArrayPavelMorozov', [])
.value('_pavelMorozovShow', false)
.constant('PAVLICK_MOROZOV_IS_LIFE', true)
.run(function($rootScope, _rootScopeArrayPavelMorozov, _pavelMorozovShow){
	$rootScope.pavelMorozovShow = _pavelMorozovShow;
    for(method in $rootScope) _rootScopeArrayPavelMorozov.push(method);
}).constant('mongolabConfigs',  {
    mongolabUrl: 'https://api.mongolab.com/api/1/databases',
    collection: 'test-collection2',
    dataBase: null,
    apiKey: null
});