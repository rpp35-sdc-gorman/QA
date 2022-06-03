import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { createRoot } from 'react-dom/client';
import { act } from "react-dom/test-utils";
import exampleProducts from './moreTestData.js';
import axios from 'axios';

import RIC from '../RIC.jsx';

global.IS_REACT_ACT_ENVIRONMENT = true
jest.mock('axios');
let container = null;
let clickTracker = jest.fn();
beforeEach(async () => {
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

describe('RIC Parent Test', () =>{
  it('should load entire component', async () => {
    axios.get.mockResolvedValue(exampleProducts.products);
    await act(() => {
      createRoot(container).render(<RIC />)
    })
    expect(container.querySelector('#RIC')).not.toBe(null);
  });
  it('should not load component', async () => {
    axios.get.mockResolvedValue(new TypeError());
    await act(() => {
      createRoot(container).render(<RIC />)
    })
    expect(container.querySelector('#RIC')).toBe(null);
  });
  it('should not have a thumbnail on the first card', async () => {
    axios.get.mockResolvedValue(exampleProducts.products);
    await act(() => {
      createRoot(container).render(<RIC />)
    })
    expect(container.querySelectorAll('.card_visual')[0].src).toBe('');
  });
  it('should open the comparison module', async () => {
    axios.get.mockResolvedValue(exampleProducts.products);
    await act(async () => {
      await createRoot(container).render(<RIC clickTracker={clickTracker}/>)
    })
    await act(async () => {
      await container.querySelector('svg.card_compare').dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })
    expect(container.querySelector('#comparison')).not.toBe(null);
    expect(container.querySelector('table')).not.toBe(null);
    expect(container.querySelector('table').className).toBe('center');
  });
  it('should open then close the comparison module', async () => {
    axios.get.mockResolvedValue(exampleProducts.products);
    await act(async () => {
      await createRoot(container).render(<RIC clickTracker={clickTracker}/>)
    })
    await act(async () => {
      await container.querySelectorAll('svg.card_compare')[1].dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })
    await act(async () => {
      await container.querySelector('button#close').dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })
    expect(container.querySelector('#comparison')).toBe(null);
    expect(container.querySelector('table')).toBe(null);
  });
  it('should redirect to a new page', async () => {
    axios.get.mockResolvedValue(exampleProducts.products);
    let current, next;
    await act(async () => {
      await createRoot(container).render(<RIC clickTracker={clickTracker}/>)
      current = global.window.location.href;
    })
    await act(async () => {
      await container.querySelector('.card_visual').dispatchEvent(new MouseEvent('click', { bubbles: true }));
      next = global.window.location.href;
    })
    expect(current).not.toBe(next);
  });
})