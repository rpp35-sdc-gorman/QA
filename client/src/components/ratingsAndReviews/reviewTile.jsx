import React from 'react';

ReviewTile = (props) => {
  return (
    <div className="reviewTile" key={props.key}>
      <div className="reviewTileStars"></div>
      <div className="reviewTileUsername"></div>
      <h3>{props.title}</h3>
      <p>{props.description}</p>
      {props.response ? <div className="response">{props.response}</div> : null}
      helpful?<span>yes</span> | <span>report</span>
    </div>
  );
};

export default ReviewTile;