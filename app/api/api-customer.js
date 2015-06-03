angular.module('api-customer-application', []).factory('apiCustomer', function(){

	function getCustomerForEdit(customers){
		this.selectedCustomer = customers;
		return angular.copy(customers.customer);
	}	

	function saveCustomer(customer){
		if (!this.selectedCustomer) return;
		this.selectedCustomer.customer = angular.copy(customer);
	}

	function addCustomer(people){
		if (typeof people === 'undefined') return;
		people.id = new Date().getTime();
		var customer = {
			customer: angular.copy(people),
			addOrder: addOrder,
			removeOrder: removeOrder
		}
		var index = this.customers.push(customer);
		return this.customers[index-1];
	}


	function removeCustomer(customer){
		this.customers.splice(customer, 1);
	}

	function addOrder(product){
		if (typeof product === 'undefined') return;

		var index = this.customer.order.push({
			id: new Date().getTime(),
			name: product.name
		});
		return this.customer.order[index-1];
			
		// this.customer.push({
		// 	id:new Date().getTime(),
		// 	name:'qqq'
		// });
	}

	function removeOrder(order){
		if (typeof order === 'undefined') return;
		this.customer.order.splice(customer, 1);
	}

	var data = [{
		id: '1',
		firstName: 'test1'
	}, {
		id: '2',
		firstName: 'test2'
	}];

	var organisation = {
		addCustomer: addCustomer,
		removeCustomer: removeCustomer,
		getCustomerForEdit: getCustomerForEdit,
		saveCustomer: saveCustomer,
		customers: []
	};

	data.forEach(function(_d){
		organisation.addCustomer(_d);
		// _d.addCustomer=addCustomer;
		// _d.removeCustomer=removeCustomer;
	});
	return {
		getOrganisation: function(){
			return organisation;
		}
	};
});