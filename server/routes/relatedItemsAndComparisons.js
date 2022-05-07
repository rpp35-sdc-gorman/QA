const express = require('express');
const router = express.Router();

const getRICProducts = require('../API/RIC.js');

router.get('/', (req, res, next) => {
  const endpoint = 'products';
  getRICProducts(endpoint)
    .then(response => {
      res.json(response.data);
    })
    .catch(err => {
      next(err);
    })
});

module.exports  = {relatedRouter: router}