import React from 'react';
import Stars from '../common/5star.jsx';

var RelatedProductCards = (props) => (
  <div className="card">
    <img className="card_visual" src={props.thumbnail} />
    <div className="card_category">{props.category}</div>
    <div className="card_name">{props.name}</div>
    <div className="card_price">${props.default_price}</div>
    <div className="card_rating"><Stars size={10} filled={props.star_rating} /></div>
  </div>
)

export default RelatedProductCards