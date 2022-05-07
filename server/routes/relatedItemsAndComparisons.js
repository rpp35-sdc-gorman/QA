const express = require('express');
const router = express.Router();

const getRICProducts = require('../API/RIC.js');

router.get('/', (req, res, next) => {
  // will need to refactor based on if we are using query or parameters
  const productId = req.query.product_id;
  const endpoint = `products/${productId}/related`;
  getRICProducts(endpoint)
    .then(response => {
      res.json(response.data);
    })
    .catch(err => {
      next(err);
    })
});

module.exports  = {relatedRouter: router}