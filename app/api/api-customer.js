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
		var data = angular.copy(this.selectedCustomer);
		data.information = information;
		mongolabFactory.update({id: id}, data).$promise.then(function (resource) {
			me.selectedCustomer = null;
		});
	}

	function addCustomer(people){
		if (typeof people === 'undefined') return;
		var me = this;
        mongolabFactory.save({information: people, orders:[]}).$promise.then(function (resource) {
			var information = {
				_id: resource._id,
				information: angular.copy(people),
				orders: [],
				addOrder: addOrder,
				removeOrder: removeOrder,
				saveOrder: saveOrder,
				getOrderForEdit: getOrderForEdit
			};
			me.customers.push(information);
			me.selectedCustomer = null;
        });
	}

	function addCustomerFromBD(people){
		if (typeof people === 'undefined') return;
		people.addOrder = addOrder;
		people.removeOrder = removeOrder;
		people.saveOrder = saveOrder;
		people.getOrderForEdit = getOrderForEdit;
		people.selectedOrder = null;
		this.customers.push(people);
		this.selectedCustomer = null;
	}

	function removeCustomer(customer){
		var me = this;
		mongolabFactory.remove({id: customer._id.$oid}).$promise.then(function(abc){
		 	me.customers.splice(me.customers.indexOf(customer), 1);
		 	me.selectedCustomer = null;
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
		product.id = new Date().getTime();
		var saveOrder = angular.copy(this);
		saveOrder.orders.push(angular.copy(product));

		mongolabFactory.update({id: this._id.$oid}, saveOrder).$promise.then(function (resource) {
			me.orders.push(angular.copy(product));
		});
	}

	function saveOrder(product){
		if (typeof product === 'undefined') return;
		var me = this;
		var orders = angular.copy(this.orders);
		orders[this.orders.indexOf(this.selectedOrder)] = product;
		var saveOrder = angular.copy(this);
		saveOrder.orders = angular.copy(orders);
		mongolabFactory.update({id: this._id.$oid}, saveOrder).$promise.then(function (resource) {
			me.orders = orders;
			delete me.selectedOrder;
		});

	}

	function removeOrder(order){
		if (typeof order === 'undefined') return;
		var me = this;
		var saveOrder = angular.copy(this);
		saveOrder.orders.splice(saveOrder.orders.indexOf(order), 1);
		mongolabFactory.update({id: this._id.$oid}, saveOrder).$promise.then(function(abc){
		 	me.orders.splice(me.orders.indexOf(order), 1);
        });
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
    };
}).constant('mongolabConfigs',  {
    mongolabUrl: 'https://api.mongolab.com/api/1/databases',
    collection: 'Task2-collection',
    dataBase: null,
    apiKey: null
});