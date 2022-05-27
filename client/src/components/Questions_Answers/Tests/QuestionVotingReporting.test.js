import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { createRoot } from 'react-dom/client';
import { act, Simulate } from "react-dom/test-utils";
import axios from 'axios';
import exampleData from './ExampleData.js';

import QuestionVotingReporting from '../QuestionVotingReporting.jsx';

global.IS_REACT_ACT_ENVIRONMENT = true;

// mocks
jest.mock('axios');
axios.put.mockResolvedValue('voted question as helpful');
let toggleAddAnswer = jest.fn();
let clickTracker = jest.fn();

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});
afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(document);
  container.remove();
  container = null;
});

describe('Unit tests', () => {
  beforeEach(async () => {
    await act(async () => {
      createRoot(container).render(
        <QuestionVotingReporting
          question_id={exampleData.question.question_id}
          helpfulness={exampleData.question.question_helpfulness}
          toggleAddAnswer={toggleAddAnswer}
          clickTracker={clickTracker}
        />);
    });
  });

  it('should contain two children with "Helpful? Yes (4)" and "Add Answer" inner texts', () => {
    expect(container.querySelector("#question_details").children.length).toBe(2);
    expect(container.querySelector("#question_details").children[0].textContent).toBe('Helpful? Yes (4)');
    expect(container.querySelector("#question_details").children[1].textContent).toBe('Add Answer');
  })

  it('should increment question helpfulness on click of Yes and send PUT request', () => {
    act(() => {
      container.querySelector('#helpfulQuestion').dispatchEvent(new MouseEvent("click", { bubbles: true }));
    })
    expect(container.querySelector("#question_details").children[0].textContent).toBe('Helpful? Yes (5)');
    expect(axios.put).toBeCalledWith(`/question_answer/voting/question/helpful/${exampleData.question.question_id}`)
  })

  it('should call toggleAddAnswer from parent component on "Add Answer" click', () => {
    act(() => {
      container.querySelector('#addAnswerButton').dispatchEvent(new MouseEvent("click", { bubbles: true }));
    })
    expect(toggleAddAnswer).toBeCalledWith(expect.objectContaining({target: container.querySelector('#addAnswerButton')}));
  })
})