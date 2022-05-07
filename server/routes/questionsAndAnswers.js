const express = require('express');
const router = express.Router();
const sendRequest = require('../lib/sendRequest');


router.get('/questions/:product_id', (req, res, next) => {
  sendRequest(`qa/questions?product_id=${req.params.product_id}&count=100`)
    .then(results => {
      res.status(200).json(results.data)
    })
    .catch(err => next(err));
});



module.exports  = {qAndARouter: router}