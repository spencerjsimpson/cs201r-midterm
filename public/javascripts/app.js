var app = angular.module('cars',[]);

app.controller('MainCtrl', ['$scope','$http', function($scope, $http) {
	$scope.cars = [];

	$scope.addCar = function() {
		var car = {
			make: $scope.make,
			model: $scope.model,
			year: $scope.year,
			miles: $scope.miles,
			pictureUrl: $scope.pictureUrl,
			upvotes: 0
		};

		console.log(car);

		$scope.make = '';
		$scope.model = '';
		$scope.year = '';
		$scope.miles = '';
		$scope.pictureUrl = '';

		$http.post('/cars', car).success(function(data) {
			console.log("Successful POST!");
			$scope.cars.push(data);
		});

		console.log($scope.cars);
	};

	$scope.upvote = function(car) {
		return $http.put('/car' + car._id + '/upvote').success(function(data) {
			console.log("Successful Upvote!");
			car.upvotes = data.upvotes;
		})
	}

	$scope.incrementUpvotes = function(car) {
		$scope.upvote(car);
		$scope.getAll();
	};

	$scope.getAll = function() {
		return $http.get('/cars').success(function(data) {
			console.log("Successful getAll!");
			angular.copy(data, $scope.cars);
		});
	};

	$scope.delete = function(car) {
		
	};

}]);