import React from 'react';
import Stars from '../common/stars.jsx';

const ReviewTile = (props) => {
  console.log(props.review);
  return (
    <div className="reviewTile">
      <Stars filled={props.review.rating} size={24}></Stars>
      <div className="reviewTileUsername">
        {props.review.reviewer_name}
        {'  '}
        {new Date(props.review.date).toDateString()}
      </div>
      <div>
        <h3>{props.review.summary}</h3>
        <p>{props.review.body}</p>
      </div>
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

