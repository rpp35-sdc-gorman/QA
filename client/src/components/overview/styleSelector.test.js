import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { createRoot } from 'react-dom/client';
import { act } from "react-dom/test-utils";

import StyleSelector from './StyleSelector';

describe("Style Selector Unit Tests", () => {
  let container = null;

  beforeEach(async () => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });
  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('Should have some tests here', () => {
    expect(true).toBeTruthy();
  })

});