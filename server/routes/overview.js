const express = require('express');
const router = express.Router();

<<<<<<< HEAD
=======
const sendRequest = require('../lib/sendRequest');

>>>>>>> 73227eef22b2a3f8fb8244b97f1804efb3a9edcb
router.get('/', (req, res, next) => {
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



module.exports  = {overviewRouter: router}