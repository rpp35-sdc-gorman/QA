const express = require('express');
const router = express.Router();

const sendRequest = require('../lib/sendRequest.js');

router.get('/ric/:product_id', (req, res, next) => {
  // GET RELATED PRODUCT IDS
  const currentProductId = req.params.product_id;
  const relatedEndpoint = `products/${currentProductId}/related`;
  let productsArr = [];
  sendRequest(relatedEndpoint)
    .then(relatedProducts => {
      return relatedProducts.data
    })
    .then(relatedProductIds => {
      return relatedProductIds.map(id => {
        return (
          sendRequest(`products/${id}`)
        )
      });
    })
    .then(products => {
      return Promise.allSettled(products)
        .then(resolvedPromises => {
          resolvedPromises.forEach(promise => {
            productsArr.push(promise.value.data);
          });
          return productsArr;
        })
    })
    // GET RELATED PRODUCT RATINGS
    .then(products => {
      let productsWithRatings = [];
      products.forEach(product => {
        const ratingsEndpoint = `reviews/meta/?product_id=${product.id}`;
        productsWithRatings.push(sendRequest(ratingsEndpoint)
          .then(ratedProducts => {
            let ratings = ratedProducts.data.ratings;
            let [ totalResponses, score] = [0, 0];
            for (let star in ratings) {
              score += Number(star) * Number(ratings[star]);
              totalResponses += Number(ratings[star]);
            }
            let finalScore = Math.ceil(4 * (score / totalResponses)) / 4;
            return finalScore;
          })
          .then(score => {
            product.star_rating = score;
            return product;
          })
        )
      })
      return Promise.all(productsWithRatings);
    })
    // GET RELATED PRODUCT STYLES
    .then(relatedProducts => {
      let productsWithStyles = [];
      relatedProducts.forEach(product => {
        const endpoint = `products/${product.id}/styles`;
        productsWithStyles.push(sendRequest(endpoint)
          .then(productStyles => {
            product.styles = productStyles.data.results;
            return product
          })
          .catch(err => { next(err); })
        )
      })
      return productsWithStyles;
    })
    // SEND RELATED PRODUCTS
    .then(products => {
      return Promise.allSettled(products)
        .then(resolvedPromises => {
          resultProducts = [];
          resolvedPromises.forEach(resolved => {
            resultProducts.push(resolved.value)
          })
          res.send(resultProducts);
        })
    })
    .catch(err => { next(err); })
});

// router.get('/ric/ratings/:product_id', (req, res, next) => {
//   // will need to refactor based on if we are using query or parameters
//   const productId = req.params.product_id;
//   const endpoint = `reviews/meta/?product_id=${productId}`;
//   sendRequest(endpoint)
//     .then(relatedProducts => {
//       let ratings = relatedProducts.data.ratings;
//       let [ totalResponses, score] = [0, 0];
//       for (let star in ratings) {
//         score += Number(star) * Number(ratings[star]);
//         totalResponses += Number(ratings[star]);
//       }
//       let finalScore = Math.ceil(4 * (score / totalResponses)) / 4;
//       return finalScore;
//     })
//     .then(score => {
//       console.log(score);
//       res.send({ rating: score });
//     })
//     .catch(err => { next(err); })
// });

// router.get('/ric/styles/:product_id', (req, res, next) => {
//   // will need to refactor based on if we are using query or parameters
//   const productId = req.params.product_id;
//   const endpoint = `products/${productId}/styles`;
//   sendRequest(endpoint)
//     .then(productStyles => {
//       return productStyles.data.results;
//     })
//     .then(styles => {
//       res.send({ styles })
//     })
//     .catch(err => { next(err); });
// });


module.exports  = {relatedRouter: router}