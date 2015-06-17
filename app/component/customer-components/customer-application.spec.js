describe('customer-application', function () {
	beforeEach(module('templates'));
	beforeEach(module('ui.router'));

	beforeEach(module('customer-application'));
    //beforeEach(inject(commonHttpBackend));

    it('element should get compiled', inject(function (directiveBuilder) {

        var directive = directiveBuilder.build('<customer-order></customer-order>');
        directive.scope.$digest();
        //$httpBackend.flush();
        expect(directive.element.html()).toBeDefined();
        expect(directive.element.controller).toBeDefined();
        //console.log(directive.scope.active);
        //expect(directive.scope.active).toBe(1);
    }));

    // it('element should get compiled', inject(function (directiveBuilder) {

    //     var directive = directiveBuilder.build('<customer-list></customer-list>');
    //     //$httpBackend.flush();
    //     //directive.scope.$digest();
    //     //$httpBackend.flush();
    //     expect(directive.element.html()).toBeDefined();
    //     expect(directive.element.controller).toBeDefined();
    //     //console.log(directive.scope.active);
    //     //expect(directive.scope.active).toBe(1);
    // }));

    // it('element should get compiled', inject(function (directiveBuilder) {

    //     var directive = directiveBuilder.build('<customer-detail></customer-detail>');
    //     //directive.scope.$digest();
    //     //$httpBackend.flush();
    //     expect(directive.element.html()).toBeDefined();
    //     expect(directive.element.controller).toBeDefined();
    //     //console.log(directive.scope.active);
    //     //expect(directive.scope.active).toBe(1);
    // }));
});