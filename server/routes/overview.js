const express = require('express');
const router = express.Router();

const sendRequest = require('../lib/sendRequest');

// get a list of all products
router.get('/products', (req, res, next) => {
  const path = 'products'
  sendRequest(path)
  .then(data => {
    console.log(data)
    res.json(data.data)
  })
  .catch(err => {
    next(err)
  })
});

// get more general info for a product
router.get('/products/:id', (req, res, next) => {
  const {id} = req.params
  const path = `products/${id}`
  sendRequest(path)
  .then(data => {
    console.log(data)
    res.json(data.data)
  })
  .catch(err => {
    next(err)
  })
});

// get all the info for a specific product
router.get('/products/:id/styles', (req, res, next) => {
  const {id} = req.params
  const path = `products/${id}/styles`
  sendRequest(path)
  .then(data => {
    // console.log(data)
    res.json(data.data)
  })
  .catch(err => {
    next(err)
  })
});


module.exports  = {overviewRouter: router}