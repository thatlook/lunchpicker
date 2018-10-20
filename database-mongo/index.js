// connect
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

const db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});




// Models
const Addrs = mongoose.Schema({
  myAddr: String,  // TODO: v. naive version.... fix later

});

const AddrModel = mongoose.model('Models', Addrs);

const Restaurants = mongoose.Schema({
  id: String,
  name: String,
  visited: Boolean,
  url: String,
  rating: String,
  is_open: Boolean,
  myAddr: String,  // TODO: v. naive version.... fix later

});

const RestModel = mongoose.model('Restaurants', Restaurants);






// functions

const searchShops = (myAddr) => {

  return RestModel.find({myAddr}).limit(10)
}

const retrieveShops = (myAddr, cb) => {
  RestModel.find({myAddr}).limit(10).exec((err, doc) => {
    if (err) {
      console.error(err)
    } else {
      cb(doc)
    }
  })

}

const searchAddr = (myAddr) => {
  AddrModel.find({myAddr}).exec((err, doc) => {
    if (!doc.length) {
      console.log(`>>> ${myAddr} address added`)
      AddrModel.create({myAddr}, (err, small) => {
        if (err) {
          console.error(err)
        }
      })
    }
  })
}

const saveShopToModel = ({id, name, visited, url, rating, is_open}, myAddr) => {
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
        myAddr
    
      }, (err, small) => {
        if (err) {
          console.error(err)
        }
      })

    }
  })
}






module.exports.saveShopToModel = saveShopToModel;
module.exports.searchAddr = searchAddr;
module.exports.searchShops = searchShops;
module.exports.retrieveShops = retrieveShops;


