import React from 'react';

const ReviewTile = (props) => {
  return (
    <div className="reviewTile" key={props.key}>
      <div className="reviewTileStars"></div>
      <div className="reviewTileUsername">
        {props.review.reviewer_name}
        {new Date(props.review.date)}
      </div>
      <h3>{props.review.summary}</h3>
      <p>{props.review.body}</p>
      {props.review.response ? (
        <div className="response">{props.review.response}</div>
      ) : null}
      helpful?
      <span onClick={() => console.log('helpfulness clicked')}>yes</span> (
      {props.review.helpfulness}) | <span>report</span>
    </div>
  );
};

export default ReviewTile;
