import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { createRoot } from 'react-dom/client';
import { act, Simulate } from "react-dom/test-utils";
import axios from 'axios';
import exampleData from './ExampleData.js';

import SingleQA from '../SingleQA.jsx';

global.IS_REACT_ACT_ENVIRONMENT = true

jest.mock('axios');
axios.post.mockResolvedValue('successful addAnswer');
let clickTracker = jest.fn();
let reload = jest.fn();

var container = null;
beforeEach(async () => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
  await act(async () => {
    createRoot(container).render(<SingleQA
      question={{...exampleData.question, 'answers': exampleData.answers}}
      clickTracker={clickTracker}
      reload={reload}
    />);
  });
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(document);
  container.remove();
  container = null;
});

describe('Unit tests', () => {
  it("should render one QA item to screen displaying question body", async () => {
    expect(container.querySelector('button').textContent).toBe('Q: ' + exampleData.question.question_body);
  });

  it('should toggle on question click to hide/display first 2 answers to question', async () => {
    // dispatch a click event on question button
    await act(() => {
      container.querySelector('button').dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    // expect to hide answers
    expect(container.querySelectorAll('div.panel.active').length).toBe(0);
    expect(container.querySelector('section.panel.active#load')).toBe(null);
    // second click should expand answers
    await act(() => {
      container.querySelector('button').dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(container.querySelectorAll('div.panel.active').length).toBe(2);
    expect(container.querySelectorAll('div.panel').length).toBe(3);
    expect(container.querySelector('section.panel.active#load').textContent).toBe('See more answers');
  });
})

describe('Integration tests', () => {
  it('should work with expanded property of Answers to hide/display first 2 or all answers to a question', async () => {
    // expect to have 2/3 answers visible by default
    expect(container.querySelectorAll('div.panel.active').length).toBe(2);
    expect(container.querySelectorAll('div.panel').length).toBe(3);
    expect(container.querySelector('section.panel.active#load').textContent).toBe('See more answers');

    // click to see more answers
    await act(async () => {
      container.querySelector('section.panel.active#load').dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(container.querySelectorAll('div.panel.active').length).toBe(3);
    expect(container.querySelector('section.panel.active#load').textContent).toBe('Collapse answers');

    // click on question to hide all answers
    await act(() => {
      container.querySelector('button.accordion').dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(container.querySelectorAll('div.panel.active').length).toBe(0);
    expect(container.querySelectorAll('div.panel').length).toBe(3);
    expect(container.querySelector('section.panel.active#load')).toBe(null);

    // click on question to show all answers
    await act(() => {
      container.querySelector('button.accordion').dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(container.querySelectorAll('div.panel.active').length).toBe(3);
    expect(container.querySelectorAll('div.panel').length).toBe(3);
    expect(container.querySelector('section.panel.active#load').textContent).toBe('Collapse answers');
  });

  it('should work with AddAnswer to open new modal window', async () => {
    // dispatch a click to AddAnswer
    expect(container.querySelectorAll('#addAnswerButton').length).toBe(1);
    await act(async () => {
      container.querySelector('#addAnswerButton').dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(container.querySelectorAll('.modalAnswers').length).toBe(1);
  })

  it('should close addAnswer modal on button click', async () => {
    // dispatch a click to AddAnswer
    expect(container.querySelectorAll('#addAnswerButton').length).toBe(1);
    await act(async () => {
      container.querySelector('#addAnswerButton').dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(container.querySelectorAll('.modalAnswers').length).toBe(1);

    // dispatch a click to closeModal
    await act(async () => {
      container.querySelector('#closeAddAnswer').dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(container.querySelectorAll('.modalAnswers').length).toBe(0);
  })

  it('should add an answer on submitAnswer button click', async () => {
    // assertions for what's on screen
    expect(container.querySelectorAll('#addAnswerButton').length).toBe(1);
    expect(container.querySelector('.modalAnswers')).toBeNull();
    // dispatch a click to AddAnswer
    await act(async () => {
      container.querySelector('#addAnswerButton').dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(container.querySelectorAll('.modalAnswers').length).toBe(1);

    // simulate changes to AddAnswer form
    await act(() => {
      Simulate.change(container.querySelector('textarea#answer'), { target: { id:"answer", value: "random test answer" } });
      Simulate.change(container.querySelector('input#nickname'), { target: { id:"nickname", value: "jon" } });
      Simulate.change(container.querySelector('input#email'), { target: { id:"email", value: "a1@test.ca" } });
    })

    // simulate click to button to submit answer
    await act(async () => {
      container.querySelector('input#submitAnswer').dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    // assertions
    expect(axios.post).toBeCalledWith("/question_answer/addAnswerTo/37", {"body": "random test answer", "email": "a1@test.ca", "name": "jon", "photos": []})
    expect(reload).toBeCalled();
  })
})