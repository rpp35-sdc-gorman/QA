const express = require('express');
const router = express.Router();

const sendRequest = require('../lib/sendRequest');

router.get('/', (req, res, next) => {
  const path = 'products'
  sendRequest(path)
  .then(data => {
    console.log(data)
    res.json(data.data)
  })
  .catch(err => {
    next(err)
  })
});



module.exports  = {overviewRouter: router}