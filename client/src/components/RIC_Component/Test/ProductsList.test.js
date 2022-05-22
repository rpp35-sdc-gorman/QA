import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { createRoot } from 'react-dom/client';
import { act } from "react-dom/test-utils";
import ShallowRenderer from 'react-shallow-renderer';
import exampleProducts from './ricTestData.js';

import ProductsList from '../ProductsList.jsx';
import ProductCards from '../ProductCard.jsx';
import Carousel, { CarouselItem } from '../Carousel';

global.IS_REACT_ACT_ENVIRONMENT = true
describe('Products List Test', () =>{
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
  describe('Carousel Test', () => {
    it('should render carousel', () => {
      const renderer = new ShallowRenderer();
      renderer.render(<Carousel />);
      const result = renderer.getRenderOutput();
      console.log(result.props.children);
      expect(result.props.className).toBe('carousel');
      expect(result.props.children[0].props.className).toBe('carousel_inner');
    })
  })
})
