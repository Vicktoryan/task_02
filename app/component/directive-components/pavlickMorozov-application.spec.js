describe('pavlickMorozov', function () {
    beforeEach(module('templates'));
    beforeEach(module('main-application'));
	beforeEach(module('pavlickMorozov-application'));

    it('element should get compiled', inject(function (directiveBuilder, PAVLICK_MOROZOV_IS_LIFE,
        _pavelMorozovShow, _rootScopeArrayPavelMorozov, $rootScope) {
        var directive = directiveBuilder.build('<pavlick-morozov></pavlick-morozov>');
        directive.scope.$digest();
        expect(directive.element.html()).toBeDefined();
        expect(directive.element.controller).toBeDefined();

        $rootScope.newData = ['1'];
        $rootScope.$digest();
    }));
});