// describe('main', function () {

//     beforeEach(module('templates'));
// 	beforeEach(module('main-application'));

// //beforeEach(inject($stateProvider));



//     it('element should get compiled', inject(function (directiveBuilder) {

//         var directive = directiveBuilder.build('<main-page></main-page>');
//         //directive.scope.$digest();
//         //expect(directive.element.html()).toBeDefined();
//         //expect(directive.element.controller).toBeDefined();

// //console.log($rootScope.hideAllDirectives);

//         // var scopeScope = directive.element.isolateScope();
//         // scopeScope.$digest();
//         // expect(scopeScope.hideAllDirectives).toBeDefined();
//     }));
// });

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