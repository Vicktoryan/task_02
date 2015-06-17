describe('main', function () {

    beforeEach(module('templates'));
 	beforeEach(module('main-application'));
	beforeEach(module('ui.router'));
	beforeEach(module('api-customer-application'));

	beforeEach(inject(commonHttpBackend));



    it('element should get compiled', inject(function (directiveBuilder, $httpBackend, apiCustomer, $state, $rootScope) {
    	var customer = {_id: {$oid : 1}};
        var directive = directiveBuilder.build('<main-page></main-page>');
        directive.scope.$digest();
        spyOn($state, 'go');
        expect(directive.element.html()).toBeDefined();
        expect(directive.element.controller).toBeDefined();
		expect(directive.element.scope().showOrder).toBeDefined();

		directive.scope.organization = apiCustomer.loadOrganization();
		apiCustomer.isLoad = false;
		expect(directive.scope.organization).toEqual(apiCustomer.loadOrganization());

		directive.scope.organization = apiCustomer.getOrganisation();
		apiCustomer.isLoad = true;
		expect(directive.scope.organization).toEqual(apiCustomer.getOrganisation());

		directive.element.scope().showOrder(customer);
		expect($state.go).toHaveBeenCalled();
    }));
});

function commonHttpBackend($httpBackend){
    var url='https://api.mongolab.com/api/1/databases/task2/collections/Task2-collection?apiKey=uevXim_7kDAhbcOeRDEvuU9KY_k-ZeK8';
    $httpBackend.whenGET(url).respond(200,
		[
		{
			"_id" : { "$oid" : "55756365e4b0d80d956610c7"} ,
			"information" :
			{
				"firstName" : "w" ,
				"lastName" : "w" ,
				"city" : "w" ,
				"street" : "w"
			} ,
			"orders" : [ ]
		} , {
			"_id" : { "$oid" : "5575639ae4b0d80d95661112"} ,
			"information" :
			{
				"firstName" : "s11111" ,
				"lastName" : "s" ,
				"city" : "s" ,
				"street" : "s"
			} ,
			"orders" : [ { "product" : "aasdfafffffffffffffffffffffffff" , "id" : 1434303048978}] ,
			"selectedOrder" : { "product" : "aasdfaf" , "id" : 1434303048978}
		} , {
			"_id" : { "$oid" : "55791187e4b03f16b9d91113"} ,
			"information" :
			{
				"firstName" : "s" ,
				"lastName" : "s" ,
				"city" : "s" ,
				"street" : "s"
			} ,
			"orders" : [ ]} ]

    	);
}