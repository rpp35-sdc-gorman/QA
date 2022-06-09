import React from 'react';
import { jest } from '@jest/globals';
import Ratings from './ratings.jsx';
import { createRoot } from 'react-dom/client';
import { act, Simulate } from 'react-dom/test-utils';
import axios from 'axios';
import Reviews from './reviews.jsx';
import MockAdapter from 'axios-mock-adapter';
import { unmountComponentAtNode } from 'react-dom';
global.IS_REACT_ACT_ENVIRONMENT = true;

const ratings = {
  product_id: '71697',
  ratings: {
    2: '1',
    3: '1',
    4: '1',
    5: '4',
  },
  recommended: {
    false: '1',
    true: '6',
  },
  characteristics: {
    Fit: {
      id: 240582,
      value: '4.5000000000000000',
    },
    Length: {
      id: 240583,
      value: '4.0000000000000000',
    },
    Comfort: {
      id: 240584,
      value: '4.7500000000000000',
    },
    Quality: {
      id: 240585,
      value: '4.2500000000000000',
    },
  },
};

describe('Ratings', () => {
  let mock;
  let container = null;
  let filter = null;
  beforeEach(async () => {
    mock = new MockAdapter(axios);
    // mock.onGet('/rating_review/' + 71697).reply(200, reviews);
    mock.onGet('/rating_review/' + 71697 + '/rating').reply(200, ratings);
    mock.onPost('/trackClick').reply(201);

    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
    filter = jest.fn();
    await act(() => {
      createRoot(container).render(
        <Ratings
          id={71697}
          filtered={{ 1: false, 2: false, 3: false, 4: false, 5: false }}
          filter={filter}
        />
      );
    });
  });
  afterEach(() => {
    // cleanup on exiting
    mock.reset();
    // container.unmount();
    unmountComponentAtNode(document);
    container.remove();
    container = null;
  });

  it('should filter by rating when rating clicked', () => {
    act(() => {
      container
        .querySelector('#ratings2')
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(filter).toBeCalledWith('2');
  });
});
