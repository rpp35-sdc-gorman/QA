import React, { useState } from 'react';
import axios from 'axios';
import RelatedProducts from './RelatedProducts.jsx';
import YourOutfits from './YourOutfits.jsx';
import Modal from '../common/modal.jsx';
import Comparison from './Comparison.jsx';

class RIC extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProduct: {},
      relatedProducts: [],
      comparedProduct: null,
      modal: false,
      error: false
    }

    this.currentProductId = window.location.href.split('/').pop();
  }

  async componentDidMount() {
    await this.getRelatedItems();
  }

  getRelatedItems() {
    axios.get(`/related_items/ric/${this.currentProductId}`)
    .then(response => {
      return response.data
    })
    .then(allProducts => {
      let currentProduct = allProducts.slice(0, 1);
      let relatedProducts = allProducts.slice(1, allProducts.length);
      return [this.setDefaultStyle(currentProduct, 'outfit')[0], this.setDefaultStyle(relatedProducts, 'related')];
    })
    .then(allProducts => {
      this.setState({
        currentProduct: allProducts[0],
        relatedProducts: allProducts[1]
      });
    })
    .catch(err => { console.error('Something broke'); });
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
      if (product.thumbnail === null || product.thumbnail === undefined) {
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

  redirect(event) {
    this.props.clickTracker(event);
    let id = event.currentTarget.nextSibling.id;
    window.location.replace(window.location.origin + `/product/${id}`);
  }

  render() {
    return (this.state.relatedProducts.length ?
      <div id='RIC'>
        <h3>RELATED PRODUCTS</h3>
        <RelatedProducts products={this.state.relatedProducts}
         compare={this.compare.bind(this)}
         clickTracker={this.props.clickTracker}
         redirect={this.redirect.bind(this)}
         />
        <Modal handleClose={this.close.bind(this)} show={this.state.modal}>
          <Comparison main={this.state.currentProduct} related={this.state.comparedProduct} />
        </Modal>
        <h3>YOUR OUTFITS</h3>
        <YourOutfits currentProduct={this.state.currentProduct}
        clickTracker={this.props.clickTracker}
        redirect={this.redirect.bind(this)}
        added={this.props.added}/>
      </div> : null
    )
  }
}

export default RIC