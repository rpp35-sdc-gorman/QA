import React from 'react';
import { createRoot } from 'react-dom/client';
import { act, Simulate } from 'react-dom/test-utils';
import axios from 'axios';
import Reviews from './reviews.jsx';
import MockAdapter from 'axios-mock-adapter';
import { unmountComponentAtNode } from 'react-dom';
global.IS_REACT_ACT_ENVIRONMENT = true;
const reviews = {
  product: '71697',
  page: 0,
  count: 5,
  results: [
    {
      review_id: 1254280,
      rating: 5,
      summary: 'This product was great!',
      recommend: true,
      response: '',
      body: 'I really did or did not like this product based on whether it was sustainably sourced. Then I found out that its made from nothing at all.',
      date: '2019-01-01T00:00:00.000Z',
      reviewer_name: 'funtime',
      helpfulness: 8,
      photos: [],
    },
    {
      review_id: 1254281,
      rating: 4,
      summary: 'This product was ok!',
      recommend: false,
      response: '',
      body: 'I really did not like this product solely because I am tiny and do not fit into it.',
      date: '2019-01-11T00:00:00.000Z',
      reviewer_name: 'mymainstreammother',
      helpfulness: 2,
      photos: [],
    },
  ],
};

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

describe('Reviews', () => {
  let mock;
  let container = null;
  beforeEach(async () => {
    mock = new MockAdapter(axios);
    mock.onGet('/rating_review/' + 71697).reply(200, reviews);
    mock.onPost('/rating_review/' + 71697).reply(201);
    mock.onPost('/trackClick').reply(201);
    mock.onPut(/rating_review\/reviews\/d+\/helpful/).reply(201);
    mock
      .onGet('/rating_review/' + 71697, {
        params: { sort: 'relevance', page: 2 },
      })
      .reply(200, reviews);
    mock.onGet('/rating_review/' + 71697 + '/rating').reply(200, ratings);
    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
    await act(() => {
      createRoot(container).render(
        <Reviews
          id={71697}
          filtered={{ 1: false, 2: false, 3: false, 4: false, 5: false }}
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

  it('should render 2 reviews at start', () => {
    expect(container.querySelectorAll('.reviewTile').length).toBe(2);
  });

  it('should display a modal when "add a review" is clicked', async () => {
    await act(() =>
      container
        .querySelector('#addAReview')
        .dispatchEvent(new MouseEvent('click', { bubbles: true }))
    );
    expect(container.querySelectorAll('.characteristics').length).toBe(4);
  });

  it('should display 4 reviews after "show more reviews" clicked', async () => {
    await act(() =>
      container
        .querySelector('#showMoreReviews')
        .dispatchEvent(new MouseEvent('click', { bubbles: true }))
    );
    expect(container.querySelectorAll('.reviewTile').length).toBe(4);
  });

  it('should not submit if missing properties', async () => {
    await act(() =>
      container
        .querySelector('#addAReview')
        .dispatchEvent(new MouseEvent('click', { bubbles: true }))
    );
    await act(() =>
      container
        .querySelector('#submitNewReview')
        .dispatchEvent(new MouseEvent('click', { bubbles: true }))
    );

    expect(
      container.querySelector('#errorMessage').innerHTML.includes('recommend')
    ).toBe(true);
    expect(mock.history.post.length).toBe(2);
  });

  it('should submit if all properties are present', async () => {
    await act(() => {
      container
        .querySelector('#addAReview')
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    await act(() => {
      container
        .querySelector('span#stars')
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
      container
        .querySelector('input#recommend1')
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
      container
        .querySelector('#Fit1')
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
      container
        .querySelector('#Length1')
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
      container
        .querySelector('#Comfort1')
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
      container
        .querySelector('#Quality1')
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));

      Simulate.change(container.querySelector('#reviewName'), {
        target: {
          id: 'reviewName',
          value: 'name',
        },
      });
      Simulate.change(container.querySelector('#reviewEmail'), {
        target: {
          id: 'reviewEmail',
          value: 'email@email.com',
        },
      });
      Simulate.change(container.querySelector('#reviewBody'), {
        target: {
          id: 'reviewBody',
          value:
            'this is a valid value for the body of this submission. check it out!',
        },
      });
      Simulate.change(container.querySelector('#reviewSummary'), {
        target: {
          id: 'reviewSummary',
          value: 'check it out!',
        },
      });
    });
    await act(() => {
      container
        .querySelector('#submitNewReview')
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(mock.history.post.length).toBe(9);
  });
  it('should fire an onclick handler for helpfulness clicked', () => {
    container
      .querySelectorAll('.underline')[0]
      .dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
});
