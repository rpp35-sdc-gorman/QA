import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { createRoot } from 'react-dom/client';
import { act, Simulate } from "react-dom/test-utils";
import axios from 'axios';
import exampleData from './ExampleData.js';

import AnswerVotingReporting from '../AnswerVotingReporting.jsx';

global.IS_REACT_ACT_ENVIRONMENT = true;

// mocks
jest.mock('axios');
axios.put.mockResolvedValue('voted question as helpful');
let toggleAddQuestion = jest.fn();

let answer = exampleData.answers.data.results[0];

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

it("should not give option to vote or report answer if accordion list is closed", async () => {
  await act(async () => {
    createRoot(container).render(
      <AnswerVotingReporting
        answer_id={answer.answer_id}
        answerer_name={answer.answerer_name}
        helpfulness={answer.helpfulness}
        date={answer.date}
      />);
  });
  expect(container.querySelectorAll('.answer_details').length).toEqual(0);
});

describe('Unit tests', () => {
  beforeEach(async () => {
    await act(async () => {
      createRoot(container).render(
        <AnswerVotingReporting
          answer_id={answer.answer_id}
          answerer_name={answer.answerer_name}
          helpfulness={answer.helpfulness}
          date={answer.date}
        />);
    });
  });

  it('should contain three children with "Helpful? Yes (asdf)" and "Report" inner texts', () => {
    expect(container.querySelector("#answer_details").children.length).toBe(3);
    expect(container.querySelector("#answer_details").children[0].textContent).toBe('by metslover, Jan 3, 2018');
    expect(container.querySelector("#answer_details").children[1].textContent).toBe('Helpful? Yes (8)');
    expect(container.querySelector("#answer_details").children[2].textContent).toBe('Report');
  })

  it('should increment answer helpfulness on click of Yes and send PUT request', () => {
    act(() => {
      container.querySelector('#helpfulAnswer').dispatchEvent(new MouseEvent("click", { bubbles: true }));
    })
    expect(container.querySelector("#answer_details").children[1].textContent).toBe('Helpful? Yes (9)');
    expect(axios.put).toBeCalledWith(`/question_answer/helpful/answer/${answer.answer_id}`)
  })

  it('should send PUT request on click of report and change text to from "Report" to "Reported"', () => {
    expect(container.querySelector("#answer_details").children[2].textContent).toBe('Report');
    act(() => {
      container.querySelector('#answerReporting').dispatchEvent(new MouseEvent("click", { bubbles: true }));
    })
    expect(container.querySelector("#answer_details").children[2].textContent).toBe('Reported');
    expect(axios.put).toBeCalledWith(`/question_answer/reported/answer/${answer.answer_id}`)
  })
})