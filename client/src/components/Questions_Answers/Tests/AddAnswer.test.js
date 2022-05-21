import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { createRoot } from 'react-dom/client';
import { act, Simulate } from "react-dom/test-utils";
import axios from 'axios';
import exampleData from './ExampleData.js';

// Enzyme stuff
// import { configure, shallow } from 'enzyme';
// import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
// configure({ adapter: new Adapter() });

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
        currentProduct = {4444}
        showAddAnswer={false}
      />);
  });
  expect(container.querySelectorAll('.modal').length).toEqual(0);
});
describe('Unit tests on opened Add Answer modal', () => {
  beforeEach(async () => {
    await act(async () => {
      createRoot(container).render(
        <AddAnswer
          toggleAddAnswer={(updated) => toggleAddAnswer(updated)} // closes modal
          questionToAnswer={exampleData.question}
          currentProduct = {4444}
          showAddAnswer={true}
        />);
    });
  });

  it("should display modal on Add Answer when showAddAnswer prop is true", () => {
    expect(container.querySelectorAll('.modal').length).toEqual(1);
  });

  it("should call closeModal on close button click", () => {
    // click close modal button
    act(() => {
      container.querySelector('button').dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(toggleAddAnswer).toBeCalledWith(undefined);
  });

  it("should have three input fields displayed that are all required", () => {
    expect(container.querySelectorAll('.modal form label').length).toBe(3);

    container.querySelectorAll('.modal form label').forEach(label => {
      expect(label.children[0].hasAttribute('required')).toBe(true);
    })
  });

  it("should have three input fields displayed with char limits in place", () => {
    expect(container.querySelectorAll('.modal form label').length).toBe(3);
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
    expect(axios.post).toBeCalledWith("/question_answer/addAnswerTo/37", {"body": "random answer", "name": "jon", "email": "a1@test.ca"});
    expect(toggleAddAnswer).toBeCalledWith('update successful');
  });
})

// const textarea = document.querySelector('#text-area-in-react')

// var nativeTextAreaValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value").set;
// nativeTextAreaValueSetter.call(textarea, 'This should be in state');

// const event = new Event('input', { bubbles: true});
// textarea.dispatchEvent(event);