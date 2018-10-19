import request from 'request'

const getYelpStores (myAddr) => {
  let baseurl = `https://api.yelp.com/v3/businesses/search`
  
  let options = {
    url: baseurl,
    location: myAddr,
    sort_by: 'distance'
  }

  request.get(options)

}