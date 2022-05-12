import React, { useState } from 'react';
import axios from 'axios';
import RelatedProductsList from './RelatedProductsList.jsx';

// currently, implementing without react hooks, but will refactor using react hooks later
class RIC extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProduct: null,
      relatedProducts: [],
      selectedRelatedProduct: null
    }
  }

  componentDidMount() {
    axios.get('/related_items/ric/64620')
      .then(response => {
        return response.data
      })
      .then(relatedProducts => {
        relatedProducts.forEach(product => {
          axios.get(`/related_items/ric/ratings/${product.id}`)
            .then(response => {
              product.star_rating = response.data.rating;
            })
            .catch(err => { throw err; });
          axios.get(`/ric/styles/${product.id}`)
            .then(response => {
              product.styles = response.data.styles
            })
            .catch(err => { throw err; });
        });
        return relatedProducts;
      })
      .then(relatedProducts => {
        relatedProducts.forEach(product => {
          axios.get(`/ric/styles/${product.id}`)
            .then(response => {
              product.styles = response.data.styles
            })
            .catch(err => { throw err; });
        })
        return relatedProducts;
      })
      .then(relatedProducts => {
        this.setState({ relatedProducts }, () => {console.log(this.state.relatedProducts)});
      })
      .catch(err => { throw err; });
  }

  render() {
    return(
      <div>
        <RelatedProductsList relatedProducts={this.state.relatedProducts} />
      </div>
    )
  }
}

export default RIC