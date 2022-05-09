const express = require('express');
const router = express.Router();

const getRICRequests = require('../lib/RIC.js');

router.get('/ric/:product_id', (req, res, next) => {
  // will need to refactor based on if we are using query or parameters
  const currentProductId = req.params.product_id;
  const endpoint = `products/${currentProductId}/related`;
  getRICRequests(endpoint)
    .then(relatedProducts => {
      return relatedProducts.data
    })
    .then(relatedProductIds => {
      // there's definitely a way to shorten this, but can't figure it out right now
      return products = relatedProductIds.map(id => {
        return (
          getRICRequests(`products/${id}`)
        )
      });
    })
    .then(products => {
      Promise.allSettled(products)
        .then(resolvedPromises => {
          let productsArr = [];
          resolvedPromises.forEach(promise => {
            productsArr.push(promise.value.data);
          });
          res.send(productsArr);
        })
    })
    .catch(err => { next(err); })
});

module.exports  = {relatedRouter: router}