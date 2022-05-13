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
        relatedProducts.forEach(product => {
          let [rating, style] = [this.getRating(product), this.getStyle(product)]
          Promise.allSettled([rating, style])
            .then(values => {
              console.log(values);
            })
            .catch(err => { throw err; })
        });
        return relatedProducts;
      })
      .then(relatedProducts => {
        this.setState({ relatedProducts }, () => {console.log(this.state.relatedProducts)});
      })
      .catch(err => { throw err; });
  }

  getRating(product) {
    return axios.get(`/related_items/ric/ratings/${product.id}`)
    .then(response => {
      product.star_rating = response.data.rating;
      return product.star_rating;
    })
    .catch(err => { throw err; });
  }

  getStyle(product) {
    return axios.get(`/related_items/ric/styles/${product.id}`)
    .then(response => {
      product.styles = response.data.styles;
      return product.styles;
    })
    .catch(err => { throw err; });
  }

  render() {
    return(
      <div>
        <Carousel>
          {this.state.relatedProducts.map(product => {
            return(
              <CarouselItem key={product.id}>
                <RelatedProductCards category={product.category} name={product.name} default_price={product.default_price} star_rating={product.star_rating}/>
              </CarouselItem>
            )
          })}
        </Carousel>
      </div>
    )
  }
}

export default RIC