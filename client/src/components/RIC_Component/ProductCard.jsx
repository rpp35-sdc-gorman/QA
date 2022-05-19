import React from 'react';
import Stars from '../common/5star.jsx';
import { CirclePlusFill } from 'akar-icons';

var ProductCards = (props) => (
  <div className="card" id={props.id}>
    <img className="card_visual" src={props.thumbnail} />
    <CirclePlusFill color='white' strokeWidth={2} size={20} className='card_favorite' />
    <div className="card_category">{props.category}</div>
    <div className="card_name">{props.name}</div>
    <div className="card_price">${props.default_price}</div>
    <div className="card_rating"><Stars size={10} filled={props.star_rating} /></div>
  </div>
)

export default ProductCards