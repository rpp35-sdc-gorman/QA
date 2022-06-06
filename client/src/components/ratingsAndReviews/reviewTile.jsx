import React from 'react';
import Stars from '../common/stars.jsx';
import axios from 'axios';
const ReviewTile = (props) => {
  return (
    <div className="reviewTile">
      <Stars filled={props.review.rating} size={24}></Stars>
      <div className="reviewTileUsername fr">
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
      helpful?{' '}
      <span
        className={!props.helpful ? `underline` : null}
        onClick={() => {
          !props.helpful
            ? axios
                .put(`/rating_review/reviews/${props.review.review_id}/helpful`)
                .then(() => props.helpfulClicked(props.review.review_id))
                .catch(console.error)
            : null;
        }}
      >
        yes
      </span>{' '}
      ({props.review.helpfulness}) |{' '}
      <span
        className={!props.review.reported ? `underline` : 'reported'}
        onClick={() => {
          !props.review.reported
            ? axios
                .put(`/rating_review/reviews/${props.review.review_id}/report`)
                .then(() => {
                  props.reportClicked(props.review.review_id);
                })
                .catch((err) => console.error(err))
            : null;
        }}
      >
        report{props.review.reported ? 'ed' : null}
      </span>
    </div>
  );
};

export default ReviewTile;
