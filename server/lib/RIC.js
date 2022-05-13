const config = require('../../config.js');
const axios = require('axios');

const getRIC = (endpoint) => {
  return axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/${endpoint}`, {
    headers: {
      'Authorization': config.token,
      'Content-Type': 'application/json'
    }
  })
};

module.exports = getRIC;