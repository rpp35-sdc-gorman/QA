import React, { useState } from 'react';
import axios from 'axios';
import RelatedProductList from './RelatedProductList.jsx';

// currently, implementing without react hooks, but will refactor using react hooks later
class RIC extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProduct: null;
      relatedProducts: [];
      selectedRelatedProduct: null;
    }
  }

  componentDidMount() {
    axios.get('/related_items/ric/64620')
      .then(relatedProducts => {
        this.setState({
          relatedProductList: relatedProducts.data
        })
      })
  }

  render() {
    return(
      <>
      <RelatedProductList relatedProducts={this.state.relatedProducts} />
      </>
    )
  }
}

export default RIC