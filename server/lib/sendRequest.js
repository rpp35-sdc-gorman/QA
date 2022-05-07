const axios = require('axios');
const {token} = require('../../config');

// the Root API address: https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp35/

// Url String
// data - json parsable object
const sendRequest = (url, method = 'GET', data = {}) => {
  // default behavior is a get request
  return axios({
    url:url,
    method: method,
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    data: data
  })

}

module.exports = sendRequest;