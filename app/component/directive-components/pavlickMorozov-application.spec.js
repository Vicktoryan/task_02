describe('pavlickMorozov', function () {
    beforeEach(module('templates'));
    beforeEach(module('main-application'));
    
	beforeEach(module('pavlickMorozov-application'));
    var rootScopeArrayPavelMorozov, PAVLICK_MOROZOV_IS_LIFE;

    it('element should get compiled', inject(function (directiveBuilder, PAVLICK_MOROZOV_IS_LIFE, 
        _pavelMorozovShow, _rootScopeArrayPavelMorozov, $rootScope) {

        var directive = directiveBuilder.build('<pavlick-morozov></pavlick-morozov>');
        directive.scope.$digest();
        expect(directive.element.html()).toBeDefined();
        expect(directive.element.controller).toBeDefined();
        $rootScope.pavelMorozovShow = '1';
        expect(directive.scope.pavelMorozovShow).toEqual('1');


    }));
});