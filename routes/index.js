var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Car = mongoose.model('Car');

// Get cars from Database
router.get('/cars', function(req, res, next) {
  console.log("in GET /cars");
  Car.find(function(err, cars){
    if(err){ 
    	return next(err);
    	console.log("GET/cars error");
    }
    res.json(cars);
  });
});

// Add a car to the Database
router.post('/cars', function(req, res, next) {
	console.log("in POST/cars");
  var car = new Car(req.body);
  car.save(function(err, car){
    if(err){ 
    	return next(err); 
    	console.log("POST/cars error");
    }
    res.json(car);
  });
});

// Looks up a Car with ths given ID for us
router.param('carid', function(req, res, next, id) {
	var query = Car.findById(id);
	query.exec(function(err, car) {
		if (err) {
			return next(err);
		}
		if (!car) {
			return next(new Error("Car not found"));
		}
		req.car = car;
		return next();
	});
});

router.put('/cars/:carid/delete', function(req, res, next) {
	console.log("in PUT/:carid/delete");
	req.car.remove(function(err, car) {
		if(err) {
			return next(err);
		}

    var response = {
      message: "Car successfully deleted",
      id: car._id
    };

    res.send(response);
	});
}

// Gets a car with a given ID
router.get('/cars/:carid', function(req, res) {
	res.json(req.car);
});

// Put - used for updating cars when we add an upvote
router.put('/cars/:carid/upvote', function(req, res, next) {
	req.car.upvote(function(err, car) {
		if(err) {
			return next(err); 
		}
		res.json(car);
	});
});


module.exports = router;
