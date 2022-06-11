import React from 'react';
import { sendClickTracker } from './ClickTracker.jsx';

let Stars = (props) => {
  const stars = (props.filled / 5) * 100;
  return (
    <div className="rating">
      <div
        className="rating-upper"
        style={{ width: stars + '%', fontSize: props.size }}
      >
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
      </div>
      <div className="rating-lower" style={{ fontSize: props.size }}>
        <span>☆</span>
        <span>☆</span>
        <span>☆</span>
        <span>☆</span>
        <span>☆</span>
      </div>
    </div>
  );
};

export const SelectableStars = (props) => {
  const stars = (props.filled / 5) * 100;
  return (
    <div className="rating">
      <div
        className="rating-upper"
        style={{ width: stars + '%', fontSize: props.size }}
      >
        <span
          onClick={(e) => {
            sendClickTracker(e, 'rating and review');
            props.select(1);
          }}
        >
          ★
        </span>
        <span
          onClick={(e) => {
            sendClickTracker(e, 'rating and review');
            props.select(2);
          }}
        >
          ★
        </span>
        <span
          onClick={(e) => {
            sendClickTracker(e, 'rating and review');
            props.select(3);
          }}
        >
          ★
        </span>
        <span
          onClick={(e) => {
            sendClickTracker(e, 'rating and review');
            props.select(4);
          }}
        >
          ★
        </span>
        <span
          onClick={(e) => {
            sendClickTracker(e, 'rating and review');
            props.select(5);
          }}
        >
          ★
        </span>
      </div>
      <div className="rating-lower" style={{ fontSize: props.size }}>
        <span
          onClick={(e) => {
            sendClickTracker(e, 'rating and review');
            props.select(1);
          }}
        >
          ☆
        </span>
        <span
          onClick={(e) => {
            sendClickTracker(e, 'rating and review');
            props.select(2);
          }}
        >
          ☆
        </span>
        <span
          onClick={(e) => {
            sendClickTracker(e, 'rating and review');
            props.select(3);
          }}
        >
          ☆
        </span>
        <span
          id="stars"
          onClick={(e) => {
            sendClickTracker(e, 'rating and review');
            props.select(4);
          }}
        >
          ☆
        </span>
        <span
          onClick={(e) => {
            sendClickTracker(e, 'rating and review');
            props.select(5);
          }}
        >
          ☆
        </span>
      </div>
    </div>
  );
};

export default Stars;
