import React from 'react';

var RelatedProductCards = (props) => (
  <div className="card">
    <div className="card_visual" src={props.thumbnail}></div>
    <div className="card_category">{props.category}</div>
    <div className="card_name">{props.name}</div>
    <div className="card_price">{props.default_price}</div>
    <div className="card_rating">{props.star_rating}</div><br/>
  </div>
)

export default RelatedProductCards