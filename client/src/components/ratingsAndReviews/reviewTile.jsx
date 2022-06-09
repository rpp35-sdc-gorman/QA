import React from 'react';
import Stars from '../common/stars.jsx';
import axios from 'axios';
import Modal from '../common/modal.jsx';
import { useState } from 'react';
const ReviewTile = (props) => {
  let [showImage, setShowImage] = useState({});
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
      <div className="recommend">
        {props.review.recommend ? '√ I recommend this product' : null}
      </div>
      <div id="reviewImages">
        {props.review.photos.map(({ url }, i) => (
          <>
            <Modal
              key={i}
              handleClose={() => {
                setShowImage({ ...showImage, [i]: !showImage[i] });
              }}
              show={showImage[i]}
            >
              <img key={url} src={url}></img>
            </Modal>
            <img
              id="thumbnail"
              onClick={() => setShowImage({ ...showImage, [i]: !showImage[i] })}
              key={url}
              src={url}
            ></img>
          </>
        ))}
      </div>
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
