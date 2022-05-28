import React, { useState } from 'react';
import axios from 'axios';
import RelatedProducts from './RelatedProducts.jsx';
import YourOutfits from './YourOutfits.jsx';
import Modal from '../common/modal.jsx';
import Comparison from './Comparison.jsx';

// currently, implementing without react hooks, but will refactor using react hooks later
class RIC extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProductId: 71699,
      currentProduct: {},
      relatedProducts: [],
      comparedProduct: null,
      modal: false
    }
  }

  async componentDidMount() {
    await this.getRelatedItems();
    await this.getCurrentProduct();
  }

  getCurrentProduct() {
    axios.get(`/related_items/ric/main/${this.state.currentProductId}`)
    .then(response => {
      return response.data
    })
    .then(currentProduct => {
      return this.setDefaultStyle([currentProduct], 'outfit');
    })
    .then(currentProduct => {
      this.setState({ currentProduct: currentProduct[0] });
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
      this.setState({ relatedProducts });
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
    this.props.clickTracker(event);
    let id = Number(event.currentTarget.id);
    let comparedProduct;
    for (var i = 0; i < this.state.relatedProducts.length; i++) {
      if (this.state.relatedProducts[i].id === id) {
        comparedProduct = this.state.relatedProducts[i];
        break;
      }
    }
    this.setState({ comparedProduct, modal: true });
  }

  close(event) {
    this.props.clickTracker(event);
    this.setState({ comparedProduct: null, modal: false });
  }

  render() {
    return (this.state.relatedProducts.length ?
      <div className='RIC'>
        <h4>RELATED PRODUCTS</h4>
        <RelatedProducts products={this.state.relatedProducts} compare={this.compare.bind(this)} clickTracker={this.props.clickTracker} />
        <Modal handleClose={this.close.bind(this)} show={this.state.modal}>
          <Comparison main={this.state.currentProduct} related={this.state.comparedProduct} />
        </Modal>
        <h4>YOUR OUTFITS</h4>
        <YourOutfits currentProduct={this.state.currentProduct} clickTracker={this.props.clickTracker} />
      </div> : null
    )
  }
}

export default RIC