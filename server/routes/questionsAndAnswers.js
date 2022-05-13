const express = require('express');
const router = express.Router();
const sendRequest = require('../lib/sendRequest');


router.get('/questions/:product_id', (req, res, next) => {
  sendRequest(`qa/questions?product_id=${req.params.product_id}&count=100`)
    .then(questions => {
      res.status(200).json(questions.data)
    })
    .catch(err => next(err));
});

router.get('/answers/:question_id', (req, res, next) => {
  sendRequest(`qa/questions/${req.params.question_id}/answers`)
    .then(answers => {
      res.status(200).json(answers.data)
    })
    .catch(err => next(err));
});


router.put('/helpful/:answer_id', (req, res, next) => {
  sendRequest(`qa/answers/${req.params.answer_id}/helpful`, 'PUT')
    .then(result => {
      res.sendStatus(204)
    })
    .catch(err => next(err));
});

router.put('/reported/:answer_id', (req, res, next) => {
  sendRequest(`qa/answers/${req.params.answer_id}/report`, 'PUT')
    .then(answers => {
      res.sendStatus(204)
    })
    .catch(err => next(err));
});

module.exports  = {qAndARouter: router}