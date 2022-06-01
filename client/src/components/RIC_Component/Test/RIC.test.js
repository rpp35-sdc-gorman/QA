import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { createRoot } from 'react-dom/client';
import { act } from "react-dom/test-utils";
import axios from 'axios';

import RIC from '../RIC.jsx';

global.IS_REACT_ACT_ENVIRONMENT = true
jest.mock('axios');

let testId = 71697;
let response =

let container = null;
// beforeEach(async () => {
//   // setup a DOM element as a render target
//   container = document.createElement("div");
//   document.body.appendChild(container);
//   await act(() => {
//     createRoot(container).render(<RIC />)
//   })
// });
// afterEach(() => {
//   // cleanup on exiting
//   unmountComponentAtNode(document);
//   container.remove();
//   container = null;
// });

// describe('RIC Parent Test', () =>{
//   it('should load entire component', () => {
//     expect(container.querySelector('div.RIC')).not.toBe(null);
//   });
// })