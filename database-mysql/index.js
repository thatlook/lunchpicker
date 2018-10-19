var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  // database : 'HungryLazy'
});

connection.connect();

// need to create a table...?



var totalCount = function(callback) {
  // connection.query('SELECT * FROM items', function(err, results, fields) {
  //   if(err) {
  //     callback(err, null);
  //   } else {
  //     callback(null, results);
  //   }
  // });
  callback(null, 50)
};

module.exports.totalCount = totalCount;
