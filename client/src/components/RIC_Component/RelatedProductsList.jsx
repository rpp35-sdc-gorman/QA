import React, { useState } from 'react';
import RelatedProductCards from './RelatedProductCard.jsx';

var RelatedProductsList = (props) => (
  <div>
    {props.relatedProducts.map(product => {
      return (
        <RelatedProductCards key={product.id} category={product.category} name={product.name} default_price={product.default_price} star_rating={product.star_rating}/>
      )
    })}
  </div>
)

export default RelatedProductsList;