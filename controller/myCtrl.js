
var app = angular.module('myApp', ['angularUtils.directives.dirPagination', 'ngRoute']);

/*#########################################################################################
myCtrl
#########################################################################################*/
app.controller('myCtrl', function($scope, $location, userData){
	$scope.numb = '';
	$scope.fName = '';
	$scope.lName = '';
	$scope.sex = '';
	$scope.age = '';
	$scope.title = '';
	$scope.incomplete = false;

	$scope.users = userData.getUser();

	/****************************************************
	Pagination
	****************************************************/
    $scope.currentPage = 1;
    $scope.pageSize = 13;
    $scope.maxSize = 5;
    
	/****************************************************
	sort
	****************************************************/
    $scope.predicate = 'id';
    $scope.reverse = false;
    $scope.order = function(predicate) {
        $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : true;
        $scope.predicate = predicate;
    };

    /****************************************************
	Delete User
	****************************************************/
	$scope.deleteUser = function(id){
		userData.deleteUser(id);
	};
	/****************************************************
	redirect to userlist
	****************************************************/
	$scope.home = function(path){
		$location.path(path);
	};
});

/*#########################################################################################
newUserCtrl
#########################################################################################*/
app.controller('newUserCtrl', function($scope, $location, userData){

	$scope.users = userData.getUser();
	$scope.incomplete = false;

	$scope.saveNewUser = function(){
		var userId = $scope.users.length + 1;
		var newUser = {
			id: userId,
			numb: $scope.numb,
			fName: $scope.fName,
			lName: $scope.lName,
			sex: $scope.sex,
			age: $scope.age,
			title:$scope.title
		};

		$scope.users.push(newUser);
		alert("New user Added!");

	};

	/****************************************************
	watch to validate 
	****************************************************/
	$scope.$watch('numb',function(){$scope.save();});
	$scope.$watch('fName',function(){$scope.save();});
	$scope.$watch('lName',function(){$scope.save();});
	$scope.$watch('sex',function(){$scope.save();});
	$scope.$watch('age',function(){$scope.save();});
	$scope.$watch('title',function(){$scope.save();});

	$scope.save = function(){

		$scope.incomplete = false;

		if(!$scope.numb.length || !$scope.fName.length ||
			!$scope.lName.length || !$scope.sex.length || 
			!$scope.age.length || !$scope.title.length){

			$scope.incomplete = true;
		}
	};

});

	
/*#########################################################################################
editUserCtrl
#########################################################################################*/
app.controller('editUserCtrl', function($scope, $location, $routeParams, userData){

	$scope.user = userData.getUserById($routeParams.id);

	$scope.numb = $scope.user.numb;
	$scope.fName = $scope.user.fName;
	$scope.lName = $scope.user.lName;
	$scope.sex = $scope.user.sex;
	$scope.age = $scope.user.age;
	$scope.title = $scope.user.title;

	$scope.saveChanges = function(){
		$scope.users[$scope.user.id - 1].numb = $scope.numb;
		$scope.users[$scope.user.id - 1].fName = $scope.fName;
		$scope.users[$scope.user.id - 1].lName = $scope.lName;
		$scope.users[$scope.user.id - 1].sex = $scope.sex;
		$scope.users[$scope.user.id - 1].age = $scope.age;
		$scope.users[$scope.user.id - 1].title = $scope.title;
		alert("Save successfully!");
	};

	/****************************************************
	watch to validate 
	****************************************************/
	$scope.$watch('numb',function(){$scope.save();});
	$scope.$watch('fName',function(){$scope.save();});
	$scope.$watch('lName',function(){$scope.save();});
	$scope.$watch('sex',function(){$scope.save();});
	$scope.$watch('age',function(){$scope.save();});
	$scope.$watch('title',function(){$scope.save();});

	$scope.save = function(){

		$scope.incomplete = false;

		if(!$scope.numb.length || !$scope.fName.length ||
			!$scope.lName.length || !$scope.sex.length || 
			!$scope.age.length || !$scope.title.length){
			
			$scope.incomplete = true;
		}
	};


});

