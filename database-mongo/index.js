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
  is_closed: Boolean,
  myAddr: String,  // TODO: v. naive version.... fix later

});

const RestModel = mongoose.model('Restaurants', Restaurants);






// functions

const searchShops = (myAddr) => {

  return RestModel.find({myAddr}).limit(10)
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

const saveShopToModel = ({id, name, url, rating, is_closed}, myAddr) => {
  // console.log('>>> in save shop to model', id, name, url, rating, is_closed, myAddr)
  RestModel.find({id}).exec((err, doc) => {
    if (!doc.length) {
      console.log(`>>> ${name} added!`)
      RestModel.create({
        id,
        name,
        visited: false,
        url,
        rating,
        is_closed,
        myAddr
    
      }, (err, small) => {
        if (err) {
          console.error(err)
        }
      })

    }
  })
}

const updateVisit = ({id}) => {
  RestModel.update({id: id}, {visited: true}, (err, d) => {
    if (err) {
      console.error(err)
    } else {
      console.log('>>> visited to be updated...')
      
    }
  })
}

const updateAll = (myAddr, cb) => {
  RestModel.update({visited: true}, {visited:false}, (err, small) => {
    if (err) {
      console.error(err)
    } else {
      RestModel.find({myAddr}).exec((err, doc) => {
        if (err) {
          console.error(err)
        } else {
          cb(doc)

        }
      })
    }
  })
}

const deleteAll = () => {
  console.log('>>> delete all')
  db.dropDatabase()
}


module.exports.saveShopToModel = saveShopToModel;
module.exports.searchAddr = searchAddr;
module.exports.searchShops = searchShops;
module.exports.updateVisit = updateVisit;
module.exports.updateAll = updateAll;
module.exports.deleteAll = deleteAll;


