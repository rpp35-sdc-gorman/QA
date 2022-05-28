import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { createRoot } from 'react-dom/client';
import { act } from "react-dom/test-utils";
import axios from 'axios';
import exampleData from './ExampleData.js';

import Answers from '../Answers.jsx';

global.IS_REACT_ACT_ENVIRONMENT = true;

let clickTracker = jest.fn();

let container = null;
beforeEach(async () => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
  await act(async () => {
    createRoot(container).render(<Answers allAnswers={exampleData.answers} showAnswers={true} clickTracker={clickTracker}/>);
  });
});
afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(document);
  container.remove();
  container = null;
});

describe('Unit tests', () => {
  it("should have all questions loaded by default, and up to 2 displayed", () => {
    expect(container.querySelectorAll('div.panel').length).toBe(3);
    expect(container.querySelectorAll('div.panel.active').length).toBe(2);
    expect(container.querySelector('section.panel#load').textContent).toBe('See more answers');
  });

  it('should display all answers once clicked and switch button text to "Collapse answers"', async () => {
    // dispatch a click event on question button
    expect(container.querySelectorAll('div.panel.active').length).toBe(2);
    expect(container.querySelector('section#load.panel').textContent).toBe('See more answers');

    // dispatch click on see more answers div
    await act(async () => {
      container.querySelector('section#load').dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(container.querySelectorAll('div.panel.active').length).toBe(3);
    expect(container.querySelector('section#load.panel').textContent).toBe('Collapse answers');
  });
})

describe('Integration with images', () => {
  it("should open modal when image is clicked", async () => {
    expect(container.querySelector('.modal.display-block')).toBeNull();
    // dispatch click on see more answers div
    await act(async () => {
      container.querySelector('img').dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(container.querySelector('.modal.display-block')).not.toBeNull();
  })
})