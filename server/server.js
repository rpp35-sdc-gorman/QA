const express = require('express');
const path  = require('path')
const { overviewRouter } = require('./routes/overview');
const { qAndARouter } = require('./routes/questionsAndAnswers');
const { ratingRouter } = require('./routes/ratingsAndReviews');
const { relatedRouter } = require('./routes/relatedItemsAndComparisons');

const app = express();
const port = 3000;

// serve the public folder
app.use(express.static(path.join(__dirname, '../client/dist')))

// routes
app.use('/overview', overviewRouter);
app.use('/review_ratings', ratingRouter);
app.use('/question_answer', qAndARouter);
app.use('/related_items', relatedRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})