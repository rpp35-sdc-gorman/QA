const express = require('express');

const router = express.Router();
const sendRequest = require('../lib/sendRequest');

router.put('/reviews/:id/helpful', (req, res, next) => {
  sendRequest(`reviews/${req.params.id}/helpful`, 'put')
    .then(({ data }) => res.send(data))
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

router.get('/:id/rating', (req, res, next) => {
  sendRequest(`reviews/meta?product_id=${req.params.id}`, 'get')
    .then((response) => response.data)
    .then((data) => res.send(data))
    .catch((err) => {
      // console.error(error.data);
      res.status(500).send(err.data);
    });
});

router.get('/:id', (req, res, next) => {
  // console.log(req.query);
  sendRequest(
    `reviews/?product_id=${req.params.id}&sort=${
      req.query.sort || 'relevance'
    }&count=2&page=${req.query.page || 1}`,
    'get'
  )
    .then((response) => response.data)
    .then((data) => res.send(data))
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
});

router.post('/:id', (req, res, next) => {
  sendRequest(`reviews/?product_id=${req.params.id}`, 'post', req.body)
    .then((response) => response.data)
    .then((data) => res.send(data))
    .catch((err) => {
      console.error(err);
      res.status(err.response.status).send(err.response.data);
    });
});

module.exports = { ratingRouter: router };
