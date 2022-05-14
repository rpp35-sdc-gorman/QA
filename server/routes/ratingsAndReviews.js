const express = require('express');

const router = express.Router();
const sendRequest = require('../lib/sendRequest');

router.get('/:id', (req, res, next) => {
  sendRequest(
    `reviews/?product_id=${req.params.id}&sort=${req.body.sort}`,
    'get'
  )
    .then((data) => data.data)
    .then((data) => res.send(data))
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
});

module.exports = { ratingRouter: router };
