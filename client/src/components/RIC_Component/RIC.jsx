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
      error: false,
      force: 1
    }

  }

  componentDidMount() {
    this.setState({
      currentProduct: this.props.currentProduct,
      relatedProducts: this.props.relatedProducts
    });
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.currentProduct !== this.props.currentProduct){
      this.setState({force: this.state.force + 1})
    }
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
    if(this.props.relatedProducts){
      return (this.props.relatedProducts.length ?
        <div id='RIC'>
          <h3>RELATED PRODUCTS</h3>
          <RelatedProducts products={this.props.relatedProducts}
          compare={this.compare.bind(this)}
          clickTracker={this.props.clickTracker}
          redirect={this.redirect.bind(this)}
          />
          <Modal handleClose={this.close.bind(this)} show={this.state.modal}>
            <Comparison main={this.state.currentProduct} related={this.state.comparedProduct} />
          </Modal>
          <h3>YOUR OUTFITS</h3>
          <YourOutfits currentProduct={this.props.currentProduct}
          clickTracker={this.props.clickTracker}
          redirect={this.redirect.bind(this)}
          added={this.props.added}
          addProduct={this.props.addProduct} />
        </div> : null
      )
    } else {
      return (<h1>Loading...</h1>)
    }
  }
}

export default RIC