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

describe("Prouct Description Module", () => {
  let container = null;

  beforeEach(async () => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });
  afterEach(() => {
    unmountComponentAtNode(document);
    container.remove();
    container = null;
  });
  it('Should Render the Product Description when given data', () => {
    act(() => {
      createRoot(container).render(<ProductDescription info={testData} />)
    })
    expect(container.querySelector('.ProductDescription')).not.toBe(undefined);
  })
  it('Should render nothing if there is not data provided', () => {
    act(() => {
      createRoot(container).render(<ProductDescription />)
    })
    expect(container.querySelector('.ProductDescription')).toBe(undefined);
  })
})