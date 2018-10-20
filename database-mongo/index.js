const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

const db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});


const Restaurants = mongoose.Schema({
  id: String,
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

  visited: Boolean

});

const RestModel = mongoose.model('Restaurants', Restaurants);

const saveShopToModel = ({id, name, visited, url, rating, is_open}) => {
  // validate if id exists
  RestModel.find({id}).exec((err, doc) => {
    if (!doc.length) {
      console.log(`>>> ${name} added!`)
      RestModel.create({
        id,
        name,
        visited,
        url,
        rating,
        is_open,
    
      }, (err, small) => {
        if (err) {
          console.error(err)
        }
      })

    }
  })



}

const totalCount = () => {
  // find total count from mongoose
  return 50;
};

module.exports.totalCount = totalCount;
module.exports.saveShopToModel = saveShopToModel;
