import React, { useState } from 'react';
import ProductCards from './ProductCard.jsx';
import Carousel, { CarouselItem } from './Carousel';

var ProductsList = (props) => (
  <div>
    <Carousel>
      {props.products.map((product, index) => {
        return(
          <CarouselItem key={index}>
            <ProductCards category={product.category}
              name={product.name}
              default_price={product.default_price}
              sale_price={product.sale_price}
              star_rating={product.star_rating}
              thumbnail={product.thumbnail}
              id={product.id}
              list={product.list}
              favorite={props.favorite}
              remove={props.remove}
              />
          </CarouselItem>
        )
      })}
    </Carousel>
  </div>
)

export default ProductsList;