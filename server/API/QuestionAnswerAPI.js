const config = require('../config');
const axios = require('axios');

const api = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/';

const getQuestions = (product_id) => {
  const options = {
    method: 'GET',
    url: `${api}qa/questions?product_id=${product_id}&count=100`,
    headers: {
      Authorization: config.token,
      'Content-Type': 'application/json'
     }
  };

  return axios(options)
    .then((response) => response.data)
    .catch((err) => console.log(err));
}

module.exports = {getQuestions}