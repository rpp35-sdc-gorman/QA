const express = require('express');
const router = express.Router();

const sendRequest = require('../lib/sendRequest');

// get a list of all products
router.get('/products', (req, res, next) => {
  const path = 'products'
  sendRequest(path)
  .then(data => {
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
    res.json(data.data)
  })
  .catch(err => {
    const error = err.response.data
    next(error)
  })
});

// get all the info for a specific product
router.get('/products/:id/styles', (req, res, next) => {
  const {id} = req.params
  const path = `products/${id}/styles`
  sendRequest(path)
  .then(data => {
    res.json(data.data)
  })
  .catch(err => {
    next(err)
  })
});


router.get('/parser/:id', async (req,res, next) => {
  try{
    const {id} = req.params
    // create pile-o' promises
    const productInfo = sendRequest(`products/${id}`)
    const productStyles = sendRequest(`products/${id}/styles`);
    // this one might need some additional parsing to get a specific rating
    const productRating = sendRequest(`reviews/?product_id=${id}`);

    const data = await Promise.all([productInfo, productStyles, productRating])
      .catch(err =>{
        // keeps server from dying
        console.log(err)
        const error = `${err.response.data} to ${err.request.path}`
        next(error);
      });
    res.json({
      'info': data[0].data,
      'styles': data[1].data,
      'rating': data[2].data
    })
  }
  catch(err){
    // lets end user know server is not dead
    next(err)
  }
})

module.exports  = {overviewRouter: router}