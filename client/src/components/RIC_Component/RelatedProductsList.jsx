import React, { useState } from 'react';
import RelatedProductCards from './RelatedProductCard.jsx';
import { CarouselItem } from './Carousel';

var RelatedProductsList = (props) => (
  <div>
    {props.relatedProducts.map(product => {
      return (
        <CarouselItem>
          <RelatedProductCards key={product.id} category={product.category} name={product.name} default_price={product.default_price} star_rating={product.star_rating}/>
        </CarouselItem>
      )
    })}
  </div>
)

export default RelatedProductsList;