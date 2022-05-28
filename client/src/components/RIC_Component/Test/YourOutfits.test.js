import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { createRoot } from 'react-dom/client';
import { act } from "react-dom/test-utils";
import exampleProducts from './ricTestData.js';

import YourOutfits from '../YourOutfits.jsx';

global.IS_REACT_ACT_ENVIRONMENT = true;
let currentProduct = {
  "id": 71698,
  "campus": "hr-rpp",
  "name": "Bright Future Sunglasses",
  "slogan": "You've got to wear shades",
  "description": "Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.",
  "category": "Accessories",
  "default_price": "69.00",
  "star_rating": 3.75,
  "thumbnail": null,
  "sale_price": null,
  "list": "outfit"
};
let anotherCurrentProduct = {
    "id": 71704,
    "campus": "hr-rpp",
    "name": "YEasy 350",
    "slogan": "Just jumped over jumpman",
    "description": "These stretchy knit shoes show off asymmetrical lacing and a big sculpted rubber midsole. In a nod to adidas soccer heritage.",
    "category": "Kicks",
    "default_price": "450.00",
    "star_rating": null,
    "thumbnail": "https://images.unsplash.com/photo-1505248254168-1de4e1abfa78?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
    "sale_price": null,
    "list": "outfit"
};
describe('Your Outfits Test', () => {
  let container = null;
  beforeEach(async () => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
    await act(() => {
      createRoot(container).render(<YourOutfits currentProduct={currentProduct}/>);
    });
  });
  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(document);
    container.remove();
    container = null;
  });

  it('should have a card to add the current product', async() => {
    expect(container.querySelector('div.card.addition')).not.toBe(null);
  });

  it('should have added the current product to your outfit list', async() => {
    await act(async () => {
      await container.querySelector('div.card.addition').dispatchEvent(new MouseEvent('click', { bubbles: true }))
    });
    expect(container.querySelector('div.carousel')).not.toBeNull();
    expect(container.querySelector('div.carousel_inner')).not.toBeNull();
    expect(container.querySelector('div.carousel_item')).not.toBeNull();
    expect(container.querySelectorAll('div.carousel_item').length).toEqual(2);
    expect(container.querySelectorAll('div.card_category')[1].textContent).toBe(currentProduct.category);
    expect(container.querySelectorAll('div.card_name')[1].textContent).toBe(currentProduct.name);
    expect(container.querySelectorAll('div.card_price')[1].textContent).toBe(`$${currentProduct.default_price}`);
    expect(container.querySelectorAll('svg.card_remove').length).not.toEqual(0);
  });

  it('should should not add the current product if it has already been added', async() => {
    await act(async () => {
      await container.querySelector('div.card.addition').dispatchEvent(new MouseEvent('click', { bubbles: true }))
    });
    await act(async () => {
      await container.querySelector('div.card.addition').dispatchEvent(new MouseEvent('click', { bubbles: true }))
    });
    expect(container.querySelectorAll('div.card').length).not.toEqual(3);
  });

  it('should be able to remove an existing outfit', async() => {
    await act(async () => {
      await container.querySelector('div.card.addition').dispatchEvent(new MouseEvent('click', { bubbles: true }))
    });
    await act(async () => {
      await container.querySelector('svg').dispatchEvent(new MouseEvent('click', { bubbles: true }))
    });
    expect(container.querySelectorAll('div.card').length).toEqual(1);
  });

  // find a way to navigate to another product to add it in
})
