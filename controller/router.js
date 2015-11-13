app.config(['$routeProvider',
	function($routeProvider){
		$routeProvider.
			when('/', {
				templateUrl: 'view/userlist.html',
				controller: 'myCtrl'
			}).
			when('/newUser', {
				templateUrl: 'view/newUser.html',
				controller: 'newUserCtrl'
			}).
			when('/editUser/:id', {
				templateUrl: 'view/editUser.html',
				controller: 'editUserCtrl'
			}).
			otherwise({
				redirectTo: '/'
			});
	}]);