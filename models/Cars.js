var mongoose = require("mongoose");
var CarSchema = new mongoose.Schema({
	make: String,
	model: String,
	year: String,
	miles: String,
	pictureUrl: String,
	upvotes: {type: Number, default: 0}
});

CarSchema.methods.upvote = function(cb) {
	this.upvotes += 1;
	this.save(cb);
};

mongoose.model('Car', CarSchema);