import React from 'react';

let Stars = (props) => {
  const stars = (props.filled / 5) * 100;
  console.log(stars);
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

export default Stars;
