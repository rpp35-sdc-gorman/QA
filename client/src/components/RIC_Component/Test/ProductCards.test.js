import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { createRoot } from 'react-dom/client';
import { act } from "react-dom/test-utils";
import ProductCards from '../ProductCard.jsx';

global.IS_REACT_ACT_ENVIRONMENT = true
describe("Product Card Tests", () => {
  let container = null;
  let specificProduct = {
    "id": 71703,
    "campus": "hr-rpp",
    "name": "Blues Suede Shoes",
    "slogan": "2019 Stanley Cup Limited Edition",
    "description": "Touch down in the land of the Delta Blues in the middle of the pouring rain",
    "category": "Dress Shoes",
    "default_price": "120.00",
    "star_rating": 3,
    "thumbnail": "https://images.unsplash.com/photo-1561861422-a549073e547a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
    "sale_price": null,
    "list": "related"
  };
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

  it("should render one product card", async () => {
    await act(async () => {
      createRoot(container).render(<ProductCards category={specificProduct.category}
        name={specificProduct.name}
        default_price={specificProduct.default_price}
        sale_price={specificProduct.sale_price}
        star_rating={specificProduct.star_rating}
        thumbnail={specificProduct.thumbnail}
        id={specificProduct.id}
        list={specificProduct.list}
        />);
    });
    expect(container.querySelectorAll('div.card_category')[0].textContent).toBe(specificProduct.category);
    expect(container.querySelectorAll('div.card_name')[0].textContent).toBe(specificProduct.name);
    expect(container.querySelectorAll('div.card_price')[0].textContent).toBe(`$${specificProduct.default_price}`);
  });

  it("should render image on product card", async () => {
    await act(async () => {
      createRoot(container).render(<ProductCards category={specificProduct.category}
        name={specificProduct.name}
        default_price={specificProduct.default_price}
        sale_price={specificProduct.sale_price}
        star_rating={specificProduct.star_rating}
        thumbnail={specificProduct.thumbnail}
        id={specificProduct.id}
        list={specificProduct.list}
        />);
    });
    expect(container.querySelector('img').src).toEqual(specificProduct.thumbnail);
  });

  it("should render stars for rating", async () => {
    await act(async () => {
      createRoot(container).render(<ProductCards category={specificProduct.category}
        name={specificProduct.name}
        default_price={specificProduct.default_price}
        sale_price={specificProduct.sale_price}
        star_rating={specificProduct.star_rating}
        thumbnail={specificProduct.thumbnail}
        id={specificProduct.id}
        list={specificProduct.list}
        />);
    });
    expect(container.querySelector('div.rating').textContent).toContain('★');
    expect(container.querySelector('div.rating').textContent).toContain('☆');
  });

  it("should render corret icon for action button", async () => {
    await act(async () => {
      createRoot(container).render(<ProductCards category={specificProduct.category}
        name={specificProduct.name}
        default_price={specificProduct.default_price}
        sale_price={specificProduct.sale_price}
        star_rating={specificProduct.star_rating}
        thumbnail={specificProduct.thumbnail}
        id={specificProduct.id}
        list={specificProduct.list}
        />);
    });
    expect(container.querySelector('svg').getAttribute('class')).not.toBe('card_remove');
    expect(container.querySelector('svg').getAttribute('class')).toBe('card_compare');
  });

  it("should render corret icon for action button", async () => {
    specificProduct.list = 'yourOutfit';
    await act(async () => {
      createRoot(container).render(<ProductCards category={specificProduct.category}
        name={specificProduct.name}
        default_price={specificProduct.default_price}
        sale_price={specificProduct.sale_price}
        star_rating={specificProduct.star_rating}
        thumbnail={specificProduct.thumbnail}
        id={specificProduct.id}
        list={specificProduct.list}
        />);
    });
    expect(container.querySelector('svg').getAttribute('class')).not.toBe('card_compare');
    expect(container.querySelector('svg').getAttribute('class')).toBe('card_remove');
  });

});