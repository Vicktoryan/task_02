describe('api-customer', function () {
	beforeEach(module('api-customer-application'));
    beforeEach(inject(commonHttpBackend));

    it('can i get data-store instance', inject(function(apiCustomer){
        expect(apiCustomer).toBeDefined();
        expect(apiCustomer.getOrganisation).toBeDefined();
        expect(apiCustomer.isLoad).toBeDefined();
        expect(apiCustomer.loadOrganization).toBeDefined();
    }));

    it('can i test apiCustomer.organization method', inject(function($httpBackend,apiCustomer){
    	var organization = apiCustomer.getOrganisation();
		expect(organization.addCustomer).toBeDefined();
		expect(organization.addCustomer()).not.toBeDefined();

		expect(organization.removeCustomer).toBeDefined();
		expect(organization.getCustomerForEdit).toBeDefined();
		expect(organization.saveCustomer).toBeDefined();
		expect(organization.saveCustomer()).not.toBeDefined();

		expect(organization.addCustomerFromBD).toBeDefined();
		expect(organization.getCustomerById).toBeDefined();
		console.log(organization.addCustomerFromBD());
		expect(organization.addCustomerFromBD()).not.toBeDefined();
    }));

    it('can i test apiCustomer.organization.customer method', inject(function($httpBackend,apiCustomer){
    	var organization = apiCustomer.getOrganisation();
		organization.addCustomerFromBD(apiCustomer);
		var customer = organization.customers[0];

		var customerData = organization.customers[0];
		console.log(customerData);
		//var customer2 = organization.getCustomerForEdit(customer);

		expect(customer.addOrder).toBeDefined();
		expect(customer.removeOrder).toBeDefined();
		expect(customer.removeOrder()).not.toBeDefined();
		expect(customer.saveOrder).toBeDefined();
		expect(customer.saveOrder()).not.toBeDefined();

		expect(customer.getOrderForEdit).toBeDefined();
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


