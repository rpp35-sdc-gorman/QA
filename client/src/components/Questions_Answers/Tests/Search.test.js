import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { createRoot } from 'react-dom/client';
import { act, Simulate } from "react-dom/test-utils";

import Search from '../Search.jsx';

global.IS_REACT_ACT_ENVIRONMENT = true // stops warning: The current testing environment is not configured to support act(...)

let setFilter = jest.fn();

var container = null;
beforeEach(async () => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
  await act(async () => {
    createRoot(container).render(<Search setFilter={setFilter}/>);
  });
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(document);
  container.remove();
  container = null;
});

describe('Unit tests', () => {
  it('should have input tag with appropriate placeholder', () => {
    expect(container.querySelector('input').placeholder).toBe("Have a question? Search for answers…");
  })

  it('should alter filterTerm state when input is changed and call setFilter from props', async () => {
    expect(container.querySelector('input').value).toBe('');
    await act(async () => {
      Simulate.change(container.querySelector('input'), {target: {value: 'new search/filter term'}})
    })
    expect(container.querySelector('input').value).toBe('new search/filter term');
    expect(setFilter).toBeCalledWith('new search/filter term');
  })
})