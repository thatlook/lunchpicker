var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var { totalCount, saveShopToModel } = require('../database-mongo');
var { getYelpStores } = require('../util/yelp.js')


app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// get total number of stores in database
app.get('/total', function (req, res) {
  totalCount((total)=>{
    res.json(total);
    res.end();
  })
});

// get top 20 closest stores from yelp api
app.post('/closest', (req, res)=>{
  // console.log('>>> myAddr recieved in express', req.body.myAddr)
  
  getYelpStores(req.body.myAddr, (err, data) => {
    if (err) {
      // TODO: do something
      return
    }
    let yelpArray = JSON.parse(data).businesses;
    // console.log('>>> fresh from yelp!', yelpArray)
    
    // send to front end
    res.json(yelpArray);
    res.end();
    
  })
})

// send went stores to db
app.post('/went', (req, res) => {

  // console.log('>>> /went in express', req.body.shop)
  let shop = req.body.shop;
  shop.visited = true;
  // send to db!

  saveShopToModel(shop)

  
})






app.listen(3000, function() {
  console.log('listening on port 3000!');
});




// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var { totalCount } = require('../database-mysql');

// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));
