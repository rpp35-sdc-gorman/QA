import React from 'react';
import Stars from '../common/stars.jsx';
import { Star, CircleXFill } from 'akar-icons';

var ProductCards = (props) => (
  <div className="card">
    <img className="card_visual" src={props.thumbnail} onClick={props.redirect}/>
    {props.list === 'related' ? (
      <Star
        color="white"
        strokeWidth={2}
        size={20}
        className="card_compare"
        id={props.id}
        onClick={props.compare}
      />
    ) : (
      <CircleXFill
        color="white"
        strokeWidth={2}
        size={20}
        className="card_remove"
        id={props.id}
        onClick={props.remove}
      />
    )}
    <div className="card_category">{props.category}</div>
    <div className="card_name">{props.name}</div>
    <div className="card_price" style={props.sale_price ? {textDecoration: 'line-through', color: 'red'} : null}>{`$${props.default_price} `}</div>
    {props.sale_price ? <div className="card_price" style={{color: 'red'}}>{`$${props.sale_price}`}</div> : null}
    <div className="card_rating">
      <Stars size={10} filled={props.star_rating} />
    </div>
  </div>
);

export default ProductCards;
