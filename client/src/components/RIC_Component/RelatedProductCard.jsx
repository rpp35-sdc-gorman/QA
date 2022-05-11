import React, { useState } from 'react';

var RelatedProductCards = (props) => (
  <div id="card">
    {props.category}<br/>
    {props.name}<br/>
    {props.default_price}<br/>
    {props.category}<br/>
    {props.star_rating}<br/>
  </div>
)

export default RelatedProductCards