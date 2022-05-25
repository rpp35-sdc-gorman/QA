import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { createRoot } from 'react-dom/client';
import { act, Simulate } from "react-dom/test-utils";
import axios from 'axios';
import exampleData from './ExampleData.js';

import AddQuestion from '../AddQuestion.jsx';

global.IS_REACT_ACT_ENVIRONMENT = true;

jest.mock('axios');
axios.post.mockResolvedValue('posted new Question');
let toggleAddQuestion = jest.fn();

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

it("should not be displayed on load with showAddQuestion === false", async () => {
  await act(async () => {
    createRoot(container).render(
      <AddQuestion
        toggleAddQuestion={toggleAddQuestion} // closes modal
        productToQuestion={'current product name'} // tmp variable for product name
        product_id={71697}
        showAddQuestion={false}
      />);
  });
  expect(container.querySelectorAll('.modalQuestions').length).toEqual(0);
});
describe('Unit tests on opened Add Question modal', () => {
  beforeEach(async () => {
    await act(async () => {
      createRoot(container).render(
        <AddQuestion
          toggleAddQuestion={toggleAddQuestion} // closes modal
          productToQuestion={'current product name'} // tmp variable for product name
          product_id={71697}
          showAddQuestion={true}
        />);
    });
  });

  it("should display modal on Add Question when showAddQuestion prop is true", () => {
    expect(container.querySelector('h2').textContent).toBe('Submit your Question');
    expect(container.querySelector('h3').textContent).toBe(`current product name`);
    expect(container.querySelectorAll('.modalQuestions').length).toEqual(1);
  });

  it("should call closeModal and subsequently toggleAddQuestion on close button click", async () => {
    // click close modal button
    await act(() => {
      container.querySelector('#closeAddQuestion').dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(toggleAddQuestion).toBeCalledWith();
  });

  it("should have three input fields displayed that are all required", () => {
    expect(container.querySelectorAll('.modalQuestions form label').length).toBe(3);

    container.querySelectorAll('.modalQuestions form label').forEach(label => {
      expect(label.children[0].hasAttribute('required')).toBe(true);
    })
  });

  it("should have three input fields displayed with char limits in place", () => {
    expect(container.querySelectorAll('.modalQuestions form label').length).toBe(3);
    expect(Number(container.querySelector('textarea#question').getAttribute('maxlength'))).toBe(1000);
    expect(Number(container.querySelector('input#nickname').getAttribute('maxlength'))).toBe(60);
    expect(container.querySelector('input#nickname').getAttribute('placeholder')).toBe("Example: jack543!");
    expect(Number(container.querySelector('input#email').getAttribute('maxlength'))).toBe(60);
  });

  it("should have field validation in place for invalid email", async () => {
    await act(() => {
      Simulate.change(container.querySelector('textarea#question'), { target: { id:"question", value: "random question" } });
      Simulate.change(container.querySelector('input#nickname'), { target: { id:"nickname", value: "jon" } });
      Simulate.change(container.querySelector('input#email'), { target: { id:"email", value: "asdf" } });
    })

    act(() => {
      container.querySelector('#submitQuestion').dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(axios.post).not.toBeCalled();
  });

  it("should have field validation in place for invalid email", async () => {
    await act(() => {
      Simulate.change(container.querySelector('textarea#question'), { target: { id:"question", value: "random question" } });
      Simulate.change(container.querySelector('input#nickname'), { target: { id:"nickname", value: "jon" } });
      Simulate.change(container.querySelector('input#email'), { target: { id:"email", value: "a1@test.ca" } });
    })

    await act(() => {
      container.querySelector('#submitQuestion').dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(axios.post).toBeCalled();
    expect(axios.post).toBeCalledWith("/question_answer/addQuestionTo", {"body": "random question", "name": "jon", "email": "a1@test.ca", "product_id": 71697});
    expect(toggleAddQuestion).toBeCalledWith('update successful');
  });
})