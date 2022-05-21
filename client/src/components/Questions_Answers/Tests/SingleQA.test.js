import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { createRoot } from 'react-dom/client';
import { act } from "react-dom/test-utils";
import axios from 'axios';
import SingleQA from './SingleQA.jsx';

global.IS_REACT_ACT_ENVIRONMENT = true
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
  },
  {
    "answer_id": 11,
    "body": "Random answer",
    "date": "2018-01-04T00:00:00.000Z",
    "answerer_name": "Jon",
    "helpfulness": 8,
    "photos": [],
  }
]}}
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
jest.mock('axios');
// Make sure to resolve with a promise
axios.get.mockResolvedValue(answers);
let container = null;
beforeEach(async () => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
  await act(async () => {
    createRoot(container).render(<SingleQA question={question}/>);
  });
});
afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});
it("should render one QA item to screen displaying question body", async () => {
  expect(axios.get).toBeCalledTimes(1);
  expect(container.querySelector('button').textContent).toBe('Q: ' + question.question_body);
});

it("should have all questions loaded by default, and up to 2 displayed", async () => {
  expect(container.querySelectorAll('div.panel').length).toBe(3);
  expect(container.querySelectorAll('div.panel.active').length).toBe(2);
  expect(container.querySelector('a.panel#load').textContent).toBe('See more answers');
});

it('should toggle on question click to hide/display first 2 answers to question', async () => {
	// dispatch a click event on question button
  await act(() => {
    container.querySelector('button').dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  // expect to hide answers
  expect(container.querySelectorAll('div.panel.active').length).toBe(0);
  expect(container.querySelector('a.panel.active#load')).toBe(null);
  // second click should expand answers
  await act(() => {
    container.querySelector('button').dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(container.querySelectorAll('div.panel.active').length).toBe(2);
  expect(container.querySelectorAll('div.panel').length).toBe(3);
  expect(container.querySelector('a.panel.active#load').textContent).toBe('See more answers');
});

it('should display all answers once clicked and switch button text to "Collapse answers"', async () => {
  // dispatch a click event on question button
  expect(container.querySelectorAll('div.panel.active').length).toBe(2);

  // dispatch click on see more answers div
  await act(() => {
    container.querySelector('a#load').dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(container.querySelectorAll('div.panel.active').length).toBe(3);
  expect(container.querySelector('a#load.panel').textContent).toBe('Collapse answers');
});