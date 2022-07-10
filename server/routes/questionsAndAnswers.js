const express = require('express');
const router = express.Router();
//const sendRequest = require('../lib/sendRequest');
const {sendRequest} = require('../../QA_db/QA_tables');

router.get('/:product_id', (req, res, next) => {
  // getting questions
  sendRequest(`qa/questions?product_id=${req.params.product_id}&count=${req.query.count}&page=${req.query.page_num || 1}`)
    .then(questions => {
     //console.log('questions only', questions.data);
     //return questions.data.results;
     res.status(200).send(questions.data.results);
    })
    // .then(async questions => {
    //   let questionsWithAnswers = []; // array of promises
    //   // getting answers for each question
    //   console.log('questions only', questions)
    //   await questions.forEach(async (question) => {
    //     // setting what array of promises will resolve/reject to
    //     await questionsWithAnswers.push(
    //       await sendRequest(`qa/questions/${question.question_id}/answers?count=${req.query.count}`)
    //       .then(answers => {
    //         // resolves to ORIGINAL question object with .answers key tacked on
    //         question.answers = answers.data.results;
    //         // console.log('answer.data', answers.data.results)
    //         // console.log('question', question)
    //         return question;
    //       })
    //       .catch(err => next(err)))
    //   })
    //   console.log('qa',Promise.allSettled(questionsWithAnswers))
    //   return Promise.allSettled(questionsWithAnswers);
    // })
    // .then(questionsWithAnswers => {
    //   console.log('questionswithanswers', questionsWithAnswers);
    //   res.send(questionsWithAnswers)
    // })
    .catch(err => next(err))
})

router.put('/voting/:qa/:action/:id', (req, res, next) => {
  sendRequest(`qa/${req.params.qa}s/${req.params.id}/${req.params.action}`, 'PUT')
    .then(result => {
      res.sendStatus(200);
    })
    .catch(err => next(err));
})

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
