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

		$http.post('/car', car).success(function(data) {
			$scope.cars.push(data);
		});

		console.log(cars);
	};

	$scope.incrementUpvotes = function(car) {
		$scope.upvote(car);
	};

}]);