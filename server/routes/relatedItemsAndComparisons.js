const express = require('express');
const router = express.Router();

const getRICRequests = require('../API/RIC.js');

router.get('/related_products', (req, res, next) => {
  // will need to refactor based on if we are using query or parameters
  const currentProductId = req.query.product_id;
  const endpoint = `products/${currentProductId}/related`;
  getRICRequests(endpoint)
    .then(relatedProductIds => {
      return relatedProductIds.data
    })
    .then(productIds => {
      // there's definitely a way to shorten this, but can't figure it out right now
      return products = productIds.map(id => {
        return (
          getRICRequests(`products/${id}`)
            .then(product => {
              return product.data
          }))
      });
    })
    .then(products => {
      Promise.all(products)
        .then(productsObj => {
          res.json(productsObj);
        })
    })
    .catch(err => { next(err); })
});

module.exports  = {relatedRouter: router}