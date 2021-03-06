describe('customer-application', function () {
	beforeEach(module('templates'));
	beforeEach(module('ui.router'));
	beforeEach(module('customer-application'));
    beforeEach(inject(commonHttpBackend));

    it('element should get customer-order', inject(function (directiveBuilder) {
        var directive = directiveBuilder.build('<customer-order></customer-order>');
        directive.scope.$digest();
        expect(directive.element.html()).toBeDefined();
        expect(directive.element.controller).toBeDefined();
    }));

    it('element should get customer-list', inject(function (directiveBuilder, $httpBackend, apiCustomer) {
        var directive = directiveBuilder.build('<customer-list></customer-list>');
        directive.scope.$digest();
        expect(directive.element.html()).toBeDefined();
        expect(directive.element.controller).toBeDefined();
        var data = apiCustomer.getOrganisation();
        expect(apiCustomer.getOrganisation()).toEqual(data);
    }));

    it('element should get customer-detail', inject(function (directiveBuilder, $httpBackend, apiCustomer) {
        var directive = directiveBuilder.build('<customer-detail></customer-detail>');
        directive.scope.$digest();
        expect(directive.element.html()).toBeDefined();
        expect(directive.element.controller).toBeDefined();
    }));

    it('check filter',inject(function($filter){
        var data = [{
            unitPrice:1,
            quantity: 1
        }];
        var res = $filter('totalSum')(data);
        expect(res.length).not.toBe(0);
        expect(res).toBe(1);
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