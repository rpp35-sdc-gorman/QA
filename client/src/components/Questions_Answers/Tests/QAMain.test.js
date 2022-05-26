import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { createRoot } from 'react-dom/client';
import { act, Simulate } from "react-dom/test-utils";
import axios from 'axios';
import exampleData from './ExampleData.js';

import QAMain from '../QAMain.jsx';

global.IS_REACT_ACT_ENVIRONMENT = true

jest.mock('axios');
let toggleAddQuestion = jest.fn();

var container = null;
beforeEach(async () => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
  await act(async () => {
    createRoot(container).render(<QAMain/>);
  });
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(document);
  container.remove();
  container = null;
});

describe('Unit tests with less than 2 questions', () => {
  // Make sure to resolve with a promise
  axios.get.mockResolvedValueOnce(exampleData.APIquestion).mockResolvedValue(exampleData.answers); // need to end with answers cause of Date part of AnswerVotingReporting in re-rendering
  it('should render one question to DOM without a "More Answered Questions" toggle', async () => {
    expect(axios.get).toBeCalledWith('/question_answer/questions/71697');
    expect(axios.get).toBeCalledWith('/question_answer/answers/37');
    expect(container.querySelector('#questionToggle')).toBe(null);

    //displays Add Question button
    expect(container.querySelectorAll('#addQuestionButton').length).toBe(1);
    expect(container.querySelector('#addQuestionButton').textContent).toBe('Add Question');
  });
})

describe('Unit tests with more than 2 questions', () => {
  axios.get.mockResolvedValueOnce(exampleData.answers).mockResolvedValueOnce(exampleData.APIquestion3).mockResolvedValue(exampleData.answers);
  it('should render one question to DOM without a "More Answered Questions" toggle', async () => {
    expect(axios.get).toBeCalledWith('/question_answer/answers/37');
    expect(axios.get).toBeCalledWith('/question_answer/questions/71697');
    expect(axios.get).toBeCalledWith('/question_answer/answers/37');
    expect(container.querySelector('#questionToggle').textContent).toBe('More Answered Questions');

    //displays Add Question button
    expect(container.querySelectorAll('#addQuestionButton').length).toBe(1);
    expect(container.querySelector('#addQuestionButton').textContent).toBe('Add Question');
  });

  it('should load more questions on "More Answered Questions" click, and turn off option to load more questions', async () => {
    expect(axios.get).toBeCalledWith('/question_answer/answers/37');
    expect(axios.get).toBeCalledWith('/question_answer/questions/71697');
    expect(axios.get).toBeCalledWith('/question_answer/answers/37');
    expect(container.querySelector('#questionToggle').textContent).toBe('More Answered Questions');

    // dispatch click to Load More Questions
    await act(async () => {
      await container.querySelector('#questionToggle').dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(container.querySelector('#questionToggle')).toBe(null);
    expect(container.querySelectorAll('#singleQA').length).toBe(3);
  });
})

describe('Integration tests', () => {
  it('should work with AddQuestions to open and close new modal window', async () => {
    axios.get.mockResolvedValueOnce(exampleData.APIquestion).mockResolvedValue(exampleData.answers);
    // dispatch a click to AddQuestion
    expect(container.querySelectorAll('.modalQuestions').length).toBe(0);
    await act(async () => {
      await container.querySelector('#addQuestionButton').dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(container.querySelectorAll('.modalQuestions').length).toBe(1);

    // dispatch click to close modal
    await act(async () => {
      await container.querySelector('#closeAddQuestion').dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(container.querySelectorAll('.modalQuestions').length).toBe(0);
  })

  it('should be able to add a question', async () => {
    // Make sure to resolve with a promise
    axios.get.mockResolvedValueOnce(exampleData.APIquestion).mockResolvedValueOnce(exampleData.answers)
    .mockResolvedValueOnce(exampleData.APIquestion2).mockResolvedValue(exampleData.answers) // need to end with answers cause of Date part of AnswerVotingReporting in re-rendering
    axios.post.mockResolvedValue('add question success');
    // on load GET requests
    expect(axios.get).toBeCalledWith('/question_answer/questions/71697');
    expect(axios.get).toBeCalledWith('/question_answer/answers/37')

    // dispatch a click to AddQuestion
    expect(container.querySelectorAll('.modalQuestions').length).toBe(0);
    await act(async () => {
      await container.querySelector('#addQuestionButton').dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(container.querySelectorAll('.modalQuestions').length).toBe(1);

    // add question
    await act(() => {
      Simulate.change(container.querySelector('textarea#question'), { target: { id:"question", value: "random question" } });
      Simulate.change(container.querySelector('input#nickname'), { target: { id:"nickname", value: "jon" } });
      Simulate.change(container.querySelector('input#email'), { target: { id:"email", value: "a1@test.ca" } });
    })

    await act(() => {
      container.querySelector('#submitQuestion').dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    // should trigger a re-render of questions with a POST to add question then GET request to update
    expect(axios.post).toBeCalledWith(`/question_answer/addQuestionTo`, {"body": "random question", "name": "jon", "email": "a1@test.ca", "product_id": 71697});
    expect(axios.get).toBeCalledWith(`/question_answer/questions/71697`);
    expect(container.querySelectorAll('#singleQA').length).toBe(2);
  })
})