import React, { useState } from 'react';
import ProductCards from './ProductCard.jsx';
import Carousel, { CarouselItem } from './Carousel';

var RelatedProducts = (props) => (
  <div id='relatedProducts'>
    <Carousel clickTracker={props.clickTracker}>
      {props.products.map((product, index) => {
        return(
          <CarouselItem key={product.id}>
            <ProductCards category={product.category}
              name={product.name}
              default_price={product.default_price}
              sale_price={product.sale_price}
              star_rating={product.star_rating}
              thumbnail={product.thumbnail}
              id={product.id}
              list={product.list}
              compare={props.compare}
              redirect={props.redirect}
              index={index}
              />
          </CarouselItem>
        )
      })}
    </Carousel>
  </div>
)

export default RelatedProducts;