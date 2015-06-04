angular.module('api-customer-application', [
	'ngResource'
]).factory('apiCustomer', function(mongolabFactory, $q){
	function getCustomerForEdit(customers){
		this.selectedCustomer = customers;
		return angular.copy(customers.information);
	}

	function saveCustomer(information){
		if (!this.selectedCustomer) return;
		var me = this;
		var id = this.selectedCustomer._id.$oid;
		var data = angular.copy(information);
		mongolabFactory.update({id: id}, data).$promise.then(function (resource) {
			me.selectedCustomer.information = data;
		});
	}

	function addCustomer(people){
		if (typeof people === 'undefined') return;
		var me = this;
        mongolabFactory.save(people).$promise.then(function (resource) {
        	people.orders = [];
			var information = {
				_id: resource._id,
				orders: [],
				information: angular.copy(people),
				addOrder: addOrder,
				removeOrder: removeOrder,
				saveOrder: saveOrder,
				getOrderForEdit: getOrderForEdit
			};
			me.customers.push(information);
        });
	}

	function addCustomerFromBD(people){
		if (typeof people === 'undefined') return;
		var id = angular.copy(people._id);
		delete people._id;
		var information = {
			_id: id,
			information: angular.copy(people),
			orders: [{
					id: 1,
							product: 'E',
							quantity: 5,
							unitPrice: 10
						}, {
					id: 2,
							product: 'A2',
							quantity: 2,
							unitPrice: 200
						}],
			addOrder: addOrder,
			removeOrder: removeOrder,
			saveOrder: saveOrder,
			getOrderForEdit: getOrderForEdit
		};
		this.customers.push(information);
	}

	function removeCustomer(customer){
		var me = this;
		 mongolabFactory.remove({id: customer._id.$oid}).$promise.then(function(abc){
		 	me.customers.splice(me.customers.indexOf(customer), 1);
         });
	}

	function getCustomerById(id){
		var customer = {};
		var me = this;
		this.customers.forEach(function(_customer){
			if (_customer._id.$oid === id){
				customer = _customer;
				return;
			}
		});
		return customer;
	}

	function getOrderForEdit(order){
		this.selectedOrder = order;
		return angular.copy(order);
	}

	function addOrder(product){
		if (typeof product === 'undefined') return;
		var me = this;

		console.log(this._id);
		product.id = new Date().getTime();
		this.orders.push(angular.copy(product));
	}

	function saveOrder(product){
		if (typeof product === 'undefined') return;
		var orders = angular.copy(this.orders);
		orders[this.orders.indexOf(this.selectedOrder)] = product;
		this.orders = orders;
		this.selectedOrder = null;
	}

	function removeOrder(order){
		if (typeof order === 'undefined') return;
		this.orders.splice(this.orders.indexOf(order), 1);
	}

	var organisation = {
		addCustomer: addCustomer,
		removeCustomer: removeCustomer,
		getCustomerForEdit: getCustomerForEdit,
		saveCustomer: saveCustomer,
		addCustomerFromBD: addCustomerFromBD,
		getCustomerById: getCustomerById,
		customers: []
	};

	this.isLoad = false;
	return {
		isLoad: this.isLoad,
		getOrganisation: function(){
			return organisation;
		},
		loadOrganization: function(){
			var me = this;
			return mongolabFactory.query().$promise.then(function(res) {
				res.forEach(function(_d){
					organisation.addCustomerFromBD(_d);
				});
				me.isLoad = true;
				return organisation;
	  		});
		}
	};
})


.provider('mongolabFactory', function (mongolabConfigs) {
    this.setConfigs = function (_mongolabConfigs) {
        angular.extend(mongolabConfigs, _mongolabConfigs);
    };

    this.collection = mongolabConfigs.collection;
    this.setCollection = function(collectionName){
		this.collection = collectionName;
    };

    this.$get = function ($resource) {
        var c = mongolabConfigs;
        var url = [c.mongolabUrl, c.dataBase, 'collections', this.collection, ':id'].join('/');
        return $resource(url, {apiKey: c.apiKey}, {
        	update: {method: 'PUT'}
    	});
        // return {
        // 	res: $resource(url, {apiKey: c.apiKey}, {
        //     	update: {method: 'PUT'}
        // 	}),
        // 	setCollection: this.setCollecton
        // };
    };
}).constant('mongolabConfigs',  {
    mongolabUrl: 'https://api.mongolab.com/api/1/databases',
    collection: 'Task2-collection',
    dataBase: null,
    apiKey: null
});