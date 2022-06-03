import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { createRoot } from 'react-dom/client';
import { act } from "react-dom/test-utils";
import exampleProducts from './ricTestData.js';
import moreExampleProducts from './moreTestData.js';

import YourOutfits from '../YourOutfits.jsx';

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock;

global.IS_REACT_ACT_ENVIRONMENT = true;
let currentProduct = moreExampleProducts.products.data[0];
let anotherCurrentProduct = exampleProducts.products.data[0];
describe('Your Outfits Test', () => {
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

  it('should have a card to add the current product', async() => {
    await act(() => {
      createRoot(container).render(<YourOutfits currentProduct={currentProduct} clickTracker={clickTracker}/>);
    });
    expect(container.querySelector('div.card.addition')).not.toBe(null);
  });

  it('should have added the current product to your outfit list', async() => {
    await act(() => {
      createRoot(container).render(<YourOutfits currentProduct={currentProduct} clickTracker={clickTracker}/>);
    });
    await act(async () => {
      await container.querySelector('div.card.addition').dispatchEvent(new MouseEvent('click', { bubbles: true }))
    });
    expect(container.querySelector('div.carousel')).not.toBeNull();
    expect(container.querySelector('div.carousel_inner')).not.toBeNull();
    expect(container.querySelector('div.carousel_item')).not.toBeNull();
    expect(container.querySelectorAll('div.carousel_item').length).toEqual(2);
    expect(container.querySelectorAll('div.card_category')[1].textContent).toBe(currentProduct.category);
    expect(container.querySelectorAll('div.card_name')[1].textContent).toBe(currentProduct.name);
    expect(container.querySelectorAll('div.card_price')[1].textContent).toBe(`$${currentProduct.default_price} `);
    expect(container.querySelectorAll('svg.card_remove').length).not.toEqual(0);
  });

  it('should should not add the current product if it has already been added', async() => {
    await act(() => {
      createRoot(container).render(<YourOutfits currentProduct={currentProduct} clickTracker={clickTracker}/>);
    });
    await act(async () => {
      await container.querySelector('div.card.addition').dispatchEvent(new MouseEvent('click', { bubbles: true }))
    });
    await act(async () => {
      await container.querySelector('div.card.addition').dispatchEvent(new MouseEvent('click', { bubbles: true }))
    });
    expect(container.querySelectorAll('div.card').length).not.toEqual(3);
  });

  it('should be able to remove an existing outfit', async() => {
    await act(() => {
      createRoot(container).render(<YourOutfits currentProduct={currentProduct} clickTracker={clickTracker} />);
    });
    await act(async () => {
      await container.querySelector('div.card.addition').dispatchEvent(new MouseEvent('click', { bubbles: true }))
    });
    await act(async () => {
      await container.querySelector('svg').dispatchEvent(new MouseEvent('click', { bubbles: true }))
    });
    expect(container.querySelectorAll('div.card').length).toEqual(1);
  });

  it('should should add a different product if it not already been added', async() => {
    anotherCurrentProduct.list = 'outfit';
    global.localStorage.setItem('Outfit', JSON.stringify([anotherCurrentProduct]));
    await act(() => {
      createRoot(container).render(<YourOutfits currentProduct={currentProduct} clickTracker={clickTracker} />);
    });
    await act(async () => {
      await container.querySelector('div.card.addition').dispatchEvent(new MouseEvent('click', { bubbles: true }))
    });
    expect(container.querySelectorAll('div.card').length).toEqual(3);
    await act(async () => {
      await container.querySelector('.card_remove').dispatchEvent(new MouseEvent('click', { bubbles: true }))
    });
    expect(container.querySelectorAll('div.card').length).toEqual(2);
  });
})
