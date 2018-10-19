var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

// if table exists, leave it. if empty, retrieve data from yelp again

var Restaurants = mongoose.Schema({
  name: String,

  address1: String,
  address2: String,
  address3: String,

  city: String,
  state: String,
  zip_code: String,
  
  latitude: String,
  longitude: String,
  
  url: String,
  rating: String,

});

var Item = mongoose.model('Item', Restaurants);

var totalCount = function(callback) {
  // find total count from mongoose
  return 50;
};

module.exports.totalCount = totalCount;