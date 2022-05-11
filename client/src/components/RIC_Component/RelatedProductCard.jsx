import React, { useState } from 'react';

var RelatedProductCards = (props) => (
  <div id="card">
    <div id="card-category">{props.category}</div>
    <div id="card-name">{props.name}</div>
    <div id="card-price">{props.default_price}</div>
    <div id="card-star">{props.star_rating}</div><br/>
  </div>
)

export default RelatedProductCards