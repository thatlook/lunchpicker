const request = require('request');
const { TOKEN } = require('../config.js');
const data = require('../data.json');

const getYelpStores = (myAddr, cb) => {
  let baseurl = `https://api.yelp.com/v3/businesses/search?location=${myAddr}&sort_by=distance`
  
  let options = {
    url: baseurl,
    headers: {
      Authorization: `Bearer ${TOKEN}`
    }
  }

  // console.log('>>> options in yelp', options);
  // console.log('>>> token in yelp', TOKEN);

  // use sample data
  cb(null, JSON.stringify(data))

  // uncomment when ready!
  // request.get(options, (err, res, body) => {
  //   if (err) {
  //     console.log('Error on getting API calls from yelp!')
  //   } else {
  //     cb(null, body)   
  //   }
  // })
  
}

module.exports.getYelpStores = getYelpStores;
