import React from 'react';
import Stars from '../common/5star.jsx';
import { CirclePlusFill, CircleXFill } from 'akar-icons';

var ProductCards = (props) => (
  <div className="card">
    <img className="card_visual" src={props.thumbnail} />
    {props.list === 'related' ?
      <CirclePlusFill color='white' strokeWidth={2} size={20} className='card_favorite' id={props.id} onClick={props.favorite} /> :
      <CircleXFill color='white' strokeWidth={2} size={20} className='card_favorite' id={props.id} onClick={props.remove} />}
    <div className="card_category">{props.category}</div>
    <div className="card_name">{props.name}</div>
    <div className="card_price">${props.default_price}</div>
    <div className="card_rating"><Stars size={10} filled={props.star_rating} /></div>
  </div>
)

export default ProductCards