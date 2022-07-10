//import { expect } from '../jestGlobals';
const request = require('supertest');
const app = require('../server/app'); //import app from express server, just make sure to split up the app.listen section into another file
//import { pool } from '../database/db';
//const request = supertest(app);
//global.IS_REACT_ACT_ENVIRONMENT = true;
// afterAll(() => {
//    pool.end();
// });
let expect = global.expect;
describe('API routes', () => {
   test('should get questions from product ID', async () => {
      const product_id = 8;
      let response = await request(app).get(`/question_answer/${product_id}`); //makes request to endpoint, which can then be tested using jest expect assertion
      console.log(response)
      expect(response.body.length).toBeTruthy();
      expect(response.statusCode).toBe(200);
   });
   test('should get answers from question_id', async () => {
      let response = await request(app).get(
         '/qa/questions/252166/answers?page=1&count=5'
      );
      expect(response.body.length).toBeTruthy();
      expect(response.statusCode).toBe(200);
      //expect(response.body[0].question_id).toBe(252166);
   });
  //  test('should add a question', async () => {
  //     let response = await request.post('/qa/questions').send({
  //        body: 'question test',
  //        name: 'user name',
  //        email: 'email@email.com',
  //        product_id: 1,
  //     });
  //     expect(response.statusCode).toBe(201);
  //  });
  //  test('should add an answer', async () => {
  //     let response = await request.post('/qa/questions/1/answers').send({
  //        body: 'answer test',
  //        name: 'user name',
  //        email: 'email@email.com',
  //        question_id: 1,
  //        photos: "['https://unsplash.com/photos/Won79_9oUEk']",
  //     });
  //     expect(response.statusCode).toBe(201);
  //  });
  //  test('should mark question as helpful ', async () => {
  //     let response = await request.put('/qa/questions/1/helpful');
  //     console.log('response:', response);
  //     expect(response.statusCode).toBe(204);
  //  });
  //  test('should report question', async () => {
  //     let response = await request.put('/qa/questions/1/report');
  //     expect(response.statusCode).toBe(204);
  //  });
  //  test('should mark answer as helpful', async () => {
  //     let response = await request.put('/qa/answers/1/helpful');
  //     expect(response.statusCode).toBe(204);
  //  });
  //  test('should report an answer', async () => {
  //     let response = await request.put('/qa/answers/1/report');
  //     expect(response.statusCode).toBe(204);
  //  });
});