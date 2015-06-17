describe('navbar', function () {

    beforeEach(module('templates'));
    beforeEach(module('ui.router'));
	beforeEach(module('navbar-application'));

//beforeEach(inject($stateProvider));



    it('element should get compiled', inject(function (directiveBuilder, $rootScope) {

        var directive = directiveBuilder.build('<navbar></navbar>');
        directive.scope.$digest();
        expect(directive.element.html()).toBeDefined();
        expect(directive.element.controller).toBeDefined();

        var scopeScope = directive.element.isolateScope();
        scopeScope.$digest();
        expect(scopeScope.hideAllDirectives).toBeDefined();
        $rootScope.pavelMorozovShow = true;
        expect($rootScope.pavelMorozovShow).toBe(true);
        scopeScope.hideAllDirectives();
        expect($rootScope.pavelMorozovShow).toBe(false);
    }));
});