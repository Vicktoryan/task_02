angular.module('api-customer-application', [])
.factory('apiCustomer', function(){

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
})


.factory('apiBookmarkData', function($filter, $http, $filter, countShowItemsInPaging){
	if (!localStorage.getItem('data') || !localStorage.getItem('data') === '[]'){
		var data = [{
			id: '1',
			url: 'abc',
			title: 'JavaScript',
			tags: ['Backbone', 'JQuery']
		}, {
			id: '2',
			url: 'abc1',
			title: 'Backbone',
			tags: ['JavaScript', 'JQuery']
		}, {
			id: '3',
			url: 'abc2',
			title: 'JQuery',
			tags: ['JavaScript', 'Backbone', 'Library']
		}, {
			id: '4',
			url: 'abc3',
			title: 'Library',
			tags: []
		}, {
			id: '5',
			url: 'abc4',
			title: 'Underscore',
			tags: []
		}];
		localStorage.setItem('data', JSON.stringify(data));
	}
	return {
		load: function(start, count){
			var data = JSON.parse(localStorage.getItem('data'));
			return data;
		},
		save: function(data){
			if (data)
				localStorage.setItem('data', JSON.stringify(data));
		},
		getBookmarkFromFilter : function(filter){
			var data = [];
			filter = filter.toLowerCase();
			service.data.forEach(function(item){
				if (item.tags.join(' ').toLowerCase().indexOf(filter) > -1) data.push(item);
			});
			return data;
		},
		getTags: function(bookmark){
			var data = bookmark.tags;
			return data;
		}
	};
});