var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var { saveShopToModel, searchAddr, searchShops, retrieveShops } = require('../database-mongo');
var { getYelpStores } = require('../util/yelp.js');


app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



// 1) save address to db, 2) fetch and save shops to db
app.post('/closest', (req, res)=>{
  // console.log('>>> myAddr recieved in express', req.body.myAddr)
  let myAddr = req.body.myAddr;
  
  
  new Promise((resolve, reject) => {
    resolve(searchAddr(myAddr)) // save address to db
  })
  // look up if shops have myAddr
  .then(() => {
    searchShops(myAddr)
    .then((docs) => {
      // if they do
      if (!!docs.length) {
        res.json(docs);
        res.end();
      
      // if they dont
      } else {  
        // yelp!
        getYelpStores(myAddr, (err, data) => {
          if (err) {
            console.error(err)
          } else {
            let yelpArray = JSON.parse(data).businesses;
            res.json(yelpArray.slice(0, 10));
            res.end();

            // save to db
            for (let shop of yelpArray) {
                saveShopToModel(shop)
            }
            }

          })
        }
      })
    })
  })
  
  
  
  


  


// send went stores to db
app.post('/went', (req, res) => {

  // // console.log('>>> /went in express', req.body.shop)
  // let shop = req.body.shop;
  // shop.visited = true;
  // // send to db!

  // saveShopToModel(shop)

  
})





app.listen(3000, function() {
  console.log('listening on port 3000!');
});




// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var { totalCount } = require('../database-mysql');

// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));
