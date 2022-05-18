const express = require('express');
const { send } = require('express/lib/response');

const router = express.Router();
const sendRequest = require('../lib/sendRequest');

router.get('/:id/rating', (req, res, next) => {
  sendRequest(`reviews/meta?product_id=${req.params.id}`, 'get')
    .then((response) => response.data)
    .then((data) => res.send(data))
    .catch((err) => {
      console.error(error.data);
      res.status(500).send(error.data);
    });
});

router.get('/:id', (req, res, next) => {
  sendRequest(
    `reviews/?product_id=${req.params.id}&sort=${req.body.sort}`,
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
