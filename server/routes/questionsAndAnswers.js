const express = require('express');
const router = express.Router();
const api = require('../API/QuestionAnswerAPI');


router.get('/questions/:product_id', (req, res, next) => {
  api.getQuestions(req.params.product_id)
    .then(results => res.json(results))
    .catch(err => next(err));
});



module.exports  = {qAndARouter: router}