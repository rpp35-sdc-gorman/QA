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
let comparedProduct_1 = exampleProducts.products.data[1];
let comparedProduct_2 = exampleProducts.products.data[2];

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
          <Comparison main={mainProduct} related={comparedProduct_2} />
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
          <Comparison main={mainProduct} related={comparedProduct_2} />
        </Modal>)
      })
      expect(container.querySelector('.modal.display-block')).toBeNull();
    });
    it('should be not be open if comparison button was never clicked', async () => {
      let close = jest.fn();
      await act(() => {
        createRoot(container).render(
        <Modal handleClose={close} show={true}>
          <Comparison main={mainProduct} related={comparedProduct_2} />
        </Modal>)
      });
      let button = container.querySelector('#close');
      expect(button.innerHTML).toBe('X');
      await act(() => {
        container.querySelector('button').dispatchEvent(new MouseEvent('click', { bubbles: true }))
      });
      expect(close).toHaveBeenCalledTimes(1);
    });
  });
  describe('Comparison Test', () => {
    it('should have a table with cells', async() => {
      await act(() => {
        createRoot(container).render(
          <Modal show={true}>
            <Comparison main={mainProduct} related={comparedProduct_2} />
          </Modal>)
      })
      expect(container.querySelector('div#comparison')).not.toBe(null);
      expect(container.querySelector('table')).not.toBe(null);
      expect(container.querySelector('table').className).toBe('center');
      expect(container.querySelectorAll('th').length).toBe(3);
    });

    it('should have a correct table headers', async() => {
      await act(() => {
        createRoot(container).render(
          <Modal show={true}>
            <Comparison main={mainProduct} related={comparedProduct_2} />
          </Modal>)
      })
      let tableHeaders = container.querySelectorAll('th');
      expect(tableHeaders[0].innerHTML).toBe(mainProduct.name);
      expect(tableHeaders[1].innerHTML).toBe('Feature');
      expect(tableHeaders[2].innerHTML).toBe(comparedProduct_2.name);
    });

    it('should not display table if close button is clicked', async() => {
      await act(() => {
        createRoot(container).render(
          <Modal show={true}>
            <Comparison main={mainProduct} related={comparedProduct_2} />
          </Modal>)
      })
      await act(() => {
        container.querySelector('button#close').dispatchEvent(new MouseEvent('click', { bubbles: true }))
      });
      expect(container.querySelector('div.comparison')).toBe(null);
    });

    it('should not show comparison if main product is undefined', async() => {
      await act(() => {
        createRoot(container).render(
          <Modal show={true}>
            <Comparison main={undefined} related={comparedProduct_2} />
          </Modal>)
      })
      expect(container.querySelector('div.comparison')).toBe(null);
    });

    it('should have no duplicate features', async() => {
      await act(() => {
        createRoot(container).render(
          <Modal show={true}>
            <Comparison main={mainProduct} related={comparedProduct_2} />
          </Modal>)
      })
      expect(container.querySelectorAll('tbody tr').length).toBe(3);
    });

    it('should be empty when products do not share common features', async() => {
      await act(() => {
        createRoot(container).render(
          <Modal show={true}>
            <Comparison main={mainProduct} related={comparedProduct_1} />
          </Modal>)
      })
      expect(container.querySelectorAll('td.right')[0].textContent).toBe('');
    });
  })
})
