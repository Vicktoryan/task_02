angular.module('api-customer-application', []).factory('apiCustomer', function(){

// var met = new Object();
// met.prototype.addCustomer = function(a){
// 				console.log(this);
// 			};
	// 	var m = this;
	// 	return {
	// 		getDataForKey: function(key){
	// 			return m.obj[key];
	// 		},

	// 		getData: function(){
	// 			return m.obj;
	// 		},

	// 		addData: function(object){
	// 			for(key in object){
	// 				console.log(key, object);
	// 				m.obj[key] = object[key];
	// 			}
	// 		},

	// 		removeCustomer: function(customer){
	// 			m.obj.customer.splice(customer, 1);
	// 		},


	// 		addCustomer: function(){
	// 			var index = m.obj.customer.push({
	// 				name: '',
	// 				id: new Date().getTime()
	// 			});
	// 			console.log(1);
	// 			return m.obj.customer[index-1];
	// 		}
	// 	};
	// };
	//


	function addCustomer (){
		var index = this.obj.customer.push({
			name: '',
			id: new Date().getTime()
		});
		return this.obj.customer[index-1];
	}

	function removeCustomer (customer){
		this.obj.customer.splice(customer, 1);
	}

	var data = [{
		id: '1',
		customer: []
	}, {
		id: '2',
		customer: []
	}];

	var nData = [];
	data.forEach(function(_d){
		nData.push({
			obj: _d,
			addCustomer: addCustomer,
			removeCustomer: removeCustomer
		});
	});

	return {
		getData: function(){
			return nData;
		}
	};
});