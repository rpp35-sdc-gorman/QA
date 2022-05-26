import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { createRoot } from 'react-dom/client';
import { act } from "react-dom/test-utils";
import exampleProducts from './ricTestData.js';

import RelatedProducts from '../RelatedProducts.jsx';

global.IS_REACT_ACT_ENVIRONMENT = true
describe('Related Products Test', () => {
  let container = null;
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
  it('should call on compare function when clicked', async() => {
    let compare = jest.fn();
    await act(() => {
      createRoot(container).render(<RelatedProducts products={exampleProducts.products.data} compare={compare} />)
    })
    await act(async () => {
      await container.querySelector('svg').dispatchEvent(new MouseEvent('click', { bubbles: true }))
    });
    expect(compare).toHaveBeenCalledTimes(1);
  })
})
