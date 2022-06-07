import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { createRoot } from 'react-dom/client';
import { act } from "react-dom/test-utils";

import ProductDescription from '../ProductDescription';

const testData = {
  "info": {
      "id": 71697,
      "campus": "hr-rpp",
      "name": "Camo Onesie",
      "slogan": "Blend in to your crowd",
      "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
      "category": "Jackets",
      "default_price": "140.00",
      "created_at": "2022-05-11T19:38:15.373Z",
      "updated_at": "2022-05-11T19:38:15.373Z",
      "features": [
          {
              "feature": "Fabric",
              "value": "Canvas"
          },
          {
              "feature": "Buttons",
              "value": "Brass"
          }
      ]
  }
}

global.IS_REACT_ACT_ENVIRONMENT = true

describe("Prouct Description Module", () => {
    let container = null;
    let root = null

  beforeEach(async () => {
    container = document.createElement("div");
    container.id = 'root';
    document.body.appendChild(container);
    root = createRoot(document.getElementById('root'))
  });
  afterEach(() => {
    unmountComponentAtNode(document);
    container.remove();
    container = null;
  });
  it('Should Render the Product Description when given data', () => {
    act(() => {
      root.render(<ProductDescription info={testData} />)
    })
    const r = document.querySelector('.ProductDescription')
    expect(r).not.toBe(undefined);
  })
  it('Should render nothing if there is not data provided', () => {
    act(() => {
      root.render(<ProductDescription />)
    })
    expect(container.querySelector('.ProductDescription')).toBe(null);
  })
  it('Should render out a list of features', () => {
    act(() => {
    root.render(<ProductDescription info={testData} />)
    })
    const f = container.querySelectorAll('.features')
    expect(f.children.length).toBe(2);
  })
})