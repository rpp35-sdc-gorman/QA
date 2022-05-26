import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { createRoot } from 'react-dom/client';
import { act } from "react-dom/test-utils";
import ShallowRenderer from 'react-shallow-renderer';
import exampleProducts from './ricTestData.js';

import ProductCards from '../ProductCard.jsx';
import Carousel, { CarouselItem } from '../Carousel';

describe('Carousel Test', () => {
  let container = null;
  beforeEach(async () => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
    let compare = jest.fn();
    await act(() => {
      createRoot(container).render(
        <Carousel>
          {exampleProducts.products.data.map((product, index) => {
            return(
              <CarouselItem key={product.id}>
                <ProductCards category={product.category}
                  name={product.name}
                  default_price={product.default_price}
                  sale_price={product.sale_price}
                  star_rating={product.star_rating}
                  thumbnail={product.thumbnail}
                  id={product.id}
                  list={product.list}
                  compare={compare}
                  index={index}
                  />
              </CarouselItem>
            )
          })}
        </Carousel>
        )
      })
  });
  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(document);
    container.remove();
    container = null;
  });

  it('should render carousel', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<Carousel />);
    const result = renderer.getRenderOutput();
    expect(result.props.className).toBe('carousel');
    expect(result.props.children[0].props.className).toBe('carousel_inner');
  });

  it('should have product cards in carousel', async () => {
    expect(container.querySelectorAll('div.card').length).toEqual(4);
    expect(container.querySelectorAll('div.carousel_item').length).toEqual(4);
  });

  it('should not have a back button when at start of related products list', async () => {
    expect(container.querySelectorAll('#back').length).toEqual(0);
  });

  it('should have back button after clicking next once', async () => {
    await act(() => {
      container.querySelector('#next').dispatchEvent(new MouseEvent('click', { bubbles: true }))
    });
    expect(container.querySelectorAll('#back').length).toEqual(1);
  });

  it('should hide next button after reaching end of list', async () => {
    await act(async () => {
      await container.querySelector('#next').dispatchEvent(new MouseEvent('click', { bubbles: true }))
    });
    expect(container.querySelectorAll('button.next').length).toEqual(0);
  });

  it('should hide back button at mount', async () => {
    expect(container.querySelector('button.back')).toBe(null);
  });
  // need to figure out way to remove element carousel item from carousel and rerender
})