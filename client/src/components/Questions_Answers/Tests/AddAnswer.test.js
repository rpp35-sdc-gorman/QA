import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { createRoot } from 'react-dom/client';
import { act, Simulate } from "react-dom/test-utils";
import axios from 'axios';
import exampleData from './ExampleData.js';

import AddAnswer from '../AddAnswer.jsx';

global.IS_REACT_ACT_ENVIRONMENT = true;

jest.mock('axios');
axios.post.mockResolvedValue('posted new answer');
let toggleAddAnswer = jest.fn();

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

it("should not be displayed on load with showAddAnswer === false", async () => {
  await act(async () => {
    createRoot(container).render(
      <AddAnswer
        toggleAddAnswer={(updated) => toggleAddAnswer(updated)} // closes modal
        questionToAnswer={exampleData.question}
        currentProduct = {'current product name'}
        showAddAnswer={false}
      />);
  });
  expect(container.querySelectorAll('.modalAnswers').length).toEqual(0);
});
describe('Unit tests on opened Add Answer modal', () => {
  beforeEach(async () => {
    await act(async () => {
      createRoot(container).render(
        <AddAnswer
          toggleAddAnswer={(updated) => toggleAddAnswer(updated)} // closes modal
          questionToAnswer={exampleData.question}
          currentProduct = {'current product name'}
          showAddAnswer={true}
        />);
    });
  });

  it("should display modal on Add Answer when showAddAnswer prop is true with proper text", () => {
    expect(container.querySelector('h2').textContent).toBe('Submit your Answer');
    expect(container.querySelector('h3').textContent).toBe(`current product name: ${exampleData.question.question_body}`);
    expect(container.querySelectorAll('.modalAnswers').length).toEqual(1);
  });

  it("should call closeModal and subsequently toggleAddAnswers on close button click", async () => {
    // click close modal button
    await act(() => {
      container.querySelector('button#closeAddAnswer').dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(toggleAddAnswer).toBeCalledWith(undefined);
  });

  it("should have three input fields displayed that are all required", () => {
    expect(container.querySelectorAll('.modalAnswers form label').length).toBe(3);

    container.querySelectorAll('.modalAnswers form label').forEach(label => {
      expect(label.children[0].hasAttribute('required')).toBe(true);
    })
  });

  it("should have three input fields displayed with char limits in place", () => {
    expect(container.querySelectorAll('.modalAnswers form label').length).toBe(3);
    expect(Number(container.querySelector('textarea#answer').getAttribute('maxlength'))).toBe(1000);
    expect(Number(container.querySelector('input#nickname').getAttribute('maxlength'))).toBe(60);
    expect(container.querySelector('input#nickname').getAttribute('placeholder')).toBe("Example: jack543!");
    expect(Number(container.querySelector('input#email').getAttribute('maxlength'))).toBe(60);
  });

  it("should have field validation in place for invalid email", async () => {
    await act(() => {
      Simulate.change(container.querySelector('textarea#answer'), { target: { id:"answer", value: "random answer" } });
      Simulate.change(container.querySelector('input#nickname'), { target: { id:"nickname", value: "jon" } });
      Simulate.change(container.querySelector('input#email'), { target: { id:"email", value: "asdf" } });
    })

    act(() => {
      container.querySelector('#submitAnswer').dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(axios.post).not.toBeCalled();
  });

  it("should have field validation in place for invalid email", async () => {
    await act(() => {
      Simulate.change(container.querySelector('textarea#answer'), { target: { id:"answer", value: "random answer" } });
      Simulate.change(container.querySelector('input#nickname'), { target: { id:"nickname", value: "jon" } });
      Simulate.change(container.querySelector('input#email'), { target: { id:"email", value: "a1@test.ca" } });
    })

    await act(() => {
      container.querySelector('#submitAnswer').dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(axios.post).toBeCalled();
    expect(axios.post).toBeCalledWith(`/question_answer/addAnswerTo/${exampleData.question.question_id}`, {"body": "random answer", "name": "jon", "email": "a1@test.ca"});
    expect(toggleAddAnswer).toBeCalledWith('update successful');
  });
})