import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { createRoot } from 'react-dom/client';
import { act } from "react-dom/test-utils";
import axios from 'axios';

import SingleQA from './SingleQA.jsx';

const callApi = (endpoint, method, data = {}) => {

  return axios({
    url: endpoint,
    method,
    data
  })
  .then(response => console.log(response))
  .catch((error) => console.log(error))
};

const answers = {'data': {'results': [
  {
    "answer_id": 8,
    "body": "What a great question!",
    "date": "2018-01-04T00:00:00.000Z",
    "answerer_name": "metslover",
    "helpfulness": 8,
    "photos": [],
  },
  {
    "answer_id": 5,
    "body": "Something pretty durable but I can't be sure",
    "date": "2018-01-04T00:00:00.000Z",
    "answerer_name": "metslover",
    "helpfulness": 5,
    "photos": [{
        "id": 1,
        "url": "urlplaceholder/answer_5_photo_number_1.jpg"
      },
      {
        "id": 2,
        "url": "urlplaceholder/answer_5_photo_number_2.jpg"
      }
    ]
  }
]}}

jest.mock('axios');
// Make sure to resolve with a promise
axios.mockResolvedValue(answers);

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

// describe('callApi()', () => {
//   it('calls `axios()` with `endpoint`, `method` and `body`', () => {
//     const endpoint = '/endpoint';
//     const method = 'post';
//     const data = { foo: 'bar' };

//     // call function
//     callApi(endpoint, method, data);

//     // assert axios()
//     expect(axios).toBeCalledWith({ url: endpoint, method, data});
//   });
// });

it("should render one QA item to screen", async () => {
  const question = {
    "question_id": 37,
    "question_body": "Why is this product cheaper here than other sites?",
    "question_date": "2018-10-18T00:00:00.000Z",
    "asker_name": "williamsmith",
    "question_helpfulness": 4,
    "reported": false,
    "answers": {
      68: {
        "id": 68,
        "body": "We are selling it here without any markup from the middleman!",
        "date": "2018-08-18T00:00:00.000Z",
        "answerer_name": "Seller",
        "helpfulness": 4,
        "photos": []
      }
    }
  }



  await act(async () => {
    createRoot(container).render(<SingleQA question={question}/>);
  });
  expect(axios).toBeCalledTimes(1);
  expect(container.querySelector('button').textContent).toBe('Q: ' + question.question_body);

  // remove the mock to ensure tests are completely isolated
  axios.mockRestore();
});