/*#########################################################################################
Register a userData sevice
#########################################################################################*/
app.service('userData', function(){
	var id, numb, fName, lName, sex, age, title;
	var users = [
		{id:1, numb:'001', fName: 'Jason', lName: 'Wang', sex: 'Male', age: '24', title: 'Front-end Developer'},
		{id:2, numb:'002', fName: 'Jack', lName: 'Jones', sex: 'Male', age: '26', title: 'Back-end Developer'},
		{id:3, numb:'003', fName: 'Kim', lName: 'Pim', sex: 'Male', age: '32', title: 'Product Manager'},
		{id:4, numb:'004', fName: 'Kate', lName: 'Smith', sex: 'Female', age: '25', title: 'UI/UX Designer'},
		{id:5, numb:'005', fName: 'Peter', lName: 'Pan', sex: 'Male', age: '42', title: 'Data Scientist'},
		{id:6, numb:'006', fName: 'John', lName: 'Doe', sex: 'Male', age: '33', title: 'JavaScript Developer'},
		{id:7, numb:'007', fName: 'Sal', lName: 'Smith', sex: 'Male', age: '28', title: 'Front-end Developer'},
		{id:8, numb:'008', fName: 'Peter', lName: 'Pan', sex: 'Male', age: '42', title: 'Data Scientist'},
		{id:9, numb:'009', fName: 'John', lName: 'Doe', sex: 'Male', age: '33', title: 'JavaScript Developer'},
		{id:10, numb:'010', fName: 'Sal', lName: 'Smith', sex: 'Male', age: '28', title: 'Front-end Developer'},
		{id:11, numb:'011', fName: 'Gerry', lName: 'Tang', sex: 'Male', age: '33', title: 'Front-end Developer'},
		{id:12, numb:'012', fName: 'Bill', lName: 'Yuan', sex: 'Male', age: '26', title: 'Back-end Developer'},
		{id:13, numb:'013', fName: 'Lily', lName: 'Pim', sex: 'Female', age: '32', title: 'Product Manager'},
		{id:14, numb:'014', fName: 'Kate', lName: 'Liu', sex: 'Female', age: '25', title: 'UI/UX Designer'},
		{id:15, numb:'015', fName: 'Peter', lName: 'Pan', sex: 'Male', age: '42', title: 'Data Scientist'},
		{id:16, numb:'016', fName: 'Larry', lName: 'Page', sex: 'Male', age: '33', title: 'Architecture Engineer'},
		{id:17, numb:'017', fName: 'Sal', lName: 'Smith', sex: 'Male', age: '28', title: 'Front-end Developer'},
		{id:18, numb:'018', fName: 'Peter', lName: 'Pan', sex: 'Male', age: '42', title: 'Data Scientist'},
		{id:19, numb:'019', fName: 'John', lName: 'Doe', sex: 'Male', age: '33', title: 'JavaScript Developer'},
		{id:20, numb:'020', fName: 'Gary', lName: 'Laurence', sex: 'Male', age: '28', title: 'Software Developer'},
		{id:21, numb:'021', fName: 'Peter', lName: 'Pan', sex: 'Male', age: '42', title: 'Data Scientist'},
		{id:22, numb:'022', fName: 'John', lName: 'Doe', sex: 'Male', age: '33', title: 'JavaScript Developer'},
		{id:23, numb:'023', fName: 'Hux', lName: 'Huang', sex: 'Male', age: '27', title: 'Mobile Developer'},
		{id:24, numb:'024', fName: 'Kate', lName: 'Smith', sex: 'Female', age: '25', title: 'UI/UX Designer'},
		{id:25, numb:'025', fName: 'Peter', lName: 'Pan', sex: 'Male', age: '42', title: 'Data Scientist'},
		{id:26, numb:'026', fName: 'John', lName: 'Doe', sex: 'Male', age: '33', title: 'JavaScript Developer'},
		{id:27, numb:'027', fName: 'Sal', lName: 'Smith', sex: 'Male', age: '28', title: 'Front-end Developer'},
		{id:28, numb:'028', fName: 'Peter', lName: 'Pan', sex: 'Male', age: '42', title: 'Data Scientist'},
		{id:29, numb:'029', fName: 'John', lName: 'Doe', sex: 'Male', age: '33', title: 'JavaScript Developer'},
		{id:30, numb:'030', fName: 'Sal', lName: 'Smith', sex: 'Male', age: '28', title: 'Front-end Developer'},
		{id:31, numb:'031', fName: 'Jason', lName: 'Wang', sex: 'Male', age: '24', title: 'Front-end Developer'},
		{id:32, numb:'032', fName: 'Jack', lName: 'Jones', sex: 'Male', age: '26', title: 'Back-end Developer'},
		{id:33, numb:'033', fName: 'Kim', lName: 'Pim', sex: 'Male', age: '32', title: 'Product Manager'},
		{id:34, numb:'034', fName: 'Larry', lName: 'Page', sex: 'Male', age: '33', title: 'Architecture Engineer'},
		{id:35, numb:'035', fName: 'Sal', lName: 'Smith', sex: 'Male', age: '28', title: 'Front-end Developer'}
	];

	this.getUser = function(){
		return users;
	};

	this.getUserById = function(id){
		return users[id - 1];
	};

	this.deleteUser = function(id){
		alert('Deleted user can not be recovered!');
		users.splice(id - 1, 1);
		for(var i = id - 1; i < users.length; i++){
			users[i].id--;
		}
	};

});
