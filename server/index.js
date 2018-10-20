var express = require('express');
var bodyParser = require('body-parser');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var { totalCount } = require('../database-mysql');
var { totalCount } = require('../database-mongo');
var { getYelpStores } = require('../util/yelp.js')

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: false}))


// get total number of stores in database
app.get('/total', function (req, res) {
  let total = totalCount();
  res.json(total);
  res.end();
});

app.post('/closest', (req, res)=>{
  // console.log('>>> myAddr recieved in express', req.body.myAddr)

  getYelpStores(req.body.myAddr, (err, data) => {
    let yelpArray = JSON.parse(data).businesses;
    // console.log('>>> fresh from yelp!', yelpArray)
    
    // send to front end
    res.json(yelpArray);
    res.end();

    // send to database
    
  })
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));
