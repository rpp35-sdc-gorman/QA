const express = require('express');
const router = express.Router();
const sendRequest = require('../lib/sendRequest');


router.get('/questions/:product_id', (req, res, next) => {
  sendRequest(`qa/questions?product_id=${req.params.product_id}&count=${req.query.count}&page=${req.query.page_num}`)
    .then(results => {
      res.status(200).json(results.data)
    })
    .catch(err => next(err));
});

router.get('/answers/:question_id', (req, res, next) => {
  let count = req.query.count || 5
  sendRequest(`qa/questions/${req.params.question_id}/answers?count=${count}`)
    .then(answers => {
      res.status(200).json(answers.data)
    })
    .catch(err => next(err));
});

// answer voting/reporting routes
router.put('/helpful/answer/:answer_id', (req, res, next) => {
  sendRequest(`qa/answers/${req.params.answer_id}/helpful`, 'PUT')
    .then(result => {
      res.sendStatus(204)
    })
    .catch(err => next(err));
});

router.put('/reported/answer/:answer_id', (req, res, next) => {
  sendRequest(`qa/answers/${req.params.answer_id}/report`, 'PUT')
    .then(answers => {
      res.sendStatus(204)
    })
    .catch(err => next(err));
});

// question voting/addAnswer routes
router.put('/helpful/question/:question_id', (req, res, next) => {
  sendRequest(`qa/questions/${req.params.question_id}/helpful`, 'PUT')
    .then(result => {
      res.sendStatus(204)
    })
    .catch(err => next(err));
});

// add question/answer routes
router.post('/addAnswerTo/:question_id', (req, res, next) => {
  sendRequest(`qa/questions/${req.params.question_id}/answers`, 'POST', req.body)
    .then(result => {
      res.sendStatus(201)
    })
    .catch(err => next(err));
})

router.post('/addQuestionTo', (req, res, next) => {
  sendRequest(`qa/questions/`, 'POST', req.body)
    .then(result => {
      res.sendStatus(201)
    })
    .catch(err => next(err));
})

module.exports  = {qAndARouter: router}
