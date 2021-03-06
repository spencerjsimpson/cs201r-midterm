var app = angular.module('cars',[]);

app.controller('MainCtrl', ['$scope','$http', function($scope, $http) {
	$scope.cars = [];

	// Add Functionality
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


	// Upvote Functionality
	$scope.upvote = function(car) {
		return $http.put('/cars/' + car._id + '/upvote').success(function(data) {
			console.log("Successful Upvote!");
			car.upvotes = data.upvotes;
		})
	}

	$scope.incrementUpvotes = function(car) {
		$scope.upvote(car);
		$scope.getAll();
	};


	// Delete Functionality
	$scope.delete = function(car) {
		return $http.put('/cars/' + car._id + '/delete').success(function(data) {
			console.log("data successfully deleted");
		})
	};

	$scope.deleteCar = function(car) {
		$scope.delete(car);
		$scope.getAll();
	}


	// Get all functionality
	$scope.getAll = function() {
		return $http.get('/cars').success(function(data) {
			console.log("Successful getAll!");
			angular.copy(data, $scope.cars);
		});
	};

	$scope.getAll();
}]);