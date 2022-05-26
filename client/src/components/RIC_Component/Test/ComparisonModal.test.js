import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { createRoot } from 'react-dom/client';
import { act } from "react-dom/test-utils";
import ShallowRenderer from 'react-shallow-renderer';
import exampleProducts from './ricTestData.js';

import Comparison from '../Comparison.jsx';
import Modal from '../../common/modal.jsx';

global.IS_REACT_ACT_ENVIRONMENT = true
let mainProduct = exampleProducts.products.data[3];
let comparedProduct = exampleProducts.products.data[2];

describe('Comparison Modal Test', () =>{
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
  describe('Modal Test', () => {
    it('should render modal', () => {
      const renderer = new ShallowRenderer();
      renderer.render(<Modal show={true}/>);
      const result = renderer.getRenderOutput();
      expect(result.props.className).toBe('modal display-block');
    });
    it('should have closed the modal window when clicking close button', async () => {
      await act(() => {
        createRoot(container).render(
        <Modal show={true}>
          <Comparison main={mainProduct} related={comparedProduct} />
        </Modal>)
      })
      expect(container.querySelectorAll('#comparison').length).toBe(1);
      await act(() => {
        container.querySelector('button').dispatchEvent(new MouseEvent('click', { bubbles: true }))
      })
      expect(container.querySelector('div.comparison')).toBe(null);
    });
    it('should be not be open if comparison button was never clicked', async () => {
      await act(() => {
        createRoot(container).render(
        <Modal>
          <Comparison main={mainProduct} related={comparedProduct} />
        </Modal>)
      })
      expect(container.querySelector('div.modal.display-block')).toBe(null);
    });
  })
})
