import React, { useState } from 'react';
import RelatedProductCards from './RelatedProductCards.jsx';

var RelatedProductList = (props) => {
  <div>
    {props.relatedProducts.map(product => {
      <RelatedProductCards key={product.id} category={product.category} name={product.name} default_price={product.default_price} star_rating={product.star_rating}/>
    })}
  </div>
}

export default RelatedProductList;