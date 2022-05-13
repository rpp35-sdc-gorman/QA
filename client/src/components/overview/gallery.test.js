import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { createRoot } from 'react-dom/client';
import { act } from "react-dom/test-utils";
import sendRequest from '../../../../server/lib/sendRequest';

import Gallery from './Gallery';


describe("Gallery Unit Tests", () => {
  let testData = '';
  let container = null;

  beforeEach(() => {
    sendRequest('products/71697/styles')
      .then(data => {
        testData = data;
      })
      .catch(err => console.log(err))
    container = document.createElement("div");
    document.body.appendChild(container);
  })
  test('Before Should return valid data', () => {
    console.log(testData);
    // expect(testData).anything()
  })
})