const express = require('express');
const path = require('path');
const { overviewRouter } = require('./routes/overview');
const { qAndARouter } = require('./routes/questionsAndAnswers');
const { ratingRouter } = require('./routes/ratingsAndReviews');
const { relatedRouter } = require('./routes/relatedItemsAndComparisons');
const sendRequest = require('./lib/sendRequest');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use('*.js', function (req, res, next) {
  req.url = req.url + '.br';
  res.set('Content-Encoding', 'br');
  next();
});

// default product page
app.get('/', (req, res) => {
  res.redirect('/product/71697')
})

// makes files in dist folder available
app.use('/product', express.static(path.join(__dirname, '../client/dist')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/product/:id', (req, res) => {
  // sends base inex.html file
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
})

// routes
app.use('/overview', overviewRouter);
app.use('/rating_review', ratingRouter);
app.use('/question_answer', qAndARouter);
app.use('/related_items', relatedRouter);

// click tracker route
app.post('/trackClick', (req, res) => {
  sendRequest('interactions', 'POST', req.body)
    .then(result => res.sendStatus(200))
    .catch(err => res.status(500).send(err));
})


app.listen(port, () => {
  console.log(`Atelier 🥳 listening on port ${port}`);
});
