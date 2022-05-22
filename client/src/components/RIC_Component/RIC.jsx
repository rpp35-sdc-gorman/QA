import React, { useState } from 'react';
import axios from 'axios';
import RelatedProducts from './RelatedProducts.jsx';
import YourOutfits from './YourOutfits.jsx';
import Carousel, { CarouselItem } from './Carousel';

// currently, implementing without react hooks, but will refactor using react hooks later
class RIC extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProductId: 71697,
      currentProduct: [],
      relatedProducts: [],
      selectedRelatedProduct: null
    }
  }

  async componentDidMount() {
    await this.getRelatedItems();
    await this.getCurrentProduct();
  }

  getCurrentProduct() {
    axios.get(`/related_items/ric/main/${this.state.currentProductId}`)
    .then(response => {
      console.log(response.data);
      return response.data
    })
    .then(currentProduct => {
      return this.setDefaultStyle([currentProduct], 'outfit');
    })
    .then(currentProduct => {
      this.setState({ currentProduct: currentProduct });
    })
    .catch(err => {throw err });
  }

  getRelatedItems() {
    axios.get(`/related_items/ric/${this.state.currentProductId}`)
    .then(response => {
      return response.data
    })
    .then(relatedProducts => {
      return this.setDefaultStyle(relatedProducts, 'related');
    })
    .then(relatedProducts => {
      this.setState({ relatedProducts }, () => {console.log(this.state.relatedProducts)});
    })
    .catch(err => { throw err; });
  }

  setDefaultStyle(products, list) {
    products.forEach(product => {
      product.styles.forEach(style => {
        if (style['default?']) {
          product.thumbnail = style.photos[0].thumbnail_url;
          product.sale_price = style.sale_price;
          product.list = list;
        }
      })
      if (product.thumbnail === undefined) {
        product.thumbnail = product.styles[0].photos[0].thumbnail_url;
        product.sale_price = product.styles[0].sale_price;
        product.list = list;
      }
    })
    return products;
  }

  compare(event) {
    let id = Number(event.currentTarget.id);
    console.log(event.currentTarget.id);
    console.log(event.currentTarget.props);
  }

  render() {
    return (
      <div>
        <h4>RELATED PRODUCTS</h4>
        <RelatedProducts products={this.state.relatedProducts} compare={this.compare.bind(this)} />
        <h4>YOUR OUTFITS</h4>
        <YourOutfits currentProduct={this.state.currentProduct[0]}/>
      </div>
    )
  }
}

export default RIC