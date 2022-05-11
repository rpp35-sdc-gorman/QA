const express = require('express');
const router = express.Router();

const getRIC = require('../lib/sendRequest.js');

router.get('/ric/:product_id', (req, res, next) => {
  // will need to refactor based on if we are using query or parameters
  const currentProductId = req.params.product_id;
  const endpoint = `products/${currentProductId}/related`;
  sendRequest(endpoint)
    .then(relatedProducts => {
      return relatedProducts.data
    })
    .then(relatedProductIds => {
      // there's definitely a way to shorten this, but can't figure it out right now
      return relatedProductIds.map(id => {
        return (
          sendRequest(`products/${id}`)
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

router.get('/ric/ratings/:product_id', (req, res, next) => {
  // will need to refactor based on if we are using query or parameters
  const productIds = req.params.product_id;
  const endpoint = `reviews/meta/?product_id=${productIds}`;
  sendRequest(endpoint)
    .then(relatedProducts => {
      let ratings = relatedProducts.data.ratings;
      let [ totalResponses, score] = [0, 0];
      for (let star in ratings) {
        score += Number(star) * Number(ratings[star]);
        totalResponses += Number(ratings[star]);
      }
      let finalScore = Math.ceil(4 * (score / totalResponses)) / 4;
      res.send({ rating: finalScore });
    })
    .catch(err => { next(err); })
});

module.exports  = {relatedRouter: router}