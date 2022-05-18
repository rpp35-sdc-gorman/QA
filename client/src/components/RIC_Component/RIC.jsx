import React, { useState } from 'react';
import axios from 'axios';
import RelatedProductCards from './RelatedProductCard.jsx';
import Carousel, { CarouselItem } from './Carousel';

// currently, implementing without react hooks, but will refactor using react hooks later
class RIC extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProduct: null,
      currentProductId: '71697',
      relatedProducts: [],
      selectedRelatedProduct: null
    }
  }

  componentDidMount() {
    axios.get(`/related_items/ric/${this.state.currentProductId}`)
      .then(response => {
        return response.data
      })
      .then(relatedProducts => {
        return this.setDefaultStyle(relatedProducts);
      })
      .then(relatedProducts => {
        this.setState({ relatedProducts }, () => {console.log(this.state.relatedProducts)});
      })
      .catch(err => { throw err; });
  }

  setDefaultStyle(products) {
    products.forEach(product => {
      product.styles.forEach(style => {
        if (style['default?']) {
          product.thumbnail = style.photos[0].thumbnail_url;
          product.sale_price = style.sale_price;
        }
      })
      if (product.thumbnail === undefined) {
        product.thumbnail = product.styles[0].photos[0].thumbnail_url;
        product.sale_price = product.styles[0].sale_price;
      }
    })
    return products;
  }

  render() {
    return (
      <div>
        <h4>RELATED PRODUCTS</h4>
        <Carousel>
          {this.state.relatedProducts.map(product => {
            return(
              <CarouselItem key={product.id}>
                <RelatedProductCards category={product.category}
                  name={product.name}
                  default_price={product.default_price}
                  sale_price={product.sale_price}
                  star_rating={product.star_rating}
                  thumbnail={product.thumbnail}
                  />
              </CarouselItem>
            )
          })}
        </Carousel>
      </div>
    )
  }
}

export default RIC